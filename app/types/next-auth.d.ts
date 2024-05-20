// types/next-auth.d.ts
import { Role } from '@prisma/client'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      role: Role
      // Add other user properties if needed
    }
  }

  interface User {
    id: string
    email: string
    role: Role
    // Add other user properties if needed
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    role: Role
    // Add other user properties if needed
  }
}
