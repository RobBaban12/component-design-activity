import { type NextRequest, NextResponse } from "next/server"
import { dataService } from "@/lib/data-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const record = dataService.getById(id)

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    return NextResponse.json(record)
  } catch (error) {
    console.error("GET [id] error:", error)
    return NextResponse.json({ error: "Failed to retrieve record" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
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

    const updatedRecord = dataService.update(id, data)

    if (!updatedRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    return NextResponse.json(updatedRecord)
  } catch (error) {
    console.error("PUT error:", error)
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const success = dataService.delete(id)

    if (!success) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 })
  }
}

