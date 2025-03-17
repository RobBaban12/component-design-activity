"use client"

import type { DataRecord } from "./crud-manager"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"

interface DataTableProps {
  records: DataRecord[]
  isLoading: boolean
  onEdit: (record: DataRecord) => void
  onDelete: (id: string) => void
}

export default function DataTable({ records, isLoading, onEdit, onDelete }: DataTableProps) {
  if (isLoading) {
    return <div className="text-center py-10">Loading records...</div>
  }

  if (records.length === 0) {
    return <div className="text-center py-10">No records found. Add a new record to get started.</div>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Group Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Expected Salary</TableHead>
            <TableHead>Expected Defense Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.firstName}</TableCell>
              <TableCell>{record.lastName}</TableCell>
              <TableCell>{record.groupName}</TableCell>
              <TableCell>{record.role}</TableCell>
              <TableCell>${record.expectedSalary.toLocaleString()}</TableCell>
              <TableCell>{formatDate(record.expectedDateOfDefense)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(record)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500"
                    onClick={() => {
                      if (record.id) {
                        onDelete(record.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

