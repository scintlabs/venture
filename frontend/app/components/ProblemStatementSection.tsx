"use client"
import React from "react"
import { ProblemStatement } from "../lib/types"

interface ProblemStatementSectionProps {
    data: ProblemStatement
}

export default function ProblemStatementSection({ data }: ProblemStatementSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Problem &amp; Opportunity</h2>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Current State Challenges</h3>
                        <ul className="space-y-4">
                            {data.challenges.map((c, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-red-500 mr-3">⚠️</span>
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {data.quotes.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h4 className="font-semibold mb-4">Stakeholder Feedback</h4>
                            {data.quotes.map((q, i) => (
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
                            ))}
                        </div>
                    )}
                </div>

                {data.impactMetrics && (
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-center">Impact of Inaction</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {(Object.entries(data.impactMetrics) as Array<[string, string]>).map(([k, v]) => (
                                <div className="text-center" key={k}>
                                    <div className="text-3xl font-bold text-red-600 mb-2">{v}</div>
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
    )
}
