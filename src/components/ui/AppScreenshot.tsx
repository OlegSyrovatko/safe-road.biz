import { cn } from "@/lib/utils";
import Image from "next/image";

interface AppScreenshotProps {
  src?: string;
  alt: string;
  variant?: "phone" | "panel";
  className?: string;
  priority?: boolean;
}

function PlaceholderArt({ variant }: { variant: "phone" | "panel" }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        "bg-[radial-gradient(circle_at_30%_20%,rgba(86,134,255,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.25),transparent_50%)] bg-ink-950",
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-20 320 C 80 260, 120 180, 90 120 S 220 20, 260 60 S 340 180, 420 140"
          stroke="url(#road-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M-20 320 C 80 260, 120 180, 90 120 S 220 20, 260 60 S 340 180, 420 140"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <circle cx="-20" cy="320" r="7" fill="#2dd4bf" />
        <circle cx="420" cy="140" r="7" fill="#5686ff" />
        <defs>
          <linearGradient id="road-gradient" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#5686ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <svg
            className={variant === "phone" ? "h-7 w-7 text-white" : "h-8 w-8 text-white"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M4 20l4-14 4 10 3-6 5 10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-xs font-medium uppercase tracking-widest text-white/50">
          Safe Road App Preview
        </p>
      </div>
    </div>
  );
}

export function AppScreenshot({
  src,
  alt,
  variant = "phone",
  className,
  priority = false,
}: AppScreenshotProps) {
  if (variant === "phone") {
    return (
      <div
        className={cn(
          "relative mx-auto aspect-[9/19] w-full max-w-[300px] rounded-[2.75rem] border-[6px] border-ink-950 bg-ink-950 shadow-2xl shadow-ink-950/40",
          className,
        )}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-ink-950" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] ring-1 ring-inset ring-white/15">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <PlaceholderArt variant="phone" />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/15 via-transparent to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-2xl shadow-ink-950/30 sm:rounded-3xl",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
      </div>
      <div className="absolute inset-0 top-10">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <PlaceholderArt variant="panel" />
        )}
      </div>
    </div>
  );
}
