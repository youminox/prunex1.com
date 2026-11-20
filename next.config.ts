import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1200, 1600],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/comprar", destination: "/comprar-prunex1/", statusCode: 301 },
      { source: "/precio", destination: "/precio-prunex1-peru/", statusCode: 301 },
      { source: "/tienda", destination: "/comprar-prunex1/", statusCode: 301 },
      { source: "/prunex", destination: "/", statusCode: 301 },
      { source: "/prunex-1", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
