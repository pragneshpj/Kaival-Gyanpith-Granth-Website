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
    <article className="card-lift rounded-xl border border-gold/30 bg-[#fff8ea] p-6">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="text-lg font-bold text-ink">{t(title, locale)}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{t(description, locale)}</p>
      <Link href={href} className="mt-4 inline-flex text-sm font-semibold text-maroon">
        {t(viewLabel, locale)} →
      </Link>
    </article>
  );
}
