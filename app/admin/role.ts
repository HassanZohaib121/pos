import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'

const RolePage = async () => {
  const session = await getServerSession()

  if (!session) {
    throw new Error('No session found')
  }

  const email = session.user?.email

  if (!email) {
    throw new Error('No email found in session')
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user.role
}

export default RolePage
