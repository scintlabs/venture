"use client"

import { useState, ChangeEvent, FormEvent } from "react"

export default function InputForm() {
    const [formData, setFormData] = useState<FormData>({
        projectName: "",
        clientName: "",
        industry: "",
        timeline: "",
        budget: "",
        objectives: "",
        description: "",
        stakeholders: "",
        requirements: "",
    })

    const [files, setFiles] = useState<File[]>([])
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsGenerating(true)
        setError("")

        try {
            const fileData = new FormData()
            files.forEach((file) => fileData.append("files", file))

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: fileData,
            })

            if (!uploadResponse.ok) {
                throw new Error("File upload failed")
            }

            const { fileIds } = await uploadResponse.json()

            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, fileIds }),
            })

            if (!response.ok) {
                throw new Error("Proposal generation failed")
            }

            const { proposalId } = await response.json()
            window.location.href = `/proposal/${proposalId}`
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            setIsGenerating(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Create New Proposal</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <input
                        name="projectName"
                        placeholder="Project Name"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    <input
                        name="clientName"
                        placeholder="Client Name"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <input
                        name="industry"
                        placeholder="Industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        name="timeline"
                        placeholder="Timeline (e.g., 90 days)"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        name="budget"
                        placeholder="Budget Range"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <textarea
                    name="objectives"
                    placeholder="Project Objectives"
                    value={formData.objectives}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <textarea
                    name="description"
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* File Upload */}
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-4xl mb-4">📁</div>
                        <div className="text-lg mb-2">Upload Documents</div>
                        <div className="text-gray-500">RFPs, notes, research, requirements</div>
                    </label>
                    {files.length > 0 && (
                        <div className="mt-4 space-y-1">
                            {files.map((file, i) => (
                                <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? "Generating Proposal..." : "Generate Proposal"}
                </button>
            </form>
        </div>
    )
}
