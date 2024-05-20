'use client'
import { useState, useEffect } from 'react'

interface Category {
  id: number
  name: string
}

const CategoryPage = () => {
  const [category, setCategory] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      if (!res.ok) {
        throw new Error('Failed to fetch Category')
      }
      const categoryData: Category[] = await res.json()
      setCategory(categoryData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-row space-x-96">
        {/* <h1 className="">Categories</h1> */}
      </div>
      {error ? (
        <p> Error: {error}</p>
      ) : (
        <div className="flex flex-row space-x-5 mt-10">
          {category.map(({ id, name }) => (
            <div
              key={id}
              className="card w-96 bg-base-100 shadow-xl dark:glass dark:text-black"
            >
              <div className="card-body glass">
                {name && <h2 className="card-title capitalize">{name}</h2>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CategoryPage
