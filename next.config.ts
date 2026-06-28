import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sluzby/kozmetika",
        destination: "/sluzby/beauty-therapy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
