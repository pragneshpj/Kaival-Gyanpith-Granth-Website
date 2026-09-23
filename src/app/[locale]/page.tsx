import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookCarousel } from "@/components/BookCarousel";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { SectionTitle } from "@/components/SectionTitle";
import { StatsBar } from "@/components/StatsBar";
import {
  getCategories,
  getFeaturedBooks,
  getFilters,
  getHome,
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
  const featured = getFeaturedBooks();

  return (
    <>
      <Hero locale={locale} home={home} ui={site.ui} />

      <section className="py-12 md:py-16">
        <Suspense>
          <SearchBar locale={locale} filters={filters} ui={site.ui} />
        </Suspense>
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

      <StatsBar locale={locale} stats={site.stats} />
    </>
  );
}
