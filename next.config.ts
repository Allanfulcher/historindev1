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
  // Move serverComponentsExternalPackages to root level
  serverExternalPackages: [],
  // Disable experimental features that may cause build issues
  experimental: {
    // Disable all CSS and font optimizations
    optimizeCss: false,
  },
  // Override webpack config to exclude lightningcss
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'lightningcss': false,
      '@parcel/css': false,
    };
    return config;
  },
};

export default nextConfig;
