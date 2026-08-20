import { Link } from "@/i18n/navigation";

function FlameMark({ className, idPrefix }: { className?: string; idPrefix: string }) {
  return (
    <svg viewBox="0 0 36 56" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${idPrefix}-gold`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#c9922a" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#f0d56a" />
        </linearGradient>
      </defs>
      <path
        d="M18 1.5C26 14 33 24.5 33 36.5 33 46.5 26.8 54.5 18 55.5 9.2 54.5 3 46.5 3 36.5 3 24.5 10 14 18 1.5Z"
        fill={`url(#${idPrefix}-gold)`}
      />
      <path
        d="M18 11C23.8 20.5 27.4 28 27.4 36.4 27.4 43.8 23.4 49.2 18 50.4 12.6 49.2 8.6 43.8 8.6 36.4 8.6 28 12.2 20.5 18 11Z"
        fill="#7B181B"
      />
      <path
        d="M18 18C19.4 22.5 20.2 26.5 20.2 30.8 20.2 35.2 19.3 38.6 18 39.6 16.7 38.6 15.8 35.2 15.8 30.8 15.8 26.5 16.6 22.5 18 18Z"
        fill="#d4af37"
      />
    </svg>
  );
}

function SideFlourish({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 22 8"
      className={`h-2 w-5 ${flip ? "-scale-x-100" : ""} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4.2c3.2-2.8 6.4-2.8 9.2 0 1.6 1.6 3.6 2.2 6.2 1.4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle cx="19.2" cy="5.2" r="1.15" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  compact?: boolean;
  light?: boolean;
  gujarati: string;
  english: string;
};

export function Logo({ compact = false, light = false, gujarati, english }: LogoProps) {
  const titleColor = light ? "text-white" : "text-[#7B181B]";
  const flourishColor = light ? "text-[#f7d794]" : "text-[#7B181B]";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <FlameMark
        idPrefix={compact ? "footerTilak" : "headerTilak"}
        className={compact ? "h-10 w-[26px]" : "h-[46px] w-[30px]"}
      />
      <span className="leading-[1.15]">
        <span
          className={`block font-serif text-[18px] font-bold tracking-[0.01em] sm:text-[20px] ${titleColor}`}
        >
          {gujarati}
        </span>
        <span
          className={`mt-0.5 flex items-center gap-1.5 font-serif text-[11px] font-normal tracking-[0.02em] sm:text-[12px] ${titleColor}`}
        >
          {!compact ? <SideFlourish className={flourishColor} /> : null}
          <span>{english}</span>
          {!compact ? <SideFlourish flip className={flourishColor} /> : null}
        </span>
      </span>
    </Link>
  );
}
