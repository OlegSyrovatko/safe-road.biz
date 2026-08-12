import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

const icons = [
  <path key="1" d="M9 18l-5-5 5-5m6 10l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="2" d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="3" d="M4 20V10m6 10V4m6 16v-7m6 7V8" strokeLinecap="round" strokeLinejoin="round" />,
  <path
    key="4"
    d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.24 5.24l-2.12-2.12M8.88 8.88L6.76 6.76m10.48 0l-2.12 2.12M8.88 15.12l-2.12 2.12"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
];

export function ProblemSection() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="problem" className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-50 500 C 150 420, 250 300, 220 220 S 420 60, 480 140 S 620 340, 780 260 S 1000 80, 1250 160"
          stroke="url(#problem-road)"
          strokeWidth="3"
          strokeDasharray="2 14"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="problem-road" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0%" stopColor="#5686ff" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
      </svg>

      <Container className="relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          tone="dark"
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-rose-400">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5.5 w-5.5" stroke="currentColor" strokeWidth="1.8">
                    {icons[index % icons.length]}
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
