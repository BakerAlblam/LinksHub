import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

type UserReq = {
  username: string;
  email: string;
  authId: string;
};

export async function POST(NextRequest: NextRequest) {
  const { username, email, authId } = (await NextRequest.json()) as UserReq;

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