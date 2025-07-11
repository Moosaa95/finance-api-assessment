"use client"

import { useState, useEffect, useCallback } from "react"
import type { NewsArticle } from "@/types/news"
import { newsService } from "@/services/new-services"

interface UseNewsReturn {
    articles: NewsArticle[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useNews(): UseNewsReturn {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await newsService.fetchNews()
            setArticles(data)
        } catch (err) {
            console.error("Error fetching news:", err)
            setError(err instanceof Error ? err.message : "Failed to fetch news")
        } finally {
            setLoading(false)
        }
    }, [])

    const refetch = useCallback(() => {
        fetchNews()
    }, [fetchNews])

    useEffect(() => {
        fetchNews()
    }, [fetchNews])

    return {
        articles,
        loading,
        error,
        refetch,
    }
}
