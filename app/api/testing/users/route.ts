import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import { createUser } from "@/app/services/users";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await req.json()

  if (!body || !body.username || !body.password || !body.name) {
    return NextResponse.json(
      { error: "Values missing" },
      { status: 400 },
    )
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  await createUser(body.username, body.name, passwordHash )

  return NextResponse.json({ message: "User created" })
}