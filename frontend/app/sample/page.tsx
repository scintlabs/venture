import ProposalContent from "@/app/components/ProposalContent"
import { Proposal } from "@/app/lib/types"

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

async function getSampleProposal(): Promise<Proposal | null> {
    try {
        const res = await fetch(`${BACKEND_URL}/proposals/sample`)
        if (!res.ok) {
            return null
        }
        return (await res.json()) as Proposal
    } catch (err) {
        console.error('Error loading sample proposal:', err)
        return null
    }
}

export default async function SamplePage() {
    const proposal = await getSampleProposal()

    if (!proposal) {
        return <div className="p-8 text-center">Unable to load sample proposal.</div>
    }

    return <ProposalContent proposal={proposal} />
}
