import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["cobe"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
