export interface FormData {
    projectName: string
    clientName: string
    industry: string
    timeline: string
    budget: string
    objectives: string
    description: string
    stakeholders?: string
    requirements?: string
}

export interface UploadedFile {
    id: string
    filename: string
    originalName: string
    content: string
    type: string
}

export interface ExecutiveSummary {
    problem: string
    opportunity: string
    solution: string
    metrics: {
        payback: string
        savings: string
        timeline: string
    }
}

export interface ProblemStatement {
    challenges: string[]
    quotes: Array<{
        text: string
        author: string
        role?: string
    }>
    impactMetrics: {
        cost?: string
        efficiency?: string
        competitive?: string
    }
}

export interface ProposalSections {
    executiveSummary: ExecutiveSummary
    problemStatement: ProblemStatement
}

export interface Proposal {
    id: string
    createdAt: string
    formData: FormData
    sections: ProposalSections
}

export interface ApiResponse {
    success: boolean
    data?: string
    error?: string
}
