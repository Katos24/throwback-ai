/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  // Force modern target
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: false, // Added this to disable Next.js scroll restoration
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