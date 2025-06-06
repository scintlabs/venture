"use client"
import React from "react"
import { Budget } from "../lib/types"

interface BudgetSectionProps {
    data: Budget
}

export default function BudgetSection({ data }: BudgetSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">Budget &amp; Pricing</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Investment Breakdown</h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="space-y-4">
                                {data.breakdown.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b">
                                        <span>{item.category}</span>
                                        <span className="font-semibold">${item.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center py-3 text-xl font-bold bg-gray-50 px-4 rounded">
                                    <span>Total Investment</span>
                                    <span>${data.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-6">Payment Schedule</h3>
                        <div className="space-y-4">
                            {data.paymentSchedule.map((p, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{p.milestone}</span>
                                        <span className="text-lg font-bold">${p.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">{p.percentage}% - {p.timing}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
