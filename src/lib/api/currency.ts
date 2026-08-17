import { apiClient } from "@/lib/api/client";
import type { ExchangeRate } from "@/types/currency";

// Backend endpoint (mobile app's backend): GET /fx/usd-uah
// It owns the NBU fetch + daily cache, so this value is the same one
// used to compute UAH invoices — the site must never call NBU directly.
export async function getUsdToUahRate(): Promise<ExchangeRate> {
  return apiClient.get<ExchangeRate>("/fx/usd-uah");
}
