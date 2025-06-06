import { notFound } from "next/navigation"
import { Proposal } from "@/app/lib/types"
import ProposalContent from "@/components/ProposalContent"

interface ProposalPageProps {
    params: {
        id: string
    }
}

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

async function getProposal(id: string): Promise<Proposal | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/proposals/${id}`)
        if (!res.ok) {
            return null
        }
        return (await res.json()) as Proposal
    } catch (error) {
        console.error("Error loading proposal:", error)
        return null
    }
}

export default async function ProposalPage({ params }: ProposalPageProps) {
    const proposal = await getProposal(params.id)

    if (!proposal) {
        notFound()
    }

    return <ProposalContent proposal={proposal} />
}
