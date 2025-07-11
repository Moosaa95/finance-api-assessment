"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseInfiniteScrollOptions {
    threshold?: number
    rootMargin?: string
    enabled?: boolean
}

interface UseInfiniteScrollReturn {
    isFetching: boolean
    setIsFetching: (fetching: boolean) => void
    sentinelRef: (node: HTMLDivElement | null) => void
}

export function useInfiniteScroll(
    callback: () => void,
    options: UseInfiniteScrollOptions = {},
): UseInfiniteScrollReturn {
    const { threshold = 0.1, rootMargin = "200px", enabled = true } = options
    const [isFetching, setIsFetching] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const sentinelRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!enabled) return

            // Disconnect previous observer
            if (observerRef.current) {
                observerRef.current.disconnect()
            }

            // Create new observer
            if (node) {
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        const [entry] = entries
                        if (entry.isIntersecting && !isFetching) {
                            console.log("Intersection detected, triggering callback")
                            setIsFetching(true)
                            callback()
                        }
                    },
                    {
                        threshold,
                        rootMargin,
                    },
                )

                observerRef.current.observe(node)
                console.log("Observer attached to sentinel")
            }
        },
        [callback, isFetching, threshold, rootMargin, enabled],
    )

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    return { isFetching, setIsFetching, sentinelRef }
}
