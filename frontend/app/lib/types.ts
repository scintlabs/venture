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

export interface Objectives {
    objectives: string[]
    kpis: Array<{
        metric: string
        target: string
        status: "green" | "yellow" | "red"
    }>
}

export interface SolutionOverview {
    pillars: Array<{
        name: string
        description: string
        icon: string
    }>
    techStrategy: string
    architecture: string[]
}

export interface Timeline {
    phases: Array<{
        name: string
        description: string
        duration: string
        deliverables: string[]
    }>
}

export interface Team {
    members: Array<{
        name: string
        role: string
        expertise: string
        initials: string
    }>
}

export interface Budget {
    breakdown: Array<{
        category: string
        amount: number
        description: string
    }>
    total: number
    paymentSchedule: Array<{
        milestone: string
        percentage: number
        amount: number
        timing: string
    }>
}

export interface ProposalSections {
    executiveSummary: ExecutiveSummary
    problemStatement: ProblemStatement
    objectives?: Objectives
    solution?: SolutionOverview
    timeline?: Timeline
    team?: Team
    budget?: Budget
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
