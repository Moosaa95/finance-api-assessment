export interface NewsArticle {
    id: number
    headline: string
    image: string
    source: string
    datetime: number
    summary: string
    url: string
    category: string
}

export interface ApiNewsArticle {
    category: string
    datetime: number
    headline: string
    image: string
    related: string
    source: string
    summary: string
    url: string
}
