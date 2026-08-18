"use client";

import type { BillingCycle } from "@/types/billing";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "safe-road:billing-cycle";

interface BillingCycleContextValue {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

const BillingCycleContext = createContext<BillingCycleContextValue | null>(null);

export function BillingCycleProvider({ children }: { children: ReactNode }) {
  const [billingCycle, setBillingCycleState] = useState<BillingCycle>("monthly");

  // Reconcile with a previously chosen cycle only after mount, so the
  // server-rendered ("monthly") markup matches the first client render.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "monthly" || stored === "annual") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBillingCycleState(stored);
    }
  }, []);

  function setBillingCycle(next: BillingCycle) {
    setBillingCycleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const value = useMemo<BillingCycleContextValue>(
    () => ({ billingCycle, setBillingCycle }),
    [billingCycle],
  );

  return <BillingCycleContext.Provider value={value}>{children}</BillingCycleContext.Provider>;
}

export function useBillingCycle() {
  const context = useContext(BillingCycleContext);
  if (!context) {
    throw new Error("useBillingCycle must be used within a BillingCycleProvider");
  }
  return context;
}
