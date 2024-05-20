import React, { ReactNode } from 'react'
import SideBar from './SideBar'
import RolePage from './role'
interface Props {
  children: ReactNode
}
const AdminLayout = async ({ children }: Props) => {
  const Role = await RolePage()
  return (
    <div className="flex flex-row justify-between">
      <aside className="mr-10">{Role === 'ADMIN' && <SideBar />}</aside>
      <main className="flex justify-center">{children}</main>
      <div className="flex justify-center"></div>
    </div>
  )
}

export default AdminLayout
