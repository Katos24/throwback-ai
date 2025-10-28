/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'replicate.delivery',
      'files.smartsites.parentsquare.com'
    ],
  },
  // Compiler optimizations
  compiler: {
    reactRemoveProperties: true,
  },
  // Experimental features
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: false,
    optimizeCss: true, // Now it will work!
  },
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/js/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  }
};

export default nextConfig;