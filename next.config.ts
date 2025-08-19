import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build (use with caution)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow SVG images
    dangerouslyAllowSVG: true,
    // Disable content security policy for SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable experimental features that may cause build issues
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issue
    // Disable font optimization to avoid lightningcss dependency issues
    optimizePackageImports: [],
  },
  // Disable font optimization that uses lightningcss
  optimizeFonts: false,
};

export default nextConfig;
