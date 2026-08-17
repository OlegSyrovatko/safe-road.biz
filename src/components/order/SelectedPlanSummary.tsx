"use client";

import { useCurrency } from "@/lib/currency/CurrencyProvider";
import { convertUsdToUah, formatCurrency } from "@/lib/currency/format";
import type { PricingPlan } from "@/data/pricing";
import { useLocale } from "next-intl";

export function SelectedPlanSummary({
  plan,
  devicesLabel,
  perMonthLabel,
}: {
  plan: PricingPlan;
  devicesLabel: string;
  perMonthLabel: string;
}) {
  const locale = useLocale();
  const { displayCurrency, rate } = useCurrency();
  const amount =
    displayCurrency === "UAH" && rate ? convertUsdToUah(plan.priceUsd, rate.rate) : plan.priceUsd;
  const priceLabel = formatCurrency(amount, displayCurrency, locale);

  return (
    <p className="mt-0.5 text-sm text-ink-500">
      {priceLabel} {perMonthLabel} · {devicesLabel}
    </p>
  );
}
