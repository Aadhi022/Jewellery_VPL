import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Rewrite /api/* to backend during local dev (no CORS issues)
  // On Vercel, set NEXT_PUBLIC_API_URL to your Railway backend URL
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    // Only apply rewrites in local dev (Vercel uses direct fetch with env var)
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api-proxy/:path*',
          destination: `${apiUrl}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
