import { setRequestLocale } from "next-intl/server";
import { iconMap, type IconName } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { getAbout, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const about = getAbout();

  return (
    <>
      <PageHero title={t(about.title, locale)} subtitle={t(about.subtitle, locale)} />
      <section className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <p className="text-lg leading-8 text-ink/90">{t(about.intro, locale)}</p>
        <h2 className="mt-12 mb-4 text-2xl font-bold text-maroon">{t(about.missionTitle, locale)}</h2>
        <p className="leading-8 text-muted">{t(about.mission, locale)}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {about.values.map((value) => {
            const Icon = iconMap[value.icon as IconName] ?? iconMap.book;
            return (
              <article
                key={value.id}
                className="rounded-xl border border-gold/30 bg-parchment p-6"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-ink">{t(value.title, locale)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{t(value.text, locale)}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
