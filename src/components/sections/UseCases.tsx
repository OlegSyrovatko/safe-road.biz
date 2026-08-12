import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

const icons = [
  <path key="truck" d="M3 16V7a1 1 0 011-1h9v10M3 16h1m9 0h5m-5-6h4l3 3v3m-5 0a2 2 0 104 0m-11 0a2 2 0 104 0" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="logistics" d="M21 7L12 3 3 7m18 0l-9 4m9-4v10l-9 4M3 7l9 4m-9-4v10l9 4m0-10v10" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="delivery" d="M20 8h-3V4H3v13h1m16-9v9h-4m-6 0a2 2 0 104 0m6 0a2 2 0 104 0m-10 0H9" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="service" d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2-2 2.1-2.1z" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="fleet"
    d="M4 6a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM17 8h1a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path key="fop" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a4 4 0 014-4h1m9-3v6m3-3h-6" strokeLinecap="round" strokeLinejoin="round" />,
];

export function UseCases() {
  const t = useTranslations("useCases");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="use-cases" className="bg-ink-50/60 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-ink-200 bg-white p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5.5 w-5.5" stroke="currentColor" strokeWidth="1.8">
                    {icons[index % icons.length]}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
