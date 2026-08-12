import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface PolicySection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  note?: string;
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
  backLabel: string;
}

export function PolicyPage({ eyebrow, title, updated, intro, sections, backLabel }: PolicyPageProps) {
  return (
    <div className="py-28 sm:py-36">
      <Container className="max-w-3xl">
        <Badge tone="brand">{eyebrow}</Badge>
        <h1 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-ink-400">{updated}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-600">{intro}</p>

        <div className="mt-12 space-y-10 border-t border-ink-200 pt-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-ink-950">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-ink-600 sm:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="space-y-2 pl-1">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600 sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.note ? (
                  <p className="text-sm leading-relaxed text-ink-500 sm:text-base">{section.note}</p>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <Button href="/" variant="secondary" className="mt-14">
          {backLabel}
        </Button>
      </Container>
    </div>
  );
}
