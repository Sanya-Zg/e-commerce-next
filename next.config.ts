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
    // @ts-expect-error — тимчасово, поки Next не оновить типи
    turbo: false,
  },
};

export default nextConfig;
