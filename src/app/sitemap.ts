import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saferoad.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/order", "/offer", "/privacy", "/terms", "/app-terms"];

  const languageAlternates = (path: string) =>
    Object.fromEntries([
      ...routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
      ["x-default", `${siteUrl}/${routing.defaultLocale}${path}`],
    ]);

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: languageAlternates(path),
      },
    })),
  );
}
