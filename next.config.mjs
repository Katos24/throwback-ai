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
    optimizeCss: true, // ADD THIS - optimizes CSS loading
  },
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // CHANGED - allow aggressive caching
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