import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

