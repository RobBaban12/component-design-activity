import type { DataRecord } from "@/components/crud-manager"

const API_URL = "/api/records"

export async function getAllRecords(): Promise<DataRecord[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fetch error:", errorText)
      throw new Error(`Failed to fetch records: ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error("getAllRecords error:", error)
    throw error
  }
}

export async function getRecordById(id: string): Promise<DataRecord> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fetch error:", errorText)
      throw new Error(`Failed to fetch record: ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error("getRecordById error:", error)
    throw error
  }
}

export async function createRecord(data: DataRecord): Promise<DataRecord> {
  try {
    console.log("Creating record with data:", data)

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Create error:", errorText)
      throw new Error(`Failed to create record: ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error("createRecord error:", error)
    throw error
  }
}

export async function updateRecord(id: string, data: DataRecord): Promise<DataRecord> {
  try {
    console.log("Updating record with ID:", id, "and data:", data)

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Update error:", errorText)
      throw new Error(`Failed to update record: ${errorText}`)
    }

    return response.json()
  } catch (error) {
    console.error("updateRecord error:", error)
    throw error
  }
}

export async function deleteRecord(id: string): Promise<void> {
  try {
    console.log("Deleting record with ID:", id)

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Delete error:", errorText)
      throw new Error(`Failed to delete record: ${errorText}`)
    }
  } catch (error) {
    console.error("deleteRecord error:", error)
    throw error
  }
}

