import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Demo authentication (in production, use proper auth with bcrypt)
    if (password === "admin123") {
      return NextResponse.json({
        success: true,
        token: "demo-admin-token-" + Date.now(),
        message: "Authentication successful",
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
