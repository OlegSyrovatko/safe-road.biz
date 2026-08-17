"use client";

import { Button } from "@/components/ui/Button";
import { useCurrency } from "@/lib/currency/CurrencyProvider";
import { convertUsdToUah, formatCurrency } from "@/lib/currency/format";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/data/pricing";
import { useLocale } from "next-intl";

interface PricingCardProps {
  plan: PricingPlan;
  name: string;
  tagline: string;
  devices: string;
  description: string;
  features: string[];
  perMonthLabel: string;
  ctaLabel: string;
  recommendedLabel: string;
}

export function PricingCard({
  plan,
  name,
  tagline,
  devices,
  description,
  features,
  perMonthLabel,
  ctaLabel,
  recommendedLabel,
}: PricingCardProps) {
  const locale = useLocale();
  const { displayCurrency, rate } = useCurrency();
  const amount =
    displayCurrency === "UAH" && rate ? convertUsdToUah(plan.priceUsd, rate.rate) : plan.priceUsd;
  const priceLabel = formatCurrency(amount, displayCurrency, locale);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 sm:p-8",
        plan.recommended
          ? "border-brand-400 bg-ink-950 text-white shadow-2xl shadow-brand-500/25 lg:-translate-y-3"
          : "border-ink-200 bg-white",
      )}
    >
      {plan.recommended ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-500/30">
          {recommendedLabel}
        </span>
      ) : null}

      <p
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          plan.recommended ? "text-brand-300" : "text-brand-600",
        )}
      >
        {tagline}
      </p>
      <h3 className={cn("mt-2 font-display text-xl font-semibold", plan.recommended ? "text-white" : "text-ink-950")}>
        {name}
      </h3>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className={cn("font-display text-4xl font-bold", plan.recommended ? "text-white" : "text-ink-950")}>
          {priceLabel}
        </span>
        <span className={cn("text-sm", plan.recommended ? "text-ink-300" : "text-ink-400")}>
          {perMonthLabel}
        </span>
      </div>
      <p className={cn("mt-1 text-sm font-medium", plan.recommended ? "text-teal-300" : "text-teal-600")}>
        {devices}
      </p>

      <p className={cn("mt-5 text-sm leading-relaxed", plan.recommended ? "text-ink-300" : "text-ink-500")}>
        {description}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", plan.recommended ? "text-teal-400" : "text-teal-500")}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={plan.recommended ? "text-ink-100" : "text-ink-600"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={`/order?plan=${plan.id}`}
        variant={plan.recommended ? "primary" : "secondary"}
        className="mt-8 w-full justify-center"
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
