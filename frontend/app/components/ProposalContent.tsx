"use client"
import { useState } from "react"
import { Proposal } from "../lib/types"

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

            {/* Problem & Opportunity */}
            {proposal.sections.problemStatement && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Problem &amp; Opportunity
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">
                                    Current State Challenges
                                </h3>
                                <ul className="space-y-4">
                                    {proposal.sections.problemStatement.challenges.map(
                                        (c, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start"
                                            >
                                                <span className="text-red-500 mr-3">
                                                    ⚠️
                                                </span>
                                                <span>{c}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {proposal.sections.problemStatement.quotes.length >
                                0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h4 className="font-semibold mb-4">
                                        Stakeholder Feedback
                                    </h4>
                                    {proposal.sections.problemStatement.quotes.map(
                                        (q, i) => (
                                            <blockquote
                                                key={i}
                                                className="italic text-gray-700 border-l-4 border-blue-500 pl-4 mb-4"
                                            >
                                                &ldquo;{q.text}&rdquo;
                                                <footer className="mt-2 text-sm text-gray-600">
                                                    — {q.author}
                                                    {q.role ? `, ${q.role}` : ""}
                                                </footer>
                                            </blockquote>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {proposal.sections.problemStatement.impactMetrics && (
                            <div className="bg-white p-8 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 text-center">
                                    Impact of Inaction
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {(
                                        Object.entries(
                                            proposal.sections.problemStatement
                                                .impactMetrics
                                        ) as Array<[
                                            string,
                                            string
                                        ]>
                                    ).map(([k, v]) => (
                                        <div className="text-center" key={k}>
                                            <div className="text-3xl font-bold text-red-600 mb-2">
                                                {v}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {k === "cost"
                                                    ? "Annual opportunity cost"
                                                    : k === "efficiency"
                                                    ? "Slower decision making"
                                                    : "Behind competitors"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Objectives & Success Metrics */}
            {proposal.sections.objectives && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Objectives &amp; Success Metrics
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">
                                    SMART Objectives
                                </h3>
                                <div className="space-y-4">
                                    {proposal.sections.objectives.objectives.map(
                                        (obj, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start"
                                            >
                                                <span className="text-green-500 mr-3 mt-1">
                                                    ✓
                                                </span>
                                                <div>{obj}</div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-6">
                                    Success KPIs
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-300 p-3 text-left">
                                                    Metric
                                                </th>
                                                <th className="border border-gray-300 p-3 text-center">
                                                    Target
                                                </th>
                                                <th className="border border-gray-300 p-3 text-center">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proposal.sections.objectives.kpis.map(
                                                (kpi, i) => (
                                                    <tr key={i}>
                                                        <td className="border border-gray-300 p-3">
                                                            {kpi.metric}
                                                        </td>
                                                        <td className="border border-gray-300 p-3 text-center">
                                                            {kpi.target}
                                                        </td>
                                                        <td className="border border-gray-300 p-3 text-center">
                                                            {kpi.status === "green"
                                                                ? "🟢"
                                                                : kpi.status ===
                                                                  "yellow"
                                                                ? "🟡"
                                                                : "🔴"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Solution Overview */}
            {proposal.sections.solution && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Solution Overview
                        </h2>

                        <div className="grid lg:grid-cols-3 gap-8 mb-12">
                            {proposal.sections.solution.pillars.map(
                                (pillar, i) => (
                                    <div
                                        key={i}
                                        className="bg-blue-50 p-8 rounded-lg text-center"
                                    >
                                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-white text-2xl">
                                                {pillar.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4">
                                            {pillar.name}
                                        </h3>
                                        <p className="text-gray-700">
                                            {pillar.description}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>

                        {proposal.sections.solution.architecture && (
                            <div className="bg-white p-8 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-semibold mb-6 text-center">
                                    System Architecture
                                </h3>
                                <div className="flex flex-wrap justify-center items-center gap-8">
                                    {proposal.sections.solution.architecture.map(
                                        (item, i) => (
                                            <div
                                                key={i}
                                                className="bg-blue-100 p-4 rounded-lg text-center"
                                            >
                                                <div className="font-semibold">
                                                    {item}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Timeline */}
            {proposal.sections.timeline && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Timeline &amp; Milestones
                        </h2>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

                            <div className="space-y-12">
                                {proposal.sections.timeline.phases.map(
                                    (phase, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center"
                                        >
                                            {i % 2 === 0 ? (
                                                <>
                                                    <div className="w-1/2 pr-8 text-right">
                                                        <h3 className="text-xl font-semibold">
                                                            {phase.name}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {phase.description}
                                                        </p>
                                                        <div className="text-sm text-gray-500">
                                                            {phase.duration}
                                                        </div>
                                                    </div>
                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                                                        <span className="text-white text-sm">
                                                            {i + 1}
                                                        </span>
                                                    </div>
                                                    <div className="w-1/2 pl-8"></div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-1/2 pr-8"></div>
                                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-10">
                                                        <span className="text-white text-sm">
                                                            {i + 1}
                                                        </span>
                                                    </div>
                                                    <div className="w-1/2 pl-8">
                                                        <h3 className="text-xl font-semibold">
                                                            {phase.name}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {phase.description}
                                                        </p>
                                                        <div className="text-sm text-gray-500">
                                                            {phase.duration}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Team */}
            {proposal.sections.team && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Team &amp; Roles
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {proposal.sections.team.members.map((member, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-white text-2xl">
                                            {member.initials}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <p className="text-gray-600">{member.role}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {member.expertise}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Budget */}
            {proposal.sections.budget && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-8">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Budget &amp; Pricing
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">
                                    Investment Breakdown
                                </h3>
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="space-y-4">
                                        {proposal.sections.budget.breakdown.map(
                                            (item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center py-2 border-b"
                                                >
                                                    <span>{item.category}</span>
                                                    <span className="font-semibold">
                                                        $
                                                        {item.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                        <div className="flex justify-between items-center py-3 text-xl font-bold bg-gray-50 px-4 rounded">
                                            <span>Total Investment</span>
                                            <span>
                                                $
                                                {proposal.sections.budget.total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold mb-6">
                                    Payment Schedule
                                </h3>
                                <div className="space-y-4">
                                    {proposal.sections.budget.paymentSchedule.map(
                                        (p, i) => (
                                            <div
                                                key={i}
                                                className="bg-white p-6 rounded-lg shadow-sm"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold">
                                                        {p.milestone}
                                                    </span>
                                                    <span className="text-lg font-bold">
                                                        $
                                                        {p.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {p.percentage}% - {p.timing}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Next Steps */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-8 text-center">
                    <h2 className="text-4xl font-bold mb-8">
                        Ready to Transform Your Data Strategy?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Let&apos;s turn your data silos into intelligent insights
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">1. Approve Proposal</h3>
                            <p className="text-sm opacity-80">
                                Review and sign off on scope and budget
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">2. Kickoff Meeting</h3>
                            <p className="text-sm opacity-80">
                                Align stakeholders and finalize requirements
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">3. Start Building</h3>
                            <p className="text-sm opacity-80">
                                Begin development with weekly progress updates
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                            Schedule Kickoff Meeting →
                        </button>
                        <div className="text-sm opacity-80">
                            <p>Questions? Contact us at hello@studio.com</p>
                            <p>We respond within 4 hours</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-900 text-white text-center">
                <div className="container mx-auto px-8">
                    <p>
                        &copy; {new Date().getFullYear()} Studio. All rights
                        reserved. | Proposal valid for 30 days
                    </p>
                </div>
            </footer>

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
