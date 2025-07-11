import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Finance Digest - Latest Financial News",
  description: "Stay updated with the latest financial news and market updates from trusted sources.",
  keywords: "finance, news, market, stocks, economy, business",
  authors: [{ name: "Finance Digest Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollIndicator />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
