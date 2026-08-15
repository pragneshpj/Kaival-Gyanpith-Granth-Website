import { Link } from "@/i18n/navigation";
import { iconMap, type IconName } from "./Icons";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

export function LiteratureCard({
  locale,
  icon,
  title,
  count,
  booksLabel,
  viewLabel,
  href,
}: {
  locale: Locale;
  icon: string;
  title: Localized;
  count: string;
  booksLabel: Localized;
  viewLabel: Localized;
  href: string;
}) {
  const Icon = iconMap[icon as IconName] ?? iconMap.book;

  return (
    <article className="card-lift rounded-xl border border-gold/30 bg-parchment p-5 text-center">
      <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-bold text-ink">{t(title, locale)}</h3>
      <p className="mt-1 text-xs text-muted">
        {count} {t(booksLabel, locale)}
      </p>
      <Link href={href} className="mt-3 inline-block text-sm font-semibold text-maroon">
        {t(viewLabel, locale)} →
      </Link>
    </article>
  );
}
