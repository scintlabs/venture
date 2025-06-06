"use client"
import React from "react"
import { ExecutiveSummary } from "../lib/types"

interface ExecutiveSummarySectionProps {
    data: ExecutiveSummary
}

export default function ExecutiveSummarySection({ data }: ExecutiveSummarySectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Executive Summary</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                            <p className="text-lg text-gray-700">{data.problem}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">The Opportunity</h3>
                            <p className="text-lg text-gray-700">{data.opportunity}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Our Solution</h3>
                            <p className="text-lg text-gray-700">{data.solution}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                            <div className="text-3xl font-bold text-green-700">{data.metrics.payback}</div>
                            <div className="text-green-600">Payback Period</div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                            <div className="text-3xl font-bold text-blue-700">{data.metrics.savings}</div>
                            <div className="text-blue-600">Projected Annual Savings</div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                            <div className="text-3xl font-bold text-purple-700">{data.metrics.timeline}</div>
                            <div className="text-purple-600">To Full Deployment</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
