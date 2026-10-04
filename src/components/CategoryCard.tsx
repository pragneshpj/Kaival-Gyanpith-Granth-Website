import { Link } from "@/i18n/navigation";
import { iconMap, type IconName } from "./Icons";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

export function CategoryCard({
  locale,
  icon,
  title,
  description,
  href,
  viewLabel,
}: {
  locale: Locale;
  icon: string;
  title: Localized;
  description: Localized;
  href: string;
  viewLabel: Localized;
}) {
  const Icon = iconMap[icon as IconName] ?? iconMap.book;

  return (
    <Link
      href={href}
      className="group card-lift flex h-full flex-col rounded-xl border border-gold/30 bg-[#fff8ea] p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
    >
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark transition-colors duration-300 group-hover:bg-gold/25">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="text-lg font-bold text-ink transition-colors duration-300 group-hover:text-maroon">
        {t(title, locale)}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{t(description, locale)}</p>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-semibold text-maroon">
        <span className="bg-gradient-to-r from-maroon to-maroon bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1.5px]">
          {t(viewLabel, locale)}
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
