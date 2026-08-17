"use client";

import { useCurrency } from "@/lib/currency/CurrencyProvider";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/currency";
import { useLocale, useTranslations } from "next-intl";

const CURRENCIES: CurrencyCode[] = ["USD", "UAH"];

export function CurrencyToggle({ className }: { className?: string }) {
  const t = useTranslations("pricing.currency");
  const locale = useLocale();
  const { currency, setCurrency, rate, rateStatus } = useCurrency();

  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <div
        role="group"
        aria-label={t("label")}
        className="inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5 text-sm font-semibold"
      >
        {CURRENCIES.map((code) => {
          const isActive = code === currency;
          return (
            <button
              key={code}
              type="button"
              aria-pressed={isActive}
              onClick={() => setCurrency(code)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                isActive ? "bg-ink-950 text-white" : "text-ink-500 hover:text-ink-900",
              )}
            >
              {code}
            </button>
          );
        })}
      </div>

      {currency === "UAH" && rateStatus === "ready" && rate ? (
        <p className="text-xs text-ink-400">
          {t("rateNote", {
            rate: rate.rate.toLocaleString(locale === "uk" ? "uk-UA" : "en-US", { maximumFractionDigits: 2 }),
            date: rate.date,
          })}
        </p>
      ) : null}

      {currency === "UAH" && rateStatus === "loading" ? (
        <p className="text-xs text-ink-400">{t("rateLoading")}</p>
      ) : null}

      {currency === "UAH" && rateStatus === "unavailable" ? (
        <p className="text-xs text-amber-600">{t("rateUnavailable")}</p>
      ) : null}
    </div>
  );
}
