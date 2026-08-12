"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LanguageSwitcherButtons({
  className,
  query,
}: {
  className?: string;
  query: Record<string, string>;
}) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-ink-200 bg-white/70 p-0.5 text-sm font-semibold",
        className,
      )}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={isActive}
            onClick={() =>
              router.replace(
                // @ts-expect-error -- pathname includes dynamic route params which are irrelevant here
                { pathname, params, query },
                { locale: loc },
              )
            }
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              isActive ? "bg-ink-950 text-white" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {t(loc)}
          </button>
        );
      })}
    </div>
  );
}

function LanguageSwitcherWithQuery({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  return <LanguageSwitcherButtons className={className} query={Object.fromEntries(searchParams.entries())} />;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <Suspense fallback={<LanguageSwitcherButtons className={className} query={{}} />}>
      <LanguageSwitcherWithQuery className={className} />
    </Suspense>
  );
}
