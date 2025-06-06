import React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
    markdown: string
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
    return (
        <div className="prose mx-auto p-8">
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
    )
}
