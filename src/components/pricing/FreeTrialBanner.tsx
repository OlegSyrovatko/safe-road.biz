import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { appStoreUrl, googlePlayUrl } from "@/data/stores";
import { cn } from "@/lib/utils";

interface FreeTrialBannerProps {
  badge: string;
  title: string;
  description: string;
  appStoreLabel: string;
  googlePlayLabel: string;
}

const storeLinkClasses = cn(
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-sm transition-all duration-200 hover:border-brand-300 hover:text-brand-600",
);

export function FreeTrialBanner({
  badge,
  title,
  description,
  appStoreLabel,
  googlePlayLabel,
}: FreeTrialBannerProps) {
  return (
    <Reveal className="mb-10">
      <div className="relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-brand-50 p-7 sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-300/30 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-lg shadow-teal-500/30">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                <path
                  d="M12 3l2.4 5.1L20 9l-4 3.9.9 5.4-4.9-2.6-4.9 2.6.9-5.4L4 9l5.6-.9L12 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <Badge tone="teal">{badge}</Badge>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink-950 sm:text-2xl">{title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">{description}</p>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className={storeLinkClasses}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                <path d="M17.05 12.5c-.03-2.6 2.13-3.85 2.23-3.91-1.22-1.78-3.11-2.03-3.78-2.06-1.61-.16-3.14.95-3.96.95-.82 0-2.08-.93-3.42-.9-1.76.03-3.39 1.02-4.3 2.6-1.83 3.18-.47 7.9 1.32 10.48.87 1.26 1.9 2.68 3.26 2.63 1.31-.05 1.8-.84 3.39-.84 1.58 0 2.03.84 3.41.81 1.41-.02 2.3-1.28 3.16-2.55.99-1.46 1.4-2.88 1.42-2.95-.03-.01-2.71-1.04-2.73-4.26zM14.6 4.87c.72-.87 1.2-2.08 1.07-3.29-1.03.04-2.28.69-3.02 1.55-.67.77-1.25 2.01-1.09 3.19 1.16.09 2.34-.59 3.04-1.45z" />
              </svg>
              {appStoreLabel}
            </a>
            <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className={storeLinkClasses}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                <path d="M4.3 2.6c-.4.3-.6.8-.6 1.4v16c0 .6.2 1.1.6 1.4l.1.1L13.5 12v-.1L4.4 2.5l-.1.1zm11.3 9.5l3-3 3.6 2.1c1 .6 1 1.5 0 2.1l-3.6 2.1-3-3.3zm-1 1L5.3 22.3c.3.1.7 0 1.1-.2l10.6-6.1-2.4-2.9zm0-3l2.4-2.9L6.4 1.9c-.4-.2-.8-.3-1.1-.2l9.3 9.4z" />
              </svg>
              {googlePlayLabel}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
