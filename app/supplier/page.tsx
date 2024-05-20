'use client'
import { useState, useEffect } from 'react'

interface Supplier {
  id: number
  invoice: string
  name: string
  email: string
  contact: string
  detail: string
}
interface CheckBox {
  id: number
  invoice: string
}

const SupplierPage = () => {
  const [supplier, setSupplier] = useState<Supplier[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSupplier()
  }, [])

  const fetchSupplier = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)
      if (!res.ok) {
        throw new Error('Failed to fetch Supplier')
      }
      const supplierData: Supplier[] = await res.json()
      setSupplier(supplierData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-row space-x-96">
        {/* <h1 className="text-white text-center ">Supplier</h1> */}
      </div>
      {error ? (
        <p> Error: {error}</p>
      ) : (
        <div className="flex flex-row space-x-5 mt-10">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Invoice No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Detail</th>
              </tr>
            </thead>
            {supplier.map(({ id, invoice, name, email, contact, detail }) => (
              <tbody key={id} className=" text-white">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      className="checkbox"
                      tabIndex={id}
                      id={invoice}
                      value={invoice}
                    />
                  </th>
                  <th>{invoice}</th>
                  <th>{name}</th>
                  <th>{email}</th>
                  <th>{contact}</th>
                  <th>{detail}</th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  )
}

export default SupplierPage
