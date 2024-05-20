import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Role } from '@prisma/client'

interface UseRoleResult {
  userRole: string | null
  loading: boolean
  error: string | null
}

const useRole = (): UseRoleResult => {
  const { data: session, status } = useSession()
  const [userRole, setUserRole] = useState<string | null>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRole = async () => {
      if (status === 'loading') return

      if (!session) {
        setError('No session found')
        setLoading(false)
        return
      }

      const email = session.user?.email

      if (!email) {
        setError('No email found in session')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/getRole`, {
          method: 'POST',
          body: JSON.stringify({ email }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setUserRole(data)
      } catch (err) {
        setError('User not found or another error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRole()
  }, [session, status])

  return { userRole, loading, error }
}

export default useRole
