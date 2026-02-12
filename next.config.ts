import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://orgass.myshopify.com/cdn/shop/files/logo-1.png?v=1641276560",
      ),
      {
        protocol: "https",
        hostname: "i.ibb.co.com", // Error solve korar jonno hostname-ta eivabe dite hoy
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Error solve korar jonno hostname-ta eivabe dite hoy
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Error solve korar jonno hostname-ta eivabe dite hoy
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
