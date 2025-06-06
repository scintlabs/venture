import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, UploadedFile } from '@/app/lib/types'

interface UploadResponse {
  fileIds: string[]
  files: UploadedFile[]
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<UploadResponse>>> {
  try {
    const formData = await request.formData()
    const res = await fetch(`${BACKEND_URL}/files/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
