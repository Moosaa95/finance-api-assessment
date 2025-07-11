export const newsConfig = {
    apiUrl: "https://finnhub.io/api/v1/news",
    apiKey: process.env.NEXT_PUBLIC_FINNHUB_API_KEY!,
    articlesPerPage: 16,
} as const
