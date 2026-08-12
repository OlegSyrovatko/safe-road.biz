import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

export function SolutionSection() {
  const t = useTranslations("solution");
  const items = t.raw("items") as { problem: string; result: string }[];

  return (
    <section id="solution" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4">
          {items.map((item) => (
            <StaggerItem key={item.problem}>
              <div className="grid grid-cols-1 items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {t("flowProblem")}
                  </p>
                  <p className="mt-1.5 font-medium text-ink-600">{item.problem}</p>
                </div>

                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white shadow-md shadow-brand-500/30">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 rotate-90 sm:rotate-0" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    {t("flowProduct")}
                  </span>
                </div>

                <div className="rounded-xl bg-brand-50/70 p-4 sm:bg-transparent sm:p-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {t("flowResult")}
                  </p>
                  <p className="mt-1.5 font-semibold text-ink-950">{item.result}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
