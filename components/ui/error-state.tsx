"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "./header"


interface ErrorStateProps {
    error: string
    onRetry: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <PageHeader />

                <div>
                    <span className="text-2xl mt-[66px] block">
                        Something went wrong. Please try again later.
                    </span>
                </div>

                <div className="text-center mt-6">
                    <Button
                        onClick={onRetry}
                        variant="outline"
                        className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    )
}
