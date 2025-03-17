import CrudManager from "@/components/crud-manager"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Data Management System</h1>
      <CrudManager />
    </main>
  )
}

