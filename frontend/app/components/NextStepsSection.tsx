"use client"
import React from "react"

export default function NextStepsSection() {
    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-8 text-center">
                <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Data Strategy?</h2>
                <p className="text-xl mb-8 opacity-90">Let&apos;s turn your data silos into intelligent insights</p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">1. Approve Proposal</h3>
                        <p className="text-sm opacity-80">Review and sign off on scope and budget</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">2. Kickoff Meeting</h3>
                        <p className="text-sm opacity-80">Align stakeholders and finalize requirements</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">3. Start Building</h3>
                        <p className="text-sm opacity-80">Begin development with weekly progress updates</p>
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
    )
}
