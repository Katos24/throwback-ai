/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization - ENHANCED
  images: {
    domains: [
      'replicate.delivery',
      'files.smartsites.parentsquare.com'
    ],
    // NEW: Modern image formats
    formats: ['image/webp', 'image/avif'],
    // NEW: Optimized device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // NEW: Minimize layout shift
    minimumCacheTTL: 60,
    // NEW: Lazy load by default
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compiler optimizations - ENHANCED
  compiler: {
    reactRemoveProperties: true,
    // NEW: Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features - ENHANCED
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: false,
    optimizeCss: true,
    // NEW: Optimize fonts
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
  
  // NEW: Enable compression
  compress: true,
  
  // NEW: Production optimizations
  productionBrowserSourceMaps: false,
  
  // NEW: Optimize JavaScript output
  swcMinify: true,
  
  // Headers - ENHANCED with more caching
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
      // NEW: Cache images
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // NEW: Cache fonts
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // NEW: Security headers
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
  
  // NEW: Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
          lib: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'lib',
            chunks: 'all',
            priority: 30,
          },
        },
      };
      
      config.optimization.minimize = true;
    }
    
    return config;
  },
};

export default nextConfig;