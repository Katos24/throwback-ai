/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  // Compiler optimizations to reduce bundle size
  compiler: {
    reactRemoveProperties: true,
  },
  // Force modern target
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: false,
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