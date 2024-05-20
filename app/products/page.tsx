'use client'
import _ from 'lodash'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Product {
  id: number
  barcode: number
  name: string
  price: number
  image: string
  category: Category
  supplier: Supplier
}
interface Supplier {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      const productsData: Product[] = await res.json()
      setProducts(productsData)

      // fetchCategory()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-row space-x-96"></div>
      {error ? (
        <p> Error: {error}</p>
      ) : (
        <div className="flex flex-row space-x-5 mt-10">
          {products.map(
            ({ id, barcode, category, supplier, name, price, image }) => (
              <div key={id} className="card w-96 bg-base-100 shadow-xl">
                {image && (
                  <figure className="mt-5">
                    <Image
                      src={`${image}`}
                      alt="Shoes"
                      width={300}
                      height={300}
                    />
                  </figure>
                )}
                <div className="card-body text-white container bottom-0">
                  {barcode && <p>Barcode: {barcode}</p>}
                  {name && <h2 className="card-title">Name: {name}</h2>}
                  {category.name && (
                    <h2>
                      Category: <strong>{category.name}</strong>
                    </h2>
                  )}
                  {supplier.name && (
                    <h2>
                      Supplier: <strong>{supplier.name}</strong>
                    </h2>
                  )}
                  {price && (
                    <p className=" text-white">
                      Price: <strong>Rs. {price}</strong>
                    </p>
                  )}
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  )
}

export default ProductPage
