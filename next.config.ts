// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',  // Enables static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/amaninders.github.io', // Add this if you're not using a custom domain
}

export default nextConfig