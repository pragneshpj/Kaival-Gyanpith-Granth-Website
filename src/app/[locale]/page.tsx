import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookCarousel } from "@/components/BookCarousel";
import { CategoryCard } from "@/components/CategoryCard";
import { LiteratureCard } from "@/components/LiteratureCard";
import { ScrollIcon } from "@/components/Icons";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsBar } from "@/components/StatsBar";
import {
  getCategories,
  getFeaturedBooks,
  getFilters,
  getHome,
  getLiterature,
  getSite,
  t,
} from "@/lib/content";
import type { Locale } from "@/lib/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const site = getSite();
  const home = getHome();
  const filters = getFilters();
  const categories = getCategories();
  const literature = getLiterature();
  const featured = getFeaturedBooks();

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div>
          <p className="mb-3 font-semibold text-maroon">{t(home.eyebrow, locale)}</p>
          <h1 className="text-3xl font-bold leading-tight text-maroon md:text-5xl">
            {t(home.title, locale)}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">{t(home.description, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white hover:bg-maroon-hover"
            >
              {t(site.ui.viewBooks, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold bg-transparent px-6 py-3 font-semibold text-ink hover:bg-gold/10"
            >
              <ScrollIcon className="h-5 w-5 text-gold-dark" />
              {t(site.ui.handwrittenCta, locale)}
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src={home.heroImage}
            alt={t(home.title, locale)}
            width={1280}
            height={720}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="pb-16">
        <SearchBar locale={locale} filters={filters} ui={site.ui} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <SectionTitle title={t(home.sections.collection, locale)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              locale={locale}
              icon={category.icon}
              title={category.title}
              description={category.description}
              href={category.href}
              viewLabel={site.ui.view}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <SectionTitle
          title={t(home.sections.featured, locale)}
          action={
            <Link href="/library" className="text-sm font-semibold text-maroon">
              {t(site.ui.viewAll, locale)} →
            </Link>
          }
        />
        <BookCarousel books={featured} locale={locale} ui={site.ui} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <SectionTitle title={t(home.sections.literature, locale)} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {literature.map((item) => (
            <LiteratureCard
              key={item.id}
              locale={locale}
              icon={item.icon}
              title={item.title}
              count={item.count}
              booksLabel={site.ui.booksCount}
              viewLabel={site.ui.view}
              href={item.href}
            />
          ))}
        </div>
      </section>

      <StatsBar locale={locale} stats={site.stats} />
    </>
  );
}
