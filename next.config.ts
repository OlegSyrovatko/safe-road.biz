import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    // No image on the site is ever rendered wider than an 800px CSS
    // container (see `sizes` props) — the Next.js defaults go up to 3840px,
    // which on this memory-constrained VPS means sharp burns time (and can
    // stall under swap pressure) re-encoding huge variants nothing requests.
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1600],
  },
};

export default withNextIntl(nextConfig);
