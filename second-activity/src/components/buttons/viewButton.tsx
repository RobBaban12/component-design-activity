import Link from "next/link"

const ViewButton = () => {
  return (
       <div className="h-screen w-full flex items-center justify-center">
      <Link href="/dashboard/products" className="">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          View products
        </button>
      </Link>
    </div>
  )
}

export default ViewButton
