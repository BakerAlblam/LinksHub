import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { links } from "~/server/db/schema";

type Data = {
  userId: string;
  content: string;
  link: string;
  username: string;
};

export async function POST(nextRequest: NextRequest) {
  const { userId, content, link, username } =
    (await nextRequest.json()) as Data;

  if (!userId) {
    return NextResponse.json({ message: "No user" });
  }

  try {
    const insertLink = await db
      .insert(links)
      .values({
        userId,
        content,
        link,
        username,
      })
      .execute();
    return NextResponse.json(insertLink, { status: 201 }); // Return the result or confirmation
  } catch (error) {
    return NextResponse.json({ message: "Insert failed", details: error });
  }
}
