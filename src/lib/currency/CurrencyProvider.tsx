"use client";

import { getUsdToUahRate } from "@/lib/api/currency";
import type { CurrencyCode, ExchangeRate } from "@/types/currency";
import { useLocale } from "next-intl";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "safe-road:currency";

type RateStatus = "loading" | "ready" | "unavailable";

interface CurrencyContextValue {
  /** Raw user preference — reflected by the toggle. */
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rate: ExchangeRate | null;
  rateStatus: RateStatus;
  /** What prices should actually render in — USD until a real rate is ready. */
  displayCurrency: CurrencyCode;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function defaultCurrencyForLocale(locale: string): CurrencyCode {
  return locale === "uk" ? "UAH" : "USD";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => defaultCurrencyForLocale(locale));
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [rateStatus, setRateStatus] = useState<RateStatus>("loading");

  // Reconcile with a previously chosen currency only after mount, so the
  // server-rendered (locale-based) markup matches the first client render.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "USD" || stored === "UAH") {
      // One-time reconciliation with a value that only exists on the client
      // (localStorage) — the initial render must match the server's
      // locale-based default, so this can't be done in the state initializer.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrencyState(stored);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getUsdToUahRate()
      .then((result) => {
        if (!cancelled) {
          setRate(result);
          setRateStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRateStatus("unavailable");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function setCurrency(next: CurrencyCode) {
    setCurrencyState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      rate,
      rateStatus,
      // Prices should render in USD until a real NBU rate is available, even
      // if UAH is selected — a UAH figure must never appear without a rate
      // behind it. The toggle itself still reflects the raw selection.
      displayCurrency: currency === "UAH" && rateStatus === "ready" ? "UAH" : "USD",
    }),
    [currency, rate, rateStatus],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
