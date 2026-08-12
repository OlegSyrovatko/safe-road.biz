"use client";

import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  const stats = [t("statLabel1"), t("statLabel2"), t("statLabel3")];

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(47,98,245,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl"
      />

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge tone="brand">{t("badge")}</Badge>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-brand-500 to-teal-500 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-500">
            {t("subtitle")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/order" size="lg">
              {t("ctaPrimary")}
            </Button>
            <Button href="/#value" variant="secondary" size="lg">
              {t("ctaSecondary")}
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-4 border-t border-ink-200 pt-8 sm:grid-cols-3">
            {stats.map((label) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                <dt className="text-sm font-medium text-ink-600">{label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32, scale: 0.97 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-200/50 via-transparent to-teal-200/40 blur-2xl"
          />
          <AppScreenshot
            src="/images/hero/navigation-map.jpg"
            alt={t("imageAlt")}
            variant="phone"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
