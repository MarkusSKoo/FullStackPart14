import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "@/app/services/users"

export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get("authorization")
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authorization.slice(7)
  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  return NextResponse.json(user)
}