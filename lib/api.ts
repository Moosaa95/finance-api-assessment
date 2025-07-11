import { NewsArticle } from "@/types/news";

export const getNewsArticles = async (): Promise<NewsArticle[]> => {
    try {
        const res = await fetch(
            `https://finnhub.io/api/v1/news?category=general&token=${process.env.FINNHUB_API_KEY}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("News fetch failed");
        }

        return await res.json();
    } catch (error: any) {
        throw new Error("API Error: " + error.message);
    }
};
