import { readFile } from "fs/promises"
import path from "path"
import { notFound } from "next/navigation"
import { Proposal } from "@/types"
import ProposalContent from "@/components/ProposalContent"

interface ProposalPageProps {
    params: {
        id: string
    }
}

async function getProposal(id: string): Promise<Proposal | null> {
    try {
        const filepath = path.join(process.cwd(), "proposals", `${id}.json`)
        const data = await readFile(filepath, "utf-8")
        return JSON.parse(data) as Proposal
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
