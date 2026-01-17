import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any domain
      },
      {
        protocol: 'http',
        hostname: '**', // Optional: matches non-secure domains
      },
    ],
  }
};

export default nextConfig;
