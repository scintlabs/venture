"use client"
import React from "react"

export default function ProposalFooter() {
    return (
        <footer className="py-8 bg-gray-900 text-white text-center">
            <div className="container mx-auto px-8">
                <p>&copy; {new Date().getFullYear()} Studio. All rights reserved. | Proposal valid for 30 days</p>
            </div>
        </footer>
    )
}
