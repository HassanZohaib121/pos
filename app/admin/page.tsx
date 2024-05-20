'use client'
import useRole from './useRole'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  const { userRole, loading, error } = useRole()
  if (loading) {
    return <div className=" text-white">Loading...</div>
  } else if (error) {
    return <div className=" text-white">Error: {error}</div>
  } else if (userRole !== 'ADMIN') {
    redirect('/')
  } else {
    return <div className=" text-white font-bold text-3xl">Admin Page</div>
  }
}
