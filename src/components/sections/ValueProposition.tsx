import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

const icons = [
  <path key="route" d="M4 20l4-14 4 10 3-6 5 10" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="road"
    d="M8 3L5 21M16 3l3 18M12 4v3m0 5v3m0 5v2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="chart"
    d="M4 20V10m6 10V4m6 16v-7m6 7V8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path
    key="devices"
    d="M4 6a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM17 8h1a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export function ValueProposition() {
  const t = useTranslations("valueProposition");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="value" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="group h-full rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5.5 w-5.5" stroke="currentColor" strokeWidth="1.8">
                    {icons[index % icons.length]}
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
