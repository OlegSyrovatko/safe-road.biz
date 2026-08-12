import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

export function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section id="final-cta" className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-teal-500 px-6 py-16 text-center shadow-2xl shadow-brand-500/30 sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(255,255,255,0.25),transparent_60%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-white/90">{t("subtitle")}</p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/order" variant="dark" size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button
                href="/#pricing"
                size="lg"
                className="border border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
