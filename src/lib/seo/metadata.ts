import type { Metadata } from "next";

const OG_IMAGE = { url: "/images/business/og-cover.png", width: 1200, height: 630 } as const;

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogAlt,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  ogAlt?: string;
}): Metadata {
  const localizedPath = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        uk: `/uk${path}`,
        en: `/en${path}`,
        "x-default": `/uk${path}`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: localizedPath,
      siteName: "Safe Road",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images: [{ ...OG_IMAGE, alt: ogAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
