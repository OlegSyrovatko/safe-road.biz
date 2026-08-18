import type { BillingCycle } from "@/types/billing";

export const ANNUAL_DISCOUNT_MONTHS = 2;
export const ANNUAL_BILLED_MONTHS = 12 - ANNUAL_DISCOUNT_MONTHS;

/** Amount actually charged for the plan under the given billing cycle. */
export function amountUsdForCycle(priceUsdPerMonth: number, cycle: BillingCycle): number {
  return cycle === "annual" ? priceUsdPerMonth * ANNUAL_BILLED_MONTHS : priceUsdPerMonth;
}

/** Undiscounted 12-month price, for showing the struck-through "was" price. */
export function fullAnnualPriceUsd(priceUsdPerMonth: number): number {
  return priceUsdPerMonth * 12;
}
