import { PolicyPage } from "@/components/legal/PolicyPage";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.offer" });

  return buildPageMetadata({
    locale,
    path: "/offer",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const p = await getTranslations("legal.offer");

  return (
    <PolicyPage
      eyebrow={p("eyebrow")}
      title={p("title")}
      updated={p("updated")}
      intro={p("intro")}
      sections={p.raw("sections")}
      backLabel={t("backToHome")}
    />
  );
}
