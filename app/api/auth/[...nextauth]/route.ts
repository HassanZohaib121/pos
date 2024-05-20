import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import prisma from '@/prisma/client'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const email = credentials?.email.toString()
        const hashPassword = credentials?.password.toString()
        try {
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) {
            throw new Error('User not found')
          }
          const passwordCorrect = await compare(
            hashPassword || '',
            user.password
          )
          if (passwordCorrect) {
            // Return user data if necessary
            return {
              id: user.id,
              email: user.email,
              role: user.role,
              // Add other necessary user data
            }
          } else {
            throw new Error('Incorrect password')
          }
        } catch (error) {
          // Handle errors appropriately
          // console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        // Add other user properties if needed
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.role = token.role
        // Add other user properties if needed
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
