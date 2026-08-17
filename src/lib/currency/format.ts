import type { CurrencyCode } from "@/types/currency";

const SYMBOLS: Record<CurrencyCode, string> = { USD: "$", UAH: "₴" };

export function convertUsdToUah(amountUsd: number, rate: number): number {
  return amountUsd * rate;
}

export function formatCurrency(amount: number, currency: CurrencyCode, locale: string): string {
  if (currency === "USD") {
    // USD conventionally uses a period decimal separator everywhere,
    // regardless of the site's locale — keep it locale-independent.
    const value = amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${SYMBOLS.USD}${value}`;
  }

  const value = amount.toLocaleString(locale === "uk" ? "uk-UA" : "en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `${value} ${SYMBOLS.UAH}`;
}
