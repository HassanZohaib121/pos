// 'use client'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import Logout from './logout'

export default async function Navbar() {
  const session = await getServerSession()
  return (
    <div className="navbar bg-blue-700 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/supplier">Supplier</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          POS
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-lg">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/supplier">Supplier</Link>
          </li>
          <li>
            <Link href="/category">Category</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            {!!session && (
              <Link href="/admin" className="font-bold text-lg">
                Admin
              </Link>
            )}
          </li>
          <li>
            {!session && (
              <Link href="/login" className="font-bold text-lg">
                Login
              </Link>
            )}
          </li>
          <li>{!!session && <Logout />}</li>
        </ul>
      </div>
    </div>
  )
}
