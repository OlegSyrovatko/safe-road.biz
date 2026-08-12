import type { BusinessOrderPayload, BusinessOrderResponse } from "@/types/order";

// Backend is not live yet. Once available, replace the body with:
// return apiClient.post<BusinessOrderResponse>("/business/order", payload);
export async function submitBusinessOrder(
  payload: BusinessOrderPayload,
): Promise<BusinessOrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (process.env.NODE_ENV === "development") {
    console.info("[mock] business order submitted", payload);
  }

  return {
    id: `mock-${Date.now()}`,
    receivedAt: new Date().toISOString(),
  };
}
