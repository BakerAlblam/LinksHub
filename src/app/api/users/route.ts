import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

type UserReq = {
  username: string;
  email: string;
  authId: string;
  avatar: string;
};

export async function PUT(NextRequest: NextRequest) {
  const { username, authId, avatar } = (await NextRequest.json()) as UserReq;

  if (!authId) {
    return NextResponse.json({ message: "Invalid authID" });
  }
  try {
    const req = await db
      .update(users)
      .set({
        username: username,
        avatar: avatar,
        authId: authId,
      })
      .where(eq(users.authId, authId));
    return NextResponse.json(req);
    console.log(req);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(NextRequest: NextRequest) {
  const { username, email, authId, avatar } =
    (await NextRequest.json()) as UserReq;

  if (!username || !email || !authId) {
    return NextResponse.json({ message: "Invalid input data" });
  }

  try {
    const existingUsername = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (existingUsername) {
      return NextResponse.json({ message: "User already in DB" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }

  try {
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        authId,
        avatar,
      })
      .execute();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      details: error,
    });
  }
}
