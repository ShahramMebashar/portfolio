import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.resume.krd",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
