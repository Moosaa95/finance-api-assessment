"use client"

import { Loader2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface InfiniteScrollTriggerProps {
    hasMore: boolean
    isLoading: boolean
    onLoadMore: () => void
    sentinelRef: (node: HTMLDivElement | null) => void
}

export function InfiniteScrollTrigger({ hasMore, isLoading, onLoadMore, sentinelRef }: InfiniteScrollTriggerProps) {
    if (!hasMore) {
        return null
    }

    return (
        <div className="py-8">
            {/* Scroll sentinel - this is the trigger point for infinite scroll */}
            <div
                ref={sentinelRef}
                className="h-20 flex items-center justify-center"
                style={{ minHeight: "80px" }} // Ensure it has enough height to be detected
            >
                {isLoading ? (
                    <LoadMoreSkeleton />
                ) : (
                    <div className="text-center">
                        <div className="text-gray-500 text-sm mb-4">Scroll down to load more articles</div>
                        <Button
                            onClick={onLoadMore}
                            variant="outline"
                            size="sm"
                            className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                        >
                            <ChevronDown className="w-4 h-4 mr-2" />
                            Or click to load more
                        </Button>
                    </div>
                )}
            </div>

            {/* Additional skeleton cards when loading */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <LoadMoreCardSkeleton key={index} delay={index * 100} />
                    ))}
                </div>
            )}
        </div>
    )
}

function LoadMoreSkeleton() {
    return (
        <div className="flex items-center justify-center gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading more articles...</span>
        </div>
    )
}

interface LoadMoreCardSkeletonProps {
    delay?: number
}

function LoadMoreCardSkeleton({ delay = 0 }: LoadMoreCardSkeletonProps) {
    return (
        <div
            className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/3] w-full opacity-0 animate-fade-in"
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: "forwards",
            }}
        >
            {/* Image skeleton */}
            <Skeleton className="absolute inset-0 bg-gray-800" />

            {/* Content skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <Skeleton className="h-3 w-20 bg-gray-700" />
                    <Skeleton className="h-3 w-16 bg-gray-700" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                </div>
            </div>
        </div>
    )
}
