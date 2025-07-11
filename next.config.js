/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.cnbcfm.com",
      },
      {
        protocol: "https",
        hostname: "static.seekingalpha.com",
      },
      {
        protocol: "https",
        hostname: "g.foolcdn.com",
      },
      {
        protocol: "https",
        hostname: "media.zenfs.com",
      },
      {
        protocol: "https",
        hostname: "images.mktw.net",
      },
      {
        protocol: "https",
        hostname: "cdn.benzinga.com",
      },
      {
        protocol: "https",
        hostname: "static.reuters.com",
      },
      {
        protocol: "https",
        hostname: "www.reuters.com",
      },
      {
        protocol: "https",
        hostname: "images.wsj.net",
      },
      {
        protocol: "https",
        hostname: "images.barrons.com",
      },
      {
        protocol: "https",
        hostname: "images.marketwatch.com",
      },
      {
        protocol: "https",
        hostname: "cdn.vox-cdn.com",
      },
      {
        protocol: "https",
        hostname: "techcrunch.com",
      },
      {
        protocol: "https",
        hostname: "fortune.com",
      },
      {
        protocol: "https",
        hostname: "assets.bwbx.io",
      },
      {
        protocol: "https",
        hostname: "www.ft.com",
      },
      {
        protocol: "https",
        hostname: "static.politico.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cnn.com",
      },
      {
        protocol: "https",
        hostname: "media.cnn.com",
      },
      {
        protocol: "https",
        hostname: "static01.nyt.com",
      },
      {
        protocol: "https",
        hostname: "www.washingtonpost.com",
      },
      {
        protocol: "https",
        hostname: "images.axios.com",
      },
      {
        protocol: "https",
        hostname: "cdn.substack.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
      // Fallback for any other financial news domains
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
    // Add image optimization settings
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

module.exports = nextConfig
