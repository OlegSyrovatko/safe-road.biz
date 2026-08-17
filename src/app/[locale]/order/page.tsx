import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OrderForm } from "@/components/order/OrderForm";
import { SelectedPlanSummary } from "@/components/order/SelectedPlanSummary";
import { pricingPlans, isPlanId } from "@/data/pricing";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "meta.order" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/order`,
      languages: { uk: "/uk/order", en: "/en/order" },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/order`,
      type: "website",
    },
  };
}

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { locale } = await params;
  const { plan: planParam } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("order");
  const tPricing = await getTranslations("pricing");

  const selectedPlan = isPlanId(planParam)
    ? pricingPlans.find((plan) => plan.id === planParam)
    : undefined;

  return (
    <div className="py-28 sm:py-36">
      <Container className="max-w-2xl">
        <Reveal className="text-center">
          <Badge tone="brand">{t("eyebrow")}</Badge>
          <h1 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-500">{t("subtitle")}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {selectedPlan ? (
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {t("selectedPlanLabel")}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink-950">
                  {tPricing(`plans.${selectedPlan.id}.name`)}
                </p>
                <SelectedPlanSummary
                  plan={selectedPlan}
                  perMonthLabel={tPricing("perMonth")}
                  devicesLabel={tPricing(`plans.${selectedPlan.id}.devices`)}
                />
              </div>
              <Button href="/#pricing" variant="secondary" size="md">
                {t("changePlan")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink-200 bg-ink-50/60 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-lg font-semibold text-ink-950">{t("noPlanTitle")}</p>
                <p className="mt-1 text-sm text-ink-500">{t("noPlanDescription")}</p>
              </div>
              <Button href="/#pricing" variant="secondary" size="md">
                {t("viewPricing")}
              </Button>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <OrderForm planId={selectedPlan?.id} />
        </Reveal>
      </Container>
    </div>
  );
}
