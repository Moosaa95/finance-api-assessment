import type { NewsArticle } from "@/types/news"
import { NewsCard } from "./NewsCard"


interface NewsGridProps {
  articles: NewsArticle[]
}

export function NewsList({ articles }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
