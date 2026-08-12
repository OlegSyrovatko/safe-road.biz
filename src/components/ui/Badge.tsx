import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "brand" | "neutral" | "dark" | "teal" | "amber" | "rose";

const toneClasses: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
  neutral: "bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200",
  dark: "bg-white/10 text-white ring-1 ring-inset ring-white/20",
  teal: "bg-teal-500/10 text-teal-600 ring-1 ring-inset ring-teal-500/30",
  amber: "bg-amber-500/10 text-amber-600 ring-1 ring-inset ring-amber-500/30",
  rose: "bg-rose-500/10 text-rose-600 ring-1 ring-inset ring-rose-500/30",
};

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
