"use client"
import React from "react"
import { Team } from "../lib/types"

interface TeamSectionProps {
    data: Team
}

export default function TeamSection({ data }: TeamSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Team &amp; Roles</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.members.map((member, i) => (
                        <div key={i} className="text-center">
                            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white text-2xl">{member.initials}</span>
                            </div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                            <p className="text-sm text-gray-500 mt-2">{member.expertise}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
