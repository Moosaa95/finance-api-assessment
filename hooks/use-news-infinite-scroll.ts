"use client"

import { useState, useEffect, useCallback } from "react"
import type { NewsArticle } from "@/types/news"
import { newsService } from "@/services/new-services"


interface UseNewsInfiniteReturn {
    articles: NewsArticle[]
    loading: boolean
    error: string | null
    hasMore: boolean
    loadMore: () => Promise<void>
    refetch: () => void
    isLoadingMore: boolean
}

const ARTICLES_PER_PAGE = 16

export function useNewsInfinite(): UseNewsInfiniteReturn {
    const [allArticles, setAllArticles] = useState<NewsArticle[]>([])
    const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchInitialNews = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            console.log("Fetching initial news...")
            const data = await newsService.fetchNews()
            console.log(`Fetched ${data.length} articles`)
            setAllArticles(data)
            setDisplayedArticles(data.slice(0, ARTICLES_PER_PAGE))
            setCurrentPage(1)
        } catch (err) {
            console.error("Error fetching news:", err)
            setError(err instanceof Error ? err.message : "Failed to fetch news")
        } finally {
            setLoading(false)
        }
    }, [])

    const loadMore = useCallback(async () => {
        if (isLoadingMore || displayedArticles.length >= allArticles.length) {
            console.log("Load more skipped:", {
                isLoadingMore,
                displayedLength: displayedArticles.length,
                totalLength: allArticles.length,
            })
            return
        }

        console.log("Loading more articles...")
        setIsLoadingMore(true)

        // Simulate network delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const nextPage = currentPage + 1
        const endIndex = nextPage * ARTICLES_PER_PAGE
        const newArticles = allArticles.slice(0, endIndex)

        console.log(`Loading page ${nextPage}, showing ${newArticles.length} articles`)
        setDisplayedArticles(newArticles)
        setCurrentPage(nextPage)
        setIsLoadingMore(false)
    }, [allArticles, currentPage, isLoadingMore, displayedArticles.length])

    const hasMore = displayedArticles.length < allArticles.length

    const refetch = useCallback(() => {
        setCurrentPage(1)
        setDisplayedArticles([])
        fetchInitialNews()
    }, [fetchInitialNews])

    useEffect(() => {
        fetchInitialNews()
    }, [fetchInitialNews])

    return {
        articles: displayedArticles,
        loading,
        error,
        hasMore,
        loadMore,
        refetch,
        isLoadingMore,
    }
}
