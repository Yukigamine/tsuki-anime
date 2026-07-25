import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@suki-media/providers", "@suki-media/ui"],
};

export default nextConfig;
