import { type NextRequest, NextResponse } from "next/server"
import { dataService } from "@/lib/data-service"

export async function GET() {
  try {
    const records = dataService.getAll()
    return NextResponse.json(records)
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ error: "Failed to retrieve records" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.groupName ||
      !data.role ||
      data.expectedSalary === undefined ||
      !data.expectedDateOfDefense
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newRecord = dataService.create(data)

    return NextResponse.json(newRecord, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 })
  }
}

