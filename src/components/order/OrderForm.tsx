"use client";

import { Button } from "@/components/ui/Button";
import { paidPlans } from "@/data/pricing";
import { submitBusinessOrder } from "@/lib/api/business";
import { useCurrency } from "@/lib/currency/CurrencyProvider";
import { convertUsdToUah } from "@/lib/currency/format";
import { useBillingCycle } from "@/lib/pricing/BillingCycleProvider";
import { amountUsdForCycle } from "@/lib/pricing/billingCycle";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/types/order";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

interface FormState {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  callMeBack: boolean;
}

const initialState: FormState = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  country: "",
  message: "",
  callMeBack: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+0-9()\s-]{6,}$/;

type FieldErrors = Partial<Record<keyof FormState, string>>;

// Only ever rendered once a plan is already chosen (see order/page.tsx) —
// tier and billing cycle are picked together on the pricing section, where
// the price is visible; a plan-only picker inside this form could silently
// disagree with whatever billing cycle is currently selected elsewhere.
export function OrderForm({ planId }: { planId: PlanId }) {
  const t = useTranslations("order");
  const { displayCurrency, rate } = useCurrency();
  const { billingCycle } = useBillingCycle();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState(false);

  function updateField(field: keyof Omit<FormState, "callMeBack">, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};
    const required: (keyof Omit<FormState, "callMeBack">)[] = [
      "companyName",
      "contactPerson",
      "email",
      "phone",
      "country",
    ];

    for (const field of required) {
      if (!values[field].trim()) {
        nextErrors[field] = t("validation.required");
      }
    }

    if (values.email && !EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = t("validation.invalidEmail");
    }

    if (values.phone && !PHONE_PATTERN.test(values.phone)) {
      nextErrors.phone = t("validation.invalidPhone");
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    const selectedPlan = paidPlans.find((plan) => plan.id === planId);
    const amountUsd = selectedPlan ? amountUsdForCycle(selectedPlan.priceUsd, billingCycle) : undefined;
    const amount =
      amountUsd !== undefined && displayCurrency === "UAH" && rate
        ? convertUsdToUah(amountUsd, rate.rate)
        : amountUsd;

    try {
      await submitBusinessOrder({
        ...values,
        plan: planId,
        billingCycle,
        currency: displayCurrency,
        amount,
        fxRate: displayCurrency === "UAH" ? rate?.rate : undefined,
        fxRateDate: displayCurrency === "UAH" ? rate?.date : undefined,
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError(true);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-teal-200 bg-teal-50/60 p-8 text-center"
        role="status"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white">
          <svg viewBox="0 0 20 20" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
            <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink-950">{t("success.title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{t("success.description")}</p>
        <Button href="/" variant="secondary" className="mt-6">
          {t("success.backHome")}
        </Button>
      </motion.div>
    );
  }

  const fields: {
    name: keyof Omit<FormState, "callMeBack">;
    label: string;
    type?: string;
    span?: "full" | "half";
  }[] = [
    { name: "companyName", label: t("form.companyName"), span: "full" },
    { name: "contactPerson", label: t("form.contactPerson"), span: "half" },
    { name: "email", label: t("form.email"), type: "email", span: "half" },
    { name: "phone", label: t("form.phone"), type: "tel", span: "half" },
    { name: "country", label: t("form.country"), span: "half" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.span === "full" ? "sm:col-span-2" : undefined}>
            <label htmlFor={field.name} className="block text-sm font-medium text-ink-700">
              {field.label} <span className="text-rose-500">*</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={(event) => updateField(field.name, event.target.value)}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={cn(
                "mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink-950 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
                errors[field.name] ? "border-rose-400" : "border-ink-200",
              )}
            />
            <AnimatePresence>
              {errors[field.name] ? (
                <motion.p
                  id={`${field.name}-error`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-1.5 text-xs font-medium text-rose-500"
                  role="alert"
                >
                  {errors[field.name]}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-ink-700">
            {t("form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={t("form.messagePlaceholder")}
            className="mt-1.5 w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-950 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={values.callMeBack}
              onChange={(event) => setValues((prev) => ({ ...prev, callMeBack: event.target.checked }))}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-500 focus:ring-2 focus:ring-brand-100"
            />
            <span className="text-sm text-ink-700">{t("form.callMeBack")}</span>
          </label>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-400">
        <span className="text-rose-500">*</span> {t("form.requiredMark")}
      </p>

      <p className="mt-3 text-xs leading-relaxed text-ink-400">{t("form.nextStepsNote")}</p>

      <AnimatePresence>
        {submitError ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-600"
            role="alert"
          >
            {t("form.submitError")}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-6 w-full justify-center"
      >
        {status === "submitting" ? t("form.submitting") : t("form.submit")}
      </Button>
    </form>
  );
}
