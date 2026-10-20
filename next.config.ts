import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization stays on. Do not set images.unoptimized or output: "export",
  // or the portrait is served as the original file instead of a sized AVIF/WebP.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [256, 384, 480, 640, 828],
    qualities: [75, 82],
  },
};

export default nextConfig;
