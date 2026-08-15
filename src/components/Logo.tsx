import { Link } from "@/i18n/navigation";

export function Logo({
  compact = false,
  gujarati,
  english,
}: {
  compact?: boolean;
  gujarati: string;
  english: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className={compact ? "h-11 w-11" : "h-14 w-14"}>
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={compact ? "flameGoldFooter" : "flameGoldHeader"} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#9a2230" />
              <stop offset="45%" stopColor="#e0b13a" />
              <stop offset="100%" stopColor="#f6e27a" />
            </linearGradient>
          </defs>
          <path d="M32 6 L58 54 H6 Z" fill="none" stroke="#c9a441" strokeWidth="2.4" />
          <path d="M32 18c4 6 7 10 7 15 0 5-3 9-7 9s-7-4-7-9c0-5 3-9 7-15Z" fill={compact ? "url(#flameGoldFooter)" : "url(#flameGoldHeader)"} />
          <path d="M32 26c1.6 3 2.6 5 2.6 7.4 0 2.4-1.1 4.2-2.6 4.2s-2.6-1.8-2.6-4.2c0-2.4 1-4.4 2.6-7.4Z" fill="#9a2230" opacity="0.85" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-maroon text-[15px] sm:text-lg">{gujarati}</span>
        <span className="block text-[11px] tracking-wide text-muted sm:text-xs">{english}</span>
      </span>
    </Link>
  );
}
