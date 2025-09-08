/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  
  // Force modern target
  experimental: {
    forceSwcTransforms: true,
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