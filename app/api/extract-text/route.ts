import pdfParse from 'pdf-parse'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)

    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error('PDF Parse Error:', error)
    return NextResponse.json({ error: 'Failed to extract PDF text' }, { status: 500 })
  }
}
