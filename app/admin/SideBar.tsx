import Link from 'next/link'

export default function SideBar() {
  return (
    <div className="flex flex-col max-w-36 gap-y-4 ">
      <Link href="/admin/newcategory" className="btn btn-info text-white">
        Add New Category
      </Link>
      <Link href="/admin/newproduct" className="btn btn-info text-white">
        Add New Product
      </Link>
      <Link href="/admin/newsupplier" className="btn btn-info text-white">
        Add New Supplier
      </Link>
    </div>
  )
}
