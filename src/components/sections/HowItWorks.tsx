import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <StaggerItem key={step.title} className="relative">
              <div className="flex gap-4 lg:flex-col lg:gap-0">
                <div className="flex flex-col items-center lg:flex-row lg:gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-base font-semibold text-white">
                    {index + 1}
                  </span>
                  <span
                    className="mt-2 hidden h-px flex-1 bg-ink-200 lg:block"
                    aria-hidden="true"
                    style={{ display: index === steps.length - 1 ? "none" : undefined }}
                  />
                  <span
                    className="mt-1 w-px flex-1 bg-ink-200 lg:hidden"
                    aria-hidden="true"
                    style={{ display: index === steps.length - 1 ? "none" : undefined }}
                  />
                </div>
                <div className="pb-2 lg:mt-5 lg:pb-0">
                  <h3 className="font-display text-lg font-semibold text-ink-950">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
