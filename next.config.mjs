/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ['replicate.delivery'],
  },
  
  // Enable modern JavaScript output
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: false,
    // This is the correct way in Next.js 15+
    browsersListForSwc: true,
  },
  
  // Configure compiler for modern browsers
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable emotion if you use it (optional)
    // emotion: true,
  },
  
  async headers() {
    return [
      {
        source: '/_next/static/css/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ]
      }
    ]
  }
};

export default nextConfig;