"use client"
import { useState } from "react"
import { Proposal } from "../lib/types"

interface ProposalContentProps {
    proposal: Proposal
}

export default function ProposalContent({ proposal }: ProposalContentProps) {
    const [isEditing, setIsEditing] = useState(false)

    const handleExportPDF = async () => {
        // Implement PDF export logic
        window.print()
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Your existing proposal HTML structure goes here */}

            {/* Cover Section */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white min-h-screen flex items-center relative overflow-hidden">
                <div className="absolute top-4 right-4 text-sm opacity-80">
                    <div>{new Date(proposal.createdAt).toLocaleDateString()}</div>
                    <div>Version 1.0</div>
                </div>

                <div className="container mx-auto px-8 z-10">
                    <h1 className="text-6xl font-bold mb-4 leading-tight">
                        {proposal.formData.projectName}
                    </h1>
                    <p className="text-2xl mb-8 opacity-90">{proposal.formData.description}</p>
                    <div className="text-xl font-light">
                        {proposal.formData.timeline} delivery timeline
                    </div>
                </div>
            </section>

            {/* Executive Summary */}
            {proposal.sections.executiveSummary && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">Executive Summary</h2>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                                    <p className="text-lg text-gray-700">
                                        {proposal.sections.executiveSummary.problem}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-3">The Opportunity</h3>
                                    <p className="text-lg text-gray-700">
                                        {proposal.sections.executiveSummary.opportunity}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Our Solution</h3>
                                    <p className="text-lg text-gray-700">
                                        {proposal.sections.executiveSummary.solution}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                                    <div className="text-3xl font-bold text-green-700">
                                        {proposal.sections.executiveSummary.metrics.payback}
                                    </div>
                                    <div className="text-green-600">Payback Period</div>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <div className="text-3xl font-bold text-blue-700">
                                        {proposal.sections.executiveSummary.metrics.savings}
                                    </div>
                                    <div className="text-blue-600">Projected Annual Savings</div>
                                </div>

                                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                                    <div className="text-3xl font-bold text-purple-700">
                                        {proposal.sections.executiveSummary.metrics.timeline}
                                    </div>
                                    <div className="text-purple-600">To Full Deployment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Continue with other sections... */}

            {/* Fixed Controls */}
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
