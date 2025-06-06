import OpenAI from "openai"
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { FormData, Proposal, ApiResponse } from "@/app/lib/types"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

interface GenerateRequest extends FormData {
    fileIds: string[]
}

interface SectionPrompts {
    [key: string]: string
}

const SECTION_PROMPTS: SectionPrompts = {
    executiveSummary: `
    Based on the project details and uploaded documents, create an executive summary that includes:

    - One sentence problem statement
    - One sentence opportunity statement
    - High-level solution overview with timeline and cost range
    - Key ROI metrics (payback period, projected savings, timeline)

    Return as JSON with: { "problem": string, "opportunity": string, "solution": string, "metrics": { "payback": string, "savings": string, "timeline": string } }
  `,

    problemStatement: `
    Analyze the uploaded documents and project context to create a problem statement including:
    - Current state challenges and pain points
    - Supporting data or stakeholder quotes
    - Impact of inaction (costs, risks, competitive disadvantage)

    Return as JSON with: { "challenges": string[], "quotes": [{"text": string, "author": string, "role": string}], "impactMetrics": {"cost": string, "efficiency": string, "competitive": string} }
  `,

    objectives: `
    Create SMART objectives and success metrics based on the project context.
    Return as JSON with: { "objectives": string[], "kpis": [{"metric": string, "target": string, "status": "green"|"yellow"|"red"}] }
  `,

    solution: `
    Design a solution overview with 3 core feature pillars and technical strategy.
    Return as JSON with: { "pillars": [{"name": string, "description": string, "icon": string}], "techStrategy": string, "architecture": string[] }
  `,

    timeline: `
    Create a project timeline with 4-6 major milestones.
    Return as JSON with: { "phases": [{"name": string, "description": string, "duration": string, "deliverables": string[]}] }
  `,

    team: `
    Suggest team composition with roles and responsibilities.
    Return as JSON with: { "members": [{"name": string, "role": string, "expertise": string, "initials": string}] }
  `,

    budget: `
    Create a budget breakdown and pricing model.
    Return as JSON with: { "breakdown": [{"category": string, "amount": number, "description": string}], "total": number, "paymentSchedule": [{"milestone": string, "percentage": number, "amount": number, "timing": string}] }
  `,
}

async function saveProposal(proposalId: string, proposal: Proposal): Promise<void> {
    const proposalsDir = path.join(process.cwd(), "proposals")
    await mkdir(proposalsDir, { recursive: true })

    const filepath = path.join(proposalsDir, `${proposalId}.json`)
    await writeFile(filepath, JSON.stringify(proposal, null, 2))
}

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse<{ proposalId: string }>>> {
    try {
        const requestData: GenerateRequest = await request.json()
        const { fileIds, ...formData } = requestData
        const context = `
      Project: ${formData.projectName}
      Client: ${formData.clientName}
      Industry: ${formData.industry}
      Timeline: ${formData.timeline}
      Budget: ${formData.budget}
      Objectives: ${formData.objectives}
      Description: ${formData.description}

      Additional Context: ${JSON.stringify(formData)}

      File IDs: ${fileIds.join(", ")}
      [Note: In production, this would include extracted file content]
    `

        const proposalId = uuidv4()
        const proposal: Proposal = {
            id: proposalId,
            createdAt: new Date().toISOString(),
            formData,
            sections: {},
        }

        // Generate each section
        for (const [sectionKey, prompt] of Object.entries(SECTION_PROMPTS)) {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an expert proposal writer. Generate professional, specific content based on the provided context. Always return valid JSON.",
                        },
                        {
                            role: "user",
                            content: `${prompt}\n\nContext:\n${context}`,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 1500,
                })

                const responseContent = completion.choices[0].message.content
                if (!responseContent) {
                    throw new Error("Empty response from OpenAI")
                }

                const sectionContent = JSON.parse(responseContent)
                proposal.sections[sectionKey] = sectionContent
            } catch (error) {
                console.error(`Error generating ${sectionKey}:`, error)
                proposal.sections[sectionKey] = {
                    error: "Generation failed",
                    fallback: `Please manually complete the ${sectionKey} section.`,
                }
            }
        }

        await saveProposal(proposalId, proposal)

        return NextResponse.json({
            success: true,
            data: { proposalId },
        })
    } catch (error) {
        console.error("Generation error:", error)
        return NextResponse.json(
            {
                success: false,
                error: "Proposal generation failed",
            },
            { status: 500 }
        )
    }
}
