import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/showcase",
        destination: "/dashboard/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
