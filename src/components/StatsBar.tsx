import { iconMap, type IconName } from "./Icons";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Stat = {
  id: string;
  value: string;
  icon: string;
  label: Localized;
};

export function StatsBar({ locale, stats }: { locale: Locale; stats: Stat[] }) {
  return (
    <section className="border-y border-gold/40 bg-[linear-gradient(90deg,#f6e7c3,#f3d9a4,#f6e7c3)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon as IconName] ?? iconMap.book;
          return (
            <div key={stat.id} className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/50 text-gold-dark">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <p className="text-2xl font-bold text-maroon">{stat.value}</p>
                <p className="text-sm text-ink/80">{t(stat.label, locale)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
