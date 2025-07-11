"use client"

import { useState, useMemo } from "react"

interface UsePaginationReturn<T> {
    currentPage: number
    totalPages: number
    currentItems: T[]
    goToPage: (page: number) => void
    goToPrevious: () => void
    goToNext: () => void
    getPageNumbers: () => (number | string)[]
    startIndex: number
    endIndex: number
}

export function usePagination<T>(items: T[], itemsPerPage: number): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(items.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const currentItems = useMemo(() => {
        return items.slice(startIndex, endIndex)
    }, [items, startIndex, endIndex])

    const goToPage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const goToPrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1)
        }
    }

    const goToNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1)
        }
    }

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push("...")
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push("...")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("...")
                pages.push(totalPages)
            }
        }

        return pages
    }

    return {
        currentPage,
        totalPages,
        currentItems,
        goToPage,
        goToPrevious,
        goToNext,
        getPageNumbers,
        startIndex,
        endIndex,
    }
}
