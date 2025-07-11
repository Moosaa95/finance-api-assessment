"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import type { NewsArticle } from "@/types/news"
import { formatDate } from "@/lib/utils"


interface NewsCardProps {
    article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        window.open(article.url, "_blank", "noopener,noreferrer")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick()
        }
    }

    return (
        <article
            className="w-full max-w-sm rounded-lg overflow-hidden bg-black text-white shadow-md cursor-pointer transition-transform hover:scale-105"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label={`Read article: ${article.headline}`}
        >
            {/* Top Image */}
            <Image
                src={article.image || "/placeholder.svg"}
                alt={article.headline}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=300&width=400"
                }}
            />

            {/* Article Text */}
            <div className="p-4">
                {/* Source and Date */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                    <span className="uppercase font-medium truncate">{article.source}</span>
                    <span className="whitespace-nowrap">{formatDate(article.datetime)}</span>
                </div>

                {/* Headline */}
                <h2 className="text-white text-sm font-bold leading-tight">
                    {article.headline}
                </h2>
            </div>
        </article>

    )
}
