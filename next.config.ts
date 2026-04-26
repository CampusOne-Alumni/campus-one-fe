import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  redirects: async () => [
    {
      source: '/home',
      destination: '/dashboard',
      permanent: false,
    },
    {
      source: '/registration',
      destination: '/register',
      permanent: false,
    },
  ],
}

export default nextConfig
