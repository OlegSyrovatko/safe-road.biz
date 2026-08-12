import type { PlanId } from "@/types/order";

export interface PricingPlan {
  id: PlanId;
  price: string;
  recommended: boolean;
}

export const freePlan: PricingPlan = { id: "free", price: "$0", recommended: false };

export const paidPlans: PricingPlan[] = [
  { id: "basic", price: "$4.99", recommended: false },
  { id: "plus", price: "$29.99", recommended: true },
  { id: "pro", price: "$99.99", recommended: false },
];

export const pricingPlans: PricingPlan[] = [freePlan, ...paidPlans];

export const planIds: PlanId[] = pricingPlans.map((plan) => plan.id);

export function isPlanId(value: string | null | undefined): value is PlanId {
  return !!value && planIds.includes(value as PlanId);
}
