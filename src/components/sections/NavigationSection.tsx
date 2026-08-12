"use client";

import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const pointIcons = [
  <path key="1" d="M9 20l-5-1.5V5L9 6.5m0 13.5l6-1.5m-6 1.5V6.5m6 12l5 1.5V6l-5-1.5m0 15V4.5m0 2L9 6.5" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="2" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="4" d="M8 3L5 21M16 3l3 18M12 4v3m0 5v3m0 5v2" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="5" d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round" />,
];

export function NavigationSection() {
  const t = useTranslations("navigationFeature");
  const points = t.raw("points") as { title: string; description: string }[];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="features" className="py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 mx-auto w-full max-w-sm lg:order-1"
        >
          <AppScreenshot
            src="/images/navigation/navigation-route.jpg"
            alt={t("imageAlt")}
            variant="phone"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <Badge tone="brand">{t("eyebrow")}</Badge>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-500">{t("description")}</p>

          <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <StaggerItem key={point.title}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" stroke="currentColor" strokeWidth="1.8">
                      {pointIcons[index % pointIcons.length]}
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink-950">{point.title}</p>
                    <p className="mt-0.5 text-sm text-ink-500">{point.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Button href="/#pricing" variant="secondary" className="mt-9">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
