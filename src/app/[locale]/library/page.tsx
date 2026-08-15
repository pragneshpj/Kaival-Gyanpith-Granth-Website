import { setRequestLocale } from "next-intl/server";
import { BookCard } from "@/components/BookCard";
import { PageHero } from "@/components/PageHero";
import { SearchBar } from "@/components/SearchBar";
import { getBooks, getFilters, getSite, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const site = getSite();
  const books = getBooks();
  const filters = getFilters();
  const libraryNav = site.nav.find((item) => item.id === "library");

  return (
    <>
      <PageHero title={libraryNav ? t(libraryNav.label, locale) : ""} />
      <section className="py-10">
        <SearchBar locale={locale} filters={filters} ui={site.ui} />
      </section>
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 pb-20 sm:grid-cols-3 md:px-8 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} locale={locale} ui={site.ui} />
        ))}
      </section>
    </>
  );
}
