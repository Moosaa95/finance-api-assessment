interface PageInfoProps {
    startIndex: number
    endIndex: number
    totalItems: number
}

export function PageInfo({ startIndex, endIndex, totalItems }: PageInfoProps) {
    return (
        <div className="mb-6 text-center">
            <p className="text-gray-400 text-sm">
                Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} articles
            </p>
        </div>
    )
}
