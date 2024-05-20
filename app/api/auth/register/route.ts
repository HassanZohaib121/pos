import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'
import { hash } from 'bcrypt'
import prisma from '@/prisma/client'

export async function POST(request: Request) {
  try {
    const { name, email, hashPassword } = await request.json()
    const password = await hash(hashPassword, 10)
    // Save to database
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return NextResponse.json({ data: result })
  } catch (e) {
    console.error('Error', e)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
  return NextResponse.json({ message: 'success' })
}
