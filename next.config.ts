import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  },
  experimental: {
    globalNotFound: true,
    serverActions: {
    bodySizeLimit: '4mb',
    allowedOrigins: ['*'],
  },
    
  },
};

export default nextConfig;
