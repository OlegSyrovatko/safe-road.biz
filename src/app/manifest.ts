import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safe Road — Navigation & Fleet Analytics",
    short_name: "Safe Road",
    description: "Navigation, road quality rating, and trip analytics for drivers and business.",
    start_url: "/uk",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#2f62f5",
    icons: [
      {
        src: "/images/brand/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/brand/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
