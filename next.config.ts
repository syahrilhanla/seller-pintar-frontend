import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["yjs"], // to suppress warning about yjs not being a server component (issued in TipTap docs)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.sellerpintar.com",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
