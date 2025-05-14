import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["queue-times.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;
