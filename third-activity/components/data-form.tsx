"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { DataRecord } from "./crud-manager"
import { useEffect } from "react"

interface DataFormProps {
  record: DataRecord | null
  onSubmit: (data: DataRecord) => void
  onCancel: () => void
}

export default function DataForm({ record, onSubmit, onCancel }: DataFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DataRecord>({
    defaultValues: record || {
      firstName: "",
      lastName: "",
      groupName: "",
      role: "",
      expectedSalary: 0,
      expectedDateOfDefense: new Date().toISOString().split("T")[0], // Default to today's date
    },
  })

  useEffect(() => {
    if (record) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedRecord = {
        ...record,
        expectedDateOfDefense: record.expectedDateOfDefense
          ? new Date(record.expectedDateOfDefense).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      }
      reset(formattedRecord)
    }
  }, [record, reset])

  const onFormSubmit = (data: DataRecord) => {
    // Ensure expectedSalary is a number
    const formattedData = {
      ...data,
      expectedSalary: Number(data.expectedSalary),
    }

    if (record?.id) {
      onSubmit({ ...formattedData, id: record.id })
    } else {
      onSubmit(formattedData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{record ? "Edit Record" : "Create New Record"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName", { required: "First name is required" })} />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName", { required: "Last name is required" })} />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input id="groupName" {...register("groupName", { required: "Group name is required" })} />
              {errors.groupName && <p className="text-sm text-red-500">{errors.groupName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...register("role", { required: "Role is required" })} />
              {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                type="number"
                {...register("expectedSalary", {
                  required: "Expected salary is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Salary must be positive" },
                })}
              />
              {errors.expectedSalary && <p className="text-sm text-red-500">{errors.expectedSalary.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedDateOfDefense">Expected Date of Defense</Label>
              <Input
                id="expectedDateOfDefense"
                type="date"
                {...register("expectedDateOfDefense", { required: "Expected date of defense is required" })}
              />
              {errors.expectedDateOfDefense && (
                <p className="text-sm text-red-500">{errors.expectedDateOfDefense.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : record ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

