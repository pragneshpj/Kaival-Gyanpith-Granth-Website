import Image from "next/image";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Stat = {
  id: string;
  value: string;
  icon: string;
  label: Localized;
};

function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="#d4af37" strokeWidth="0.6">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="78" />
        <circle cx="100" cy="100" r="58" />
        <circle cx="100" cy="100" r="36" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + Math.cos(a) * 96}
              y2={100 + Math.sin(a) * 96}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function StatsBar({ locale, stats }: { locale: Locale; stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden border-y border-[#6B1518] bg-[#F8F1E3]">
      <Mandala className="pointer-events-none absolute top-1/2 -left-24 hidden h-[280px] w-[280px] -translate-y-1/2 opacity-[0.18] md:block" />
      <Mandala className="pointer-events-none absolute top-1/2 -right-24 hidden h-[280px] w-[280px] -translate-y-1/2 opacity-[0.18] md:block" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-8 md:grid-cols-4 md:px-8 md:py-10">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-3">
            <Image
              src={stat.icon}
              alt=""
              width={88}
              height={88}
              className="h-[52px] w-[52px] shrink-0 object-contain sm:h-16 sm:w-16"
            />
            <div>
              <p className="font-[family-name:var(--font-serif-latin)] text-[32px] leading-none font-bold text-[#6B1518] md:text-[36px]">
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-[15px] leading-snug font-medium text-[#6B1518] md:text-[16px]">
                {t(stat.label, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
