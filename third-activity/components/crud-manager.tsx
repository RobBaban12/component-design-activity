"use client"

import { useState, useEffect } from "react"
import DataTable from "./data-table"
import DataForm from "./data-form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createRecord, deleteRecord, getAllRecords, updateRecord } from "@/lib/api-service"

export type DataRecord = {
  id?: string
  firstName: string
  lastName: string
  groupName: string
  role: string
  expectedSalary: number
  expectedDateOfDefense: string
}

export default function CrudManager() {
  const [records, setRecords] = useState<DataRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<DataRecord | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    setIsLoading(true)
    try {
      const data = await getAllRecords()
      setRecords(data)
    } catch (error) {
      console.error("Error fetching records:", error)
      toast({
        title: "Error",
        description: "Failed to fetch records",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (data: DataRecord) => {
    try {
      console.log("Creating record:", data)
      const newRecord = await createRecord(data)
      console.log("New record created:", newRecord)

      // Refresh the records list instead of manually updating state
      await fetchRecords()

      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Record created successfully",
      })
    } catch (error) {
      console.error("Error creating record:", error)
      toast({
        title: "Error",
        description: "Failed to create record",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async (data: DataRecord) => {
    if (!data.id) return

    try {
      console.log("Updating record:", data)
      await updateRecord(data.id, data)

      // Refresh the records list
      await fetchRecords()

      setIsFormOpen(false)
      setCurrentRecord(null)
      toast({
        title: "Success",
        description: "Record updated successfully",
      })
    } catch (error) {
      console.error("Error updating record:", error)
      toast({
        title: "Error",
        description: "Failed to update record",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Invalid record ID",
        variant: "destructive",
      })
      return
    }

    try {
      console.log("Deleting record:", id)
      await deleteRecord(id)

      // Refresh the records list
      await fetchRecords()

      toast({
        title: "Success",
        description: "Record deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting record:", error)
      toast({
        title: "Error",
        description: "Failed to delete record",
        variant: "destructive",
      })
    }
  }

  const openCreateForm = () => {
    setCurrentRecord(null)
    setIsFormOpen(true)
  }

  const openEditForm = (record: DataRecord) => {
    setCurrentRecord(record)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Records</h2>
        <Button onClick={openCreateForm}>Add New Record</Button>
      </div>

      <DataTable records={records} isLoading={isLoading} onEdit={openEditForm} onDelete={handleDelete} />

      {isFormOpen && (
        <DataForm
          record={currentRecord}
          onSubmit={currentRecord ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsFormOpen(false)
            setCurrentRecord(null)
          }}
        />
      )}
    </div>
  )
}

