import type { BillingCycle } from "@/types/billing";
import type { CurrencyCode } from "@/types/currency";

export type PlanId = "free" | "basic" | "plus" | "pro";

export interface BusinessOrderPayload {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  message?: string;
  callMeBack?: boolean;
  plan?: PlanId;
  /** Monthly, or annual with the 2-free-months discount applied. */
  billingCycle: BillingCycle;
  /** Currency the customer expects to be invoiced in. */
  currency: CurrencyCode;
  /** Plan price in `currency` for the chosen billingCycle, for reference — the backend recomputes it. */
  amount?: number;
  /** USD->UAH rate the site used to compute `amount`, only when currency is UAH. */
  fxRate?: number;
  /** NBU date for `fxRate`, only when currency is UAH. */
  fxRateDate?: string;
}

export interface BusinessOrderResponse {
  id?: string;
  receivedAt?: string;
}
