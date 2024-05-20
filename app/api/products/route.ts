import mime from 'mime'
import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const barcode = formData.get('barcode') as string
  const name = formData.get('name') as string
  const categoryId = formData.get('category') as string
  const supplierId = formData.get('supplier') as string
  const price = formData.get('price') as any
  const quantity = formData.get('quantity') as any
  const image = formData.get('image') as File

  const buffer = Buffer.from(await image.arrayBuffer())
  const relativeUploadDir = `/images/products/${new Date(Date.now())
    .toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-')}`

  const uploadDir = join(process.cwd(), 'public', relativeUploadDir)

  try {
    await stat(uploadDir)
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true })
    } else {
      console.error(
        'Error while trying to create directory when uploading a file\n',
        e
      )
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      )
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ''
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`
    await writeFile(`${uploadDir}/${filename}`, buffer)
    const fileUrl = `${relativeUploadDir}/${filename}`

    // Save to database
    const result = await prisma.product.create({
      data: {
        barcode: parseInt(barcode),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        supplierId: parseInt(supplierId),
        image: fileUrl,
      },
    })

    return NextResponse.json({ data: result })
  } catch (e) {
    console.error('Error while trying to upload a file\n', e)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      supplier: true,
    },
  })
  return NextResponse.json(products)
}
