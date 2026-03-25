/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  experimental: {
    // Enable server actions (if needed)
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
