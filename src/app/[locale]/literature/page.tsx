import { setRequestLocale } from "next-intl/server";
import { iconMap, type IconName } from "@/components/Icons";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { getLiterature, getSite, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export default async function LiteraturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const site = getSite();
  const literature = getLiterature();
  const nav = site.nav.find((item) => item.id === "literature");

  return (
    <>
      <PageHero title={nav ? t(nav.label, locale) : ""} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {literature.map((item) => {
          const Icon = iconMap[item.icon as IconName] ?? iconMap.book;
          return (
            <article
              key={item.id}
              className="card-lift rounded-xl border border-gold/30 bg-parchment p-6"
            >
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-bold text-ink">{t(item.title, locale)}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.count} {t(site.ui.booksCount, locale)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{t(item.description, locale)}</p>
              <Link href="/library" className="mt-4 inline-block text-sm font-semibold text-maroon">
                {t(site.ui.view, locale)} →
              </Link>
            </article>
          );
        })}
      </section>
    </>
  );
}
