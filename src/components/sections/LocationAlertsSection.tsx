"use client";

import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useLocale, useTranslations } from "next-intl";

const pointIcons = [
  <path
    key="radius"
    d="M12 21s-7-5.25-7-11a7 7 0 1114 0c0 5.75-7 11-7 11z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path key="telegram" d="M21 3L3 10.5l7 2.5 2.5 7L21 3z" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="devices"
    d="M4 6a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM17 8h1a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="free"
    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export function LocationAlertsSection() {
  const t = useTranslations("locationAlerts");
  const locale = useLocale();
  const points = t.raw("points") as { title: string; description: string }[];
  const screenshotSrc =
    locale === "en" ? "/images/location-alerts/radius-en.jpg" : "/images/location-alerts/radius-uk.jpg";

  return (
    <section id="location-alerts" className="bg-ink-50/60 py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge tone="teal">{t("eyebrow")}</Badge>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-500">{t("description")}</p>

          <StaggerGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((point, index) => (
              <StaggerItem key={point.title}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
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
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm">
          <AppScreenshot src={screenshotSrc} alt={t("imageAlt")} variant="phone" />
        </Reveal>
      </Container>
    </section>
  );
}
