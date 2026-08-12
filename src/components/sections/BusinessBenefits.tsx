import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

const icons = [
  <path key="control" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="analytics" d="M4 20V10m6 10V4m6 16v-7m6 7V8" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="safety" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="driving-style"
    d="M2 13h3l1.5-4L9 17l2-8 1.5 4H16l1.5-3L19 13h3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <path key="efficiency" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="scale"
    d="M4 6a2 2 0 012-2h9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM17 8h1a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-1"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export function BusinessBenefits() {
  const t = useTranslations("businessBenefits");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="business-benefits" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white">
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
