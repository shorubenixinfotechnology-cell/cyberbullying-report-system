import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Demo in-memory database (in production, use Supabase/Neon)
const reportsDatabase: Record<
  string,
  {
    id: string
    title: string
    description: string
    category: string
    incidentDate: string
    location: string
    contactEmail?: string
    submittedDate: string
    status: "new" | "reviewing" | "investigated" | "resolved"
    priority: "low" | "medium" | "high"
    evidence: boolean
  }
> = {}

// POST: Submit a new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.incidentDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate anonymous tracking ID
    const trackingId = `SR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create report object
    const report = {
      id: trackingId,
      title: body.title,
      description: body.description,
      category: body.category,
      incidentDate: body.incidentDate,
      location: body.location || "online",
      contactEmail: body.contactEmail ? body.contactEmail : undefined,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "new" as const,
      priority: body.category === "threats/violence" ? ("high" as const) : ("medium" as const),
      evidence: !!body.evidence,
    }

    // Store in database
    reportsDatabase[trackingId] = report

    return NextResponse.json({
      success: true,
      trackingId: trackingId,
      message: "Report submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 })
  }
}

// GET: Retrieve reports (admin only)
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin authentication here
    const adminPassword = request.headers.get("x-admin-key")
    if (!adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reports = Object.values(reportsDatabase)
    return NextResponse.json({
      success: true,
      count: reports.length,
      reports: reports,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve reports" }, { status: 500 })
  }
}
