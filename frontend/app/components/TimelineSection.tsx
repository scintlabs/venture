"use client"
import React from "react"
import { Timeline } from "../lib/types"

interface TimelineSectionProps {
    data: Timeline
}

export default function TimelineSection({ data }: TimelineSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Timeline &amp; Milestones</h2>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

                    <div className="space-y-12">
                        {data.phases.map((phase, i) => (
                            <div key={i} className="flex items-center">
                                {i % 2 === 0 ? (
                                    <>
                                        <div className="w-1/2 pr-8 text-right">
                                            <h3 className="text-xl font-semibold">{phase.name}</h3>
                                            <p className="text-gray-600">{phase.description}</p>
                                            <div className="text-sm text-gray-500">{phase.duration}</div>
                                        </div>
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center relative z-10">
                                            <span className="text-white text-sm">{i + 1}</span>
                                        </div>
                                        <div className="w-1/2 pl-8"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-1/2 pr-8"></div>
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center relative z-10">
                                            <span className="text-white text-sm">{i + 1}</span>
                                        </div>
                                        <div className="w-1/2 pl-8">
                                            <h3 className="text-xl font-semibold">{phase.name}</h3>
                                            <p className="text-gray-600">{phase.description}</p>
                                            <div className="text-sm text-gray-500">{phase.duration}</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
