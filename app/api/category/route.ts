import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'
import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const name = formData.get('name') as string
  // const name = fetchName.toUpperCase()

  try {
    // Save to database
    const result = await prisma.category.create({
      data: {
        name,
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
}

export async function GET() {
  const category = await prisma.category.findMany({})
  return NextResponse.json(category)
}
