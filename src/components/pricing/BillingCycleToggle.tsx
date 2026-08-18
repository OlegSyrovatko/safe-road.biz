"use client";

import { useBillingCycle } from "@/lib/pricing/BillingCycleProvider";
import { ANNUAL_DISCOUNT_MONTHS } from "@/lib/pricing/billingCycle";
import { cn } from "@/lib/utils";
import type { BillingCycle } from "@/types/billing";
import { useTranslations } from "next-intl";

const CYCLES: BillingCycle[] = ["monthly", "annual"];

export function BillingCycleToggle({ className }: { className?: string }) {
  const t = useTranslations("pricing.billingCycle");
  const { billingCycle, setBillingCycle } = useBillingCycle();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5 text-sm font-semibold",
        className,
      )}
    >
      {CYCLES.map((cycle) => {
        const isActive = cycle === billingCycle;
        return (
          <button
            key={cycle}
            type="button"
            aria-pressed={isActive}
            onClick={() => setBillingCycle(cycle)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-colors",
              isActive ? "bg-ink-950 text-white" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {t(cycle)}
            {cycle === "annual" ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                  isActive ? "bg-teal-400 text-ink-950" : "bg-teal-500/10 text-teal-600",
                )}
              >
                {t("annualBadge", { months: ANNUAL_DISCOUNT_MONTHS })}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
