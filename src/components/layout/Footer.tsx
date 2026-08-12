import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { appStoreUrl, googlePlayUrl } from "@/data/stores";
import { useTranslations } from "next-intl";
import Image from "next/image";

const storeLinks = [
  { key: "appStore", href: appStoreUrl },
  { key: "googlePlay", href: googlePlayUrl },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/oleg.sirovatko/?locale=uk_UA" },
  { label: "Instagram", href: "https://www.instagram.com/sirovatkooleg/" },
  { label: "Threads", href: "https://www.threads.com/@sirovatkooleg" },
  { label: "TikTok", href: "https://www.tiktok.com/@safe.road3" },
  { label: "YouTube", href: "https://www.youtube.com/@safeworldroad" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/#features", label: tNav("features") },
    { href: "/#business-benefits", label: tNav("business") },
    { href: "/#analytics", label: tNav("analytics") },
    { href: "/#pricing", label: tNav("pricing") },
    { href: "/order", label: tNav("order") },
  ];

  return (
    <footer className="border-t border-ink-200 bg-ink-950 text-ink-300">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <Image src="/images/brand/logo-mark.png" alt="" width={32} height={32} className="h-8 w-8" />
              Safe Road
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">{t("description")}</p>
            <a
              href="tel:+380935941984"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-brand-300"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" stroke="currentColor" strokeWidth="1.8">
                <path
                  d="M4 5c0-1.1.9-2 2-2h2.2c.5 0 .9.3 1 .8l1 3.6c.1.4 0 .8-.3 1.1L8.5 10c1 2.4 3.1 4.5 5.5 5.5l1.5-1.4c.3-.3.7-.4 1.1-.3l3.6 1c.5.1.8.5.8 1V19c0 1.1-.9 2-2 2h-1C9.8 21 3 14.2 3 6V5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +380 93 594 19 84
            </a>
            <div className="mt-6">
              <LanguageSwitcher className="border-white/15 bg-white/5" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{t("navTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{t("storesTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {storeLinks.map((store) => (
                <li key={store.key}>
                  <a
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white"
                  >
                    {t(store.key)}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-white">{t("socialTitle")}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white"
                    aria-label={social.label}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{t("legalTitle")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-sm hover:text-white">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-sm text-ink-400">
          {t("copyright", { year })}
        </div>
      </Container>
    </footer>
  );
}
