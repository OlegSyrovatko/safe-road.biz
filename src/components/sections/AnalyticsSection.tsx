"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export function AnalyticsSection() {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const stats = t.raw("stats") as { label: string; description: string }[];
  const shouldReduceMotion = useReducedMotion();
  const screenshotSrc =
    locale === "en" ? "/images/analytics/devices-en.jpg" : "/images/analytics/devices-uk.jpg";

  return (
    <section id="analytics" className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_0%,rgba(20,184,166,0.18),transparent_70%)]"
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <Badge tone="dark">{t("eyebrow")}</Badge>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-300">{t("description")}</p>
          <p className="mt-4 font-medium text-teal-300">{t("message")}</p>

          <StaggerGroup className="mt-9 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-display text-sm font-semibold text-white">{stat.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-400">{stat.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Button href="/order" variant="dark" className="mt-9">
            {t("cta")}
          </Button>
        </div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[582/663] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-2xl shadow-ink-950/30 ring-1 ring-inset ring-white/10">
            <Image
              src={screenshotSrc}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
