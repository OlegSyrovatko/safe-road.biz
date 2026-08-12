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
}

export interface BusinessOrderResponse {
  id: string;
  receivedAt: string;
}
