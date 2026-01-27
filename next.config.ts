import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://orgass.myshopify.com/cdn/shop/files/logo-1.png?v=1641276560",
      ),
    ],
  },
};

export default nextConfig;
