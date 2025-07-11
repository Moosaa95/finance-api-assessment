"use client"
import { NewsList } from "@/components/News/NewsList"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { PageHeader } from "@/components/ui/header"
import { InfiniteScrollTrigger } from "@/components/ui/infinite-scroll-trigger"
import { PageInfo } from "@/components/ui/info"
import { LoadingState } from "@/components/ui/loading-state"
import { Pagination } from "@/components/ui/pagination"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { useNews } from "@/hooks/use-news"
import { useNewsInfinite } from "@/hooks/use-news-infinite-scroll"
import { usePagination } from "@/hooks/use-pagination"

interface NewsArticle {
  id: number
  category: string
  datetime: number
  headline: string
  image: string
  related: string
  source: string
  summary: string
  url: string
}

interface ApiResponse {
  data?: NewsArticle[]
  error?: string
}

const ARTICLES_PER_PAGE = 16

export default function FinanceDigest() {
  const { articles, loading, error, hasMore, loadMore, refetch, isLoadingMore } = useNewsInfinite()

  const { isFetching, setIsFetching, sentinelRef } = useInfiniteScroll(
    async () => {
      console.log("Infinite scroll triggered")
      if (hasMore && !isLoadingMore) {
        await loadMore()
      }
    },
    {
      threshold: 0.1,
      rootMargin: "100px",
      enabled: hasMore && !isLoadingMore,
    },
  )

  // Reset fetching state when loading more completes
  if (isFetching && !isLoadingMore) {
    setIsFetching(false)
  }

  // Initial loading state
  if (loading) {
    return <LoadingState />
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  // No articles state
  if (articles.length === 0) {
    return <EmptyState />
  }
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        {/* Article count info */}
        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">
            Showing {articles.length} articles
            {hasMore && <span className="text-gray-500"> • Scroll for more</span>}
          </p>
        </div>

        <NewsList articles={articles} />

        {/* Infinite scroll trigger and loading state */}
        <InfiniteScrollTrigger
          hasMore={hasMore}
          isLoading={isLoadingMore}
          onLoadMore={loadMore}
          sentinelRef={sentinelRef}
        />

        {/* End of content message */}
        {!hasMore && articles.length > 16 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">You've reached the end of the news feed</p>
            <button onClick={refetch} className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline">
              Refresh for latest news
            </button>
          </div>
        )}
      </div>
    </div>
  )
  // const { articles, loading, error, refetch } = useNews()
  // const {
  //   currentPage,
  //   totalPages,
  //   currentItems: currentArticles,
  //   goToPage,
  //   goToPrevious,
  //   goToNext,
  //   getPageNumbers,
  //   startIndex,
  //   endIndex,
  // } = usePagination(articles, ARTICLES_PER_PAGE)

  // if (loading) {
  //   return <LoadingState />
  // }

  // if (error) {
  //   return <ErrorState error={error} onRetry={refetch} />
  // }

  // if (articles.length === 0) {
  //   return <EmptyState />
  // }

  // return (
  //   <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
  //     <div className="max-w-7xl mx-auto">
  //       <PageHeader />

  //       {/* Article count info */}
  //       <div className="mb-6 text-center">
  //         <p className="text-gray-400 text-sm">
  //           Showing {articles.length} articles
  //           {hasMore && <span className="text-gray-500"> • Scroll for more</span>}
  //         </p>
  //       </div>

  //       <NewsList articles={articles} />

  //       {/* Infinite scroll trigger and loading state */}
  //       <InfiniteScrollTrigger hasMore={hasMore} isLoading={isLoadingMore} onLoadMore={loadMore} />

  //       {/* End of content message */}
  //       {!hasMore && articles.length > 16 && (
  //         <div className="text-center py-8">
  //           <p className="text-gray-500 text-sm">You've reached the end of the news feed</p>
  //           <button onClick={refetch} className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline">
  //             Refresh for latest news
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}
