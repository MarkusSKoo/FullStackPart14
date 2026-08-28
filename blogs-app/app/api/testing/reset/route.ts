import { NextRequest, NextResponse } from "next/server"
import { users, blogs, readingLists } from "@/db/schema"
import { db } from "@/db"

export const DELETE = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  await db.delete(readingLists)
  await db.delete(blogs)
  await db.delete(users)

  return NextResponse.json({ message: "Database reset" })
}