"use client"
import { useState } from "react"
import { Proposal } from "../lib/types"
import ProposalHero from "./ProposalHero"
import ExecutiveSummarySection from "./ExecutiveSummarySection"
import ProblemStatementSection from "./ProblemStatementSection"
import ObjectivesSection from "./ObjectivesSection"
import SolutionOverviewSection from "./SolutionOverviewSection"
import TimelineSection from "./TimelineSection"
import TeamSection from "./TeamSection"
import BudgetSection from "./BudgetSection"
import NextStepsSection from "./NextStepsSection"
import ProposalFooter from "./ProposalFooter"

interface ProposalContentProps {
    proposal: Proposal
}

export default function ProposalContent({ proposal }: ProposalContentProps) {
    const [isEditing, setIsEditing] = useState(false)

    const handleExportPDF = async () => {
        window.print()
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <ProposalHero
                projectName={proposal.formData.projectName}
                description={proposal.formData.description}
                timeline={proposal.formData.timeline}
                createdAt={proposal.createdAt}
            />
            {proposal.sections.executiveSummary && (
                <ExecutiveSummarySection data={proposal.sections.executiveSummary} />
            )}
            {proposal.sections.problemStatement && (
                <ProblemStatementSection data={proposal.sections.problemStatement} />
            )}
            {proposal.sections.objectives && (
                <ObjectivesSection data={proposal.sections.objectives} />
            )}
            {proposal.sections.solution && (
                <SolutionOverviewSection data={proposal.sections.solution} />
            )}
            {proposal.sections.timeline && (
                <TimelineSection data={proposal.sections.timeline} />
            )}
            {proposal.sections.team && <TeamSection data={proposal.sections.team} />}
            {proposal.sections.budget && <BudgetSection data={proposal.sections.budget} />}
            <NextStepsSection />
            <ProposalFooter />
            <div className="fixed bottom-4 right-4 space-x-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
                <button
                    onClick={handleExportPDF}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Export PDF
                </button>
            </div>
        </div>
    )
}
