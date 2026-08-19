import { HeroSection } from "@/components/hero/HeroSection";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { NavigationSection } from "@/components/sections/NavigationSection";
import { RoadQualitySection } from "@/components/sections/RoadQualitySection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { LocationAlertsSection } from "@/components/sections/LocationAlertsSection";
import { BusinessBenefits } from "@/components/sections/BusinessBenefits";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { paidPlans } from "@/data/pricing";
import { amountUsdForCycle } from "@/lib/pricing/billingCycle";

const PLAN_DISPLAY_NAME: Record<"basic" | "plus" | "pro", string> = {
  basic: "Basic",
  plus: "Plus",
  pro: "Pro",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saferoad.example";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Safe Road",
      legalName: "ФОП Сироватко Олег Олександрович",
      taxID: "3046902290",
      url: siteUrl,
      logo: `${siteUrl}/images/brand/logo-512.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Носівка",
        addressRegion: "Чернігівська область",
        addressCountry: "UA",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Safe Road",
      url: siteUrl,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Safe Road",
      applicationCategory: "NavigationApplication",
      operatingSystem: "iOS, Android",
      url: siteUrl,
      // Both cadences are always listed (never just "Monthly") — this is
      // static metadata for crawlers, not tied to a visitor's live
      // billing-cycle toggle, so it must describe the whole catalog
      // up front rather than only whatever cadence happened to be
      // selected at render time.
      offers: paidPlans.flatMap((plan) => {
        const displayName = PLAN_DISPLAY_NAME[plan.id as "basic" | "plus" | "pro"];
        return [
          {
            "@type": "Offer",
            name: `Safe Road ${displayName} Monthly`,
            price: plan.priceUsd.toFixed(2),
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: `Safe Road ${displayName} Yearly`,
            price: amountUsdForCycle(plan.priceUsd, "annual").toFixed(2),
            priceCurrency: "USD",
          },
        ];
      }),
    },
  ];

  return (
    <>
      {structuredData.map((entry) => (
        <JsonLd key={entry["@type"] as string} data={entry} />
      ))}
      <HeroSection />
      <ValueProposition />
      <ProblemSection />
      <SolutionSection />
      <NavigationSection />
      <RoadQualitySection />
      <AnalyticsSection />
      <LocationAlertsSection />
      <BusinessBenefits />
      <UseCases />
      <HowItWorks />
      <PricingSection />
      <FinalCTA />
    </>
  );
}
