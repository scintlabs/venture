"use client"
import React from "react"
import { SolutionOverview } from "../lib/types"

interface SolutionOverviewSectionProps {
    data: SolutionOverview
}

export default function SolutionOverviewSection({ data }: SolutionOverviewSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Solution Overview</h2>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {data.pillars.map((pillar, i) => (
                        <div key={i} className="bg-blue-50 p-8 rounded-lg text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">{pillar.icon}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">{pillar.name}</h3>
                            <p className="text-gray-700">{pillar.description}</p>
                        </div>
                    ))}
                </div>

                {data.architecture && (
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold mb-6 text-center">System Architecture</h3>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            {data.architecture.map((item, i) => (
                                <div key={i} className="bg-blue-100 p-4 rounded-lg text-center">
                                    <div className="font-semibold">{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
