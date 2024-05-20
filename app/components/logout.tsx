'use client'
import { signOut } from 'next-auth/react'

export default function Logout() {
  return (
    <button
      onClick={() => {
        signOut()
      }}
      className="font-bold text-lg"
    >
      Logout
    </button>
  )
}
