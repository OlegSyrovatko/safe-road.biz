"use client";

import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

function RoadQualityMap({ alt, src }: { alt: string; src?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (src) {
    return (
      <div
        className="relative aspect-[582/663] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-2xl shadow-ink-950/30 ring-1 ring-inset ring-white/10"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          className="object-cover object-center"
        />
      </div>
    );
  }

  const segments = [
    { d: "M20 260 C 60 220, 100 200, 140 180", color: "#14b8a6" },
    { d: "M140 180 C 175 162, 200 140, 210 100", color: "#f59e0b" },
    { d: "M210 100 C 220 60, 250 40, 300 30", color: "#14b8a6" },
    { d: "M300 30 C 340 24, 370 40, 380 70", color: "#f43f5e" },
    { d: "M380 70 C 392 100, 400 130, 430 150", color: "#14b8a6" },
  ];

  return (
    <div
      role="img"
      aria-label={alt}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-2xl shadow-ink-950/30"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(86,134,255,0.18),transparent_55%)]"
      />
      <svg viewBox="0 0 460 300" className="relative h-full w-full" fill="none">
        <path
          d="M20 260 C 60 220, 100 200, 140 180 C 175 162, 200 140, 210 100 C 220 60, 250 40, 300 30 C 340 24, 370 40, 380 70 C 392 100, 400 130, 430 150"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {segments.map((segment, index) => (
          <motion.path
            key={segment.d}
            d={segment.d}
            stroke={segment.color}
            strokeWidth="6"
            strokeLinecap="round"
            initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.15, ease: "easeOut" }}
          />
        ))}
        <circle cx="20" cy="260" r="6" fill="#5686ff" />
        <circle cx="430" cy="150" r="6" fill="#2dd4bf" />
      </svg>
    </div>
  );
}

export function RoadQualitySection() {
  const t = useTranslations("roadQuality");

  const legend = [
    { label: t("legendGood"), color: "bg-teal-500" },
    { label: t("legendMedium"), color: "bg-amber-500" },
    { label: t("legendBad"), color: "bg-rose-500" },
  ];

  return (
    <section id="road-quality" className="bg-ink-50/60 py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge tone="brand">{t("eyebrow")}</Badge>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-500">{t("description")}</p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {legend.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-ink-700">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-ink-400">{t("note")}</p>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path
                  d="M2 13h3l1.5-4L9 17l2-8 1.5 4H16l1.5-3L19 13h3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-sm leading-relaxed text-ink-700">{t("vibrationNote")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <RoadQualityMap alt={t("imageAlt")} src="/images/road-quality/route-overview.jpg" />
        </Reveal>
      </Container>
    </section>
  );
}
