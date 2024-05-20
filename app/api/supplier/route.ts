import { NextRequest, NextResponse } from 'next/server'
import _ from 'lodash'
import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  //   const barcode = (formData.get('barcode') as decimal) || null
  const invoice = formData.get('invoice') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const contact = formData.get('contact') as string
  const detail = formData.get('detail') as string

  try {
    // Save to database
    const result = await prisma.supplier.create({
      data: {
        invoice,
        name,
        email,
        contact,
        detail,
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
  const supplier = await prisma.supplier.findMany({})

  return NextResponse.json(supplier)
}
