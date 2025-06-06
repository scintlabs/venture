import { NextRequest, NextResponse } from "next/server"
import { FormData, ApiResponse } from "@/app/lib/types"

interface GenerateRequest extends FormData {
    fileIds: string[]
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse<{ proposalId: string }>>> {
    try {
        const body: GenerateRequest = await request.json()
        const res = await fetch(`${BACKEND_URL}/proposals/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error('Generation error:', error)
        return NextResponse.json({ success: false, error: 'Proposal generation failed' }, { status: 500 })
    }
}
