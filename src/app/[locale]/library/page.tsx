import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { LibraryCatalog } from "@/components/LibraryCatalog";
import { PageHero } from "@/components/PageHero";
import { getBooks, getFilters, getSite, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const libraryNav = getSite().nav.find((item) => item.id === "library");
  return { title: libraryNav ? t(libraryNav.label, locale as Locale) : undefined };
}

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
      <Suspense>
        <LibraryCatalog
          books={books}
          locale={locale}
          filters={filters}
          ui={site.ui}
        />
      </Suspense>
    </>
  );
}