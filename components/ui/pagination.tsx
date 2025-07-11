"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
  getPageNumbers: () => (number | string)[]
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  getPageNumbers,
}: PaginationProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-8">
        {/* Previous Button */}
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <Button
                  onClick={() => onPageChange(page as number)}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className={`min-w-[40px] ${currentPage === page
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Page Summary */}
      <div className="text-center text-gray-500 text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </>
  )
}
