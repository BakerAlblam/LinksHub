import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(request: NextRequest) {
  const { username, email, authId } = await request.json();

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
