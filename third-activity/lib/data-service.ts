import { v4 as uuidv4 } from "uuid"

// Define a proper type for our records
export type Record = {
  id: string
  firstName: string
  lastName: string
  groupName: string
  role: string
  expectedSalary: number
  expectedDateOfDefense: string
  createdAt: string
  updatedAt?: string
}

// In-memory database
const records: Record[] = []

// Data service functions
export const dataService = {
  // Get all records
  getAll: () => {
    return [...records]
  },

  // Get a record by ID
  getById: (id: string) => {
    return records.find((record) => record.id === id)
  },

  // Create a new record
  create: (data: Omit<Record, "id" | "createdAt">) => {
    const newRecord: Record = {
      id: uuidv4(),
      ...data,
      expectedSalary: Number(data.expectedSalary),
      createdAt: new Date().toISOString(),
    }

    records.push(newRecord)
    return newRecord
  },

  // Update a record
  update: (id: string, data: Omit<Record, "id" | "createdAt" | "updatedAt">) => {
    const index = records.findIndex((record) => record.id === id)

    if (index === -1) {
      return null
    }

    const updatedRecord: Record = {
      ...records[index],
      ...data,
      expectedSalary: Number(data.expectedSalary),
      updatedAt: new Date().toISOString(),
    }

    records[index] = updatedRecord
    return updatedRecord
  },

  // Delete a record
  delete: (id: string) => {
    const index = records.findIndex((record) => record.id === id)

    if (index === -1) {
      return false
    }

    records.splice(index, 1)
    return true
  },
}

