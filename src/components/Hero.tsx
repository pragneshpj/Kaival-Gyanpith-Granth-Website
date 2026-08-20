import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TempleIcon } from "./Icons";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Home = {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  heroImage: string;
};

type Ui = {
  viewBooks: Localized;
  handwrittenCta: Localized;
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

function GoldDivider() {
  return (
    <div className="my-6 flex max-w-[280px] items-center gap-2" aria-hidden="true">
      <span className="h-px flex-1 bg-[#C5A059]" />
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0" fill="none">
        <path d="M7 1.5 L12.5 7 L7 12.5 L1.5 7 Z" fill="#C5A059" />
      </svg>
      <span className="h-px flex-1 bg-[#C5A059]" />
    </div>
  );
}

export function Hero({
  locale,
  home,
  ui,
}: {
  locale: Locale;
  home: Home;
  ui: Ui;
}) {
  const titleLines = t(home.title, locale).split("\n");

  return (
    <section className="relative overflow-hidden bg-[#FCF8F1]">
      <Mandala className="pointer-events-none absolute -top-10 -right-24 hidden h-[560px] w-[560px] opacity-[0.12] lg:block" />

      <div className="mx-auto grid max-w-7xl items-center px-5 py-10 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] md:px-8 md:py-14 lg:py-16">
        <div className="max-w-[520px] pr-2 md:pr-8">
          <p className="mb-2.5 font-serif text-[14px] font-medium tracking-[0.03em] text-[#4D0F0C]">
            {t(home.eyebrow, locale)}
          </p>
          <h1 className="font-serif text-[30px] leading-[1.35] font-bold text-[#4D0F0C] md:text-[38px] lg:text-[42px]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>
          <GoldDivider />
          <p className="max-w-[460px] text-[15px] leading-[1.95] font-normal text-[#555555]">
            {t(home.description, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/library"
              className="inline-flex h-11 items-center gap-2 rounded-[5px] bg-[#7D1418] px-5 text-[14px] font-medium text-white hover:bg-[#641216]"
            >
              {t(ui.viewBooks, locale)}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/library"
              className="inline-flex h-11 items-center gap-2 rounded-[5px] border border-[#D1A675] bg-transparent px-5 text-[14px] font-medium text-[#4D0F0C] hover:bg-[#D1A675]/10"
            >
              {t(ui.handwrittenCta, locale)}
              <TempleIcon className="h-[18px] w-[18px] text-[#C5A059]" />
            </Link>
          </div>
        </div>

        <div className="relative mt-8 h-[280px] w-full sm:h-[340px] md:mt-0 md:h-[420px] lg:h-[460px]">
          <Image
            src={home.heroImage}
            alt={t(home.title, locale)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}
