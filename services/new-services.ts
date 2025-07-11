import type { NewsArticle, ApiNewsArticle } from "@/types/news"
import { newsConfig } from "@/config/news-config"

class NewsService {
    private readonly apiUrl: string
    private readonly apiKey: string

    constructor() {
        this.apiUrl = newsConfig.apiUrl
        this.apiKey = newsConfig.apiKey
    }

    async fetchNews(): Promise<NewsArticle[]> {
        const url = `${this.apiUrl}?category=general&token=${this.apiKey}`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from API")
        }

        return this.transformApiData(data)
    }

    private transformApiData(apiData: ApiNewsArticle[]): NewsArticle[] {
        return apiData
            .filter((article) => article.image && article.headline && article.source)
            .map((article, index) => ({
                id: article.datetime || Date.now() + index,
                headline: article.headline,
                image: article.image,
                source: article.source,
                datetime: article.datetime,
                summary: article.summary || "",
                url: article.url,
                category: article.category || "general",
            }))
    }
}

export const newsService = new NewsService()
