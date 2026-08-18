import { apiClient } from "@/lib/api/client";
import type { BusinessOrderPayload, BusinessOrderResponse } from "@/types/order";

// Backend contract: POST /billing/leads
// Required: companyName, email, currency, amount (fxRate/fxRateDate required
// too when currency is "UAH"). Optional: contactName, phone, tier, message,
// billingCycle. The backend has no dedicated fields for `country`/
// `callMeBack` yet, so those are folded into `message` rather than sent as
// unknown top-level keys.
function buildMessage(payload: BusinessOrderPayload): string | undefined {
  const extras: string[] = [];
  if (payload.country) extras.push(`Країна: ${payload.country}`);
  if (payload.callMeBack) extras.push("Просить передзвонити");
  if (payload.message) extras.push(payload.message);
  return extras.length > 0 ? extras.join("\n") : undefined;
}

export async function submitBusinessOrder(
  payload: BusinessOrderPayload,
): Promise<BusinessOrderResponse> {
  return apiClient.post<BusinessOrderResponse>("/billing/leads", {
    companyName: payload.companyName,
    email: payload.email,
    contactName: payload.contactPerson,
    phone: payload.phone,
    tier: payload.plan,
    message: buildMessage(payload),
    currency: payload.currency,
    amount: payload.amount,
    fxRate: payload.fxRate,
    fxRateDate: payload.fxRateDate,
    billingCycle: payload.billingCycle,
  });
}
