import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            tone === "dark" ? "text-brand-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-balance text-lg leading-relaxed",
            tone === "dark" ? "text-ink-300" : "text-ink-500",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
