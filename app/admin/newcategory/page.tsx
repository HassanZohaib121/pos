'use client'
import { FormEvent, useRef } from 'react'

export default function CategoryPage() {
  const formRef = useRef<HTMLFormElement>(null)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/category', {
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

  return (
    <>
      <div className="flex flex-col items-center mt-3 space-y-5">
        <p className="font-bold text-lg label">Add New Category</p>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col items-center space-y-5"
        >
          <label className="input input-bordered w-full max-w-xs input-primary flex items-center gap-2">
            Name
            <input type="text" name="name" />
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs flex items-center gap-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
