/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  async headers() {
    return [
      {
        // Disable caching for Next.js CSS files so you won't see stale styles
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
