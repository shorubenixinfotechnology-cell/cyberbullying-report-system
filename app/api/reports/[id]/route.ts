import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Mock database - same as in parent route
const reportsDatabase: Record<string, any> = {}

// GET: Retrieve single report by tracking ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // In production, this would query the database
    // For now, return demo data
    if (id.startsWith("SR-")) {
      return NextResponse.json({
        success: true,
        report: {
          id: id,
          title: "Report Found",
          status: "reviewing",
          submittedDate: new Date().toISOString().split("T")[0],
          priority: "medium",
        },
      })
    }

    return NextResponse.json({ error: "Report not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve report" }, { status: 500 })
  }
}

// PATCH: Update report status (admin only)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminPassword = request.headers.get("x-admin-key")
    if (!adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, priority } = body

    return NextResponse.json({
      success: true,
      message: "Report updated successfully",
      report: {
        id: params.id,
        status: status,
        priority: priority,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 })
  }
}

// DELETE: Remove report (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const adminPassword = request.headers.get("x-admin-key")
    if (!adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: "Report deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete report" }, { status: 500 })
  }
}
