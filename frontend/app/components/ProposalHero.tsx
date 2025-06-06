"use client"
import React from "react"

interface ProposalHeroProps {
    projectName: string
    description: string
    timeline: string
    createdAt: string
}

export default function ProposalHero({
    projectName,
    description,
    timeline,
    createdAt,
}: ProposalHeroProps) {
    return (
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white min-h-screen flex items-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-sm opacity-80">
                <div>{new Date(createdAt).toLocaleDateString()}</div>
                <div>Version 1.0</div>
            </div>

            <div className="container mx-auto px-8 z-10">
                <h1 className="text-6xl font-bold mb-4 leading-tight">{projectName}</h1>
                <p className="text-2xl mb-8 opacity-90">{description}</p>
                <div className="text-xl font-light">{timeline} delivery timeline</div>
            </div>
        </section>
    )
}
