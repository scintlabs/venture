import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 })
  }
  const res = await fetch(`${BACKEND_URL}/proposals/${id}`)
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
