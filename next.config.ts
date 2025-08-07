import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow SVG images
    dangerouslyAllowSVG: true,
    // Disable content security policy for SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optional: Configure image optimization
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
