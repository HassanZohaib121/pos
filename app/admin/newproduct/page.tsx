'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'

interface Category {
  id: number
  name: string
}
interface Supplier {
  id: string
  invoice: string
  name: string
  email: string
  contact: string
  detail: string
}

export default function ProductsPage() {
  const [category, setCategory] = useState<Category[]>([])
  const [supplier, setSupplier] = useState<Supplier[]>([])
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()

    // Reset form fields
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  useEffect(() => {
    fetchCategory()
    fetchSupplier()
  }, [])

  const fetchCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      if (!res.ok) {
        throw new Error('Failed to fetch Category')
      }
      const categorysData: Category[] = await res.json()
      setCategory(categorysData)
    } catch (error: any) {
      setError(error.message)
    }
  }
  const fetchSupplier = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)
      if (!res.ok) {
        throw new Error('Failed to fetch supplier')
      }
      const suppliersData: Supplier[] = await res.json()
      setSupplier(suppliersData)
    } catch (error: any) {
      setError(error.message)
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-3 space-y-5">
        <p className="font-bold text-lg label">Add New Product</p>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-5"
        >
          <label className="input input-bordered w-full max-w-xs input-primary flex items-center gap-2">
            Barcode
            <input type="text" name="barcode" />
          </label>
          <label className="input input-bordered w-full max-w-xs input-primary flex items-center gap-2">
            Name
            <input type="text" name="name" />
          </label>
          <label className="input input-bordered w-full max-w-xs input-primary flex items-center gap-2">
            Price
            <input type="text" name="price" />
          </label>
          <label className="input input-bordered w-full max-w-xs input-primary flex items-center gap-2">
            Quantity
            <input type="text" name="quantity" />
          </label>
          <select
            id="category"
            name="category"
            className="select select-info w-full max-w-xs"
          >
            <option disabled selected defaultValue={-1}>
              Select Category
            </option>
            {category.map(({ id, name }) => (
              <>
                <option key={id} value={id} className="capitalize">
                  {name}
                </option>
              </>
            ))}
          </select>
          <select
            id="supplier"
            name="supplier"
            className="select select-info w-full max-w-xs"
          >
            <option disabled selected defaultValue={-1}>
              Select Supplier
            </option>
            {supplier.map(({ id, name }) => (
              <>
                <option key={id} value={id} className="capitalize">
                  {name}
                </option>
              </>
            ))}
          </select>
          <input
            type="file"
            className="file file-input file-input-primary w-full max-w-xs flex items-center gap-2"
            name="image"
          />
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs flex items-center gap-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
