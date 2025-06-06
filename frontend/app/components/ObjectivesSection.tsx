"use client"
import React from "react"
import { Objectives } from "../lib/types"

interface ObjectivesSectionProps {
    data: Objectives
}

export default function ObjectivesSection({ data }: ObjectivesSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Objectives &amp; Success Metrics</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">SMART Objectives</h3>
                        <div className="space-y-4">
                            {data.objectives.map((obj, i) => (
                                <div key={i} className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">✓</span>
                                    <div>{obj}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Success KPIs</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-3 text-left">Metric</th>
                                        <th className="border border-gray-300 p-3 text-center">Target</th>
                                        <th className="border border-gray-300 p-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.kpis.map((kpi, i) => (
                                        <tr key={i}>
                                            <td className="border border-gray-300 p-3">{kpi.metric}</td>
                                            <td className="border border-gray-300 p-3 text-center">{kpi.target}</td>
                                            <td className="border border-gray-300 p-3 text-center">
                                                {kpi.status === "green" ? "🟢" : kpi.status === "yellow" ? "🟡" : "🔴"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
