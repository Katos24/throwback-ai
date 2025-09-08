/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'],
  },
  
  // Target modern browsers
  transpilePackages: [],
  
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