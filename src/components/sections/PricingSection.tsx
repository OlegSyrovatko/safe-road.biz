import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/pricing/PricingCard";
import { FreeTrialBanner } from "@/components/pricing/FreeTrialBanner";
import { CurrencyToggle } from "@/components/pricing/CurrencyToggle";
import { paidPlans } from "@/data/pricing";
import { useTranslations } from "next-intl";

export function PricingSection() {
  const t = useTranslations("pricing");
  const tFooter = useTranslations("footer");

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-8 flex justify-center">
          <CurrencyToggle />
        </div>

        <div className="mt-10">
          <FreeTrialBanner
            badge={t("freeTrial.badge")}
            title={t("freeTrial.title")}
            description={t("freeTrial.description")}
            appStoreLabel={tFooter("appStore")}
            googlePlayLabel={tFooter("googlePlay")}
          />
        </div>

        <StaggerGroup className="grid grid-cols-1 items-stretch gap-6 pt-4 lg:grid-cols-3 lg:gap-7">
          {paidPlans.map((plan) => (
            <StaggerItem key={plan.id} className="h-full">
              <PricingCard
                plan={plan}
                name={t(`plans.${plan.id}.name`)}
                tagline={t(`plans.${plan.id}.tagline`)}
                devices={t(`plans.${plan.id}.devices`)}
                description={t(`plans.${plan.id}.description`)}
                features={t.raw(`plans.${plan.id}.features`) as string[]}
                perMonthLabel={t("perMonth")}
                ctaLabel={t("cta")}
                recommendedLabel={t("recommendedBadge")}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
