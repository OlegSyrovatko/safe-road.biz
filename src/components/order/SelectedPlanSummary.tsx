"use client";

import { useCurrency } from "@/lib/currency/CurrencyProvider";
import { convertUsdToUah, formatCurrency } from "@/lib/currency/format";
import { useBillingCycle } from "@/lib/pricing/BillingCycleProvider";
import { amountUsdForCycle } from "@/lib/pricing/billingCycle";
import type { PricingPlan } from "@/data/pricing";
import { useLocale } from "next-intl";

export function SelectedPlanSummary({
  plan,
  devicesLabel,
  perMonthLabel,
  perYearLabel,
}: {
  plan: PricingPlan;
  devicesLabel: string;
  perMonthLabel: string;
  perYearLabel: string;
}) {
  const locale = useLocale();
  const { displayCurrency, rate } = useCurrency();
  const { billingCycle } = useBillingCycle();
  const amountUsd = amountUsdForCycle(plan.priceUsd, billingCycle);
  const amount = displayCurrency === "UAH" && rate ? convertUsdToUah(amountUsd, rate.rate) : amountUsd;
  const priceLabel = formatCurrency(amount, displayCurrency, locale);

  return (
    <p className="mt-0.5 text-sm text-ink-500">
      {priceLabel} {billingCycle === "annual" ? perYearLabel : perMonthLabel} · {devicesLabel}
    </p>
  );
}
