import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader } from "./header"

export function LoadingState() {
    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <PageHeader />

                {/* Loading message */}
                <div className="text-center mb-8">
                    <p className="text-gray-400">Loading latest financial news...</p>
                </div>

                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {Array.from({ length: 16 }).map((_, index) => (
                        <NewsCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function NewsCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/3] w-full">
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
