"use client";

import { useSearchParams } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { filterBooks } from "@/lib/filter-books";
import { t } from "@/lib/content";
import type { Book, Locale, Localized } from "@/lib/types";

type Option = { id: string; label: Localized };
type Filters = {
  chips: Option[];
  dropdowns: {
    categories: Option[];
    authors: Option[];
    types: Option[];
  };
};

export function LibraryCatalog({
  books,
  locale,
  filters,
  ui,
}: {
  books: Book[];
  locale: Locale;
  filters: Filters;
  ui: {
    search: Localized;
    searchPlaceholder: Localized;
    read: Localized;
    pdf: Localized;
    noResults: Localized;
  };
}) {
  const searchParams = useSearchParams();
  const filtered = filterBooks(books, {
    q: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "all",
    author: searchParams.get("author") ?? "all",
    type: searchParams.get("type") ?? "all",
  });

  return (
    <>
      <section className="py-10">
        <SearchBar locale={locale} filters={filters} ui={ui} />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-gold/30 bg-white px-6 py-16 text-center text-muted">
            {t(ui.noResults, locale)}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} locale={locale} ui={ui} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}