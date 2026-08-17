import type { PlanId } from "@/types/order";

export interface PricingPlan {
  id: PlanId;
  priceUsd: number;
  recommended: boolean;
}

export const freePlan: PricingPlan = { id: "free", priceUsd: 0, recommended: false };

export const paidPlans: PricingPlan[] = [
  { id: "basic", priceUsd: 4.99, recommended: false },
  { id: "plus", priceUsd: 29.99, recommended: true },
  { id: "pro", priceUsd: 99.99, recommended: false },
];

export const pricingPlans: PricingPlan[] = [freePlan, ...paidPlans];

export const planIds: PlanId[] = pricingPlans.map((plan) => plan.id);

export function isPlanId(value: string | null | undefined): value is PlanId {
  return !!value && planIds.includes(value as PlanId);
}
