import { writeFile, mkdir } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import pdf from 'pdf-parse'
import { UploadedFile, ApiResponse } from '@/types'

interface UploadResponse {
  fileIds: string[]
  files: UploadedFile[]
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<UploadResponse>>> {
  try {
    const data = await request.formData()
    const files = data.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No files uploaded'
      }, { status: 400 })
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const uploadedFiles: UploadedFile[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Save file
      const filename = `${uuidv4()}-${file.name}`
      const filepath = path.join(uploadsDir, filename)
      await writeFile(filepath, buffer)

      // Extract text content
      let content = ''
      if (file.type === 'application/pdf') {
        try {
          const pdfData = await pdf(buffer)
          content = pdfData.text
        } catch (error) {
          console.error('PDF parsing error:', error)
          content = 'PDF parsing failed'
        }
      } else if (file.type.startsWith('text/')) {
        content = buffer.toString('utf-8')
      } else {
        content = 'Binary file - content not extracted'
      }

      uploadedFiles.push({
        id: uuidv4(),
        filename,
        originalName: file.name,
        content,
        type: file.type
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        fileIds: uploadedFiles.map(f => f.id),
        files: uploadedFiles
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      success: false,
      error: 'Upload failed'
    }, { status: 500 })
  }
}
