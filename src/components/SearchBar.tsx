"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search, X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SearchSuggestions } from "@/components/SearchSuggestions";
import { t } from "@/lib/content";
import {
  getAuthorIdsForCategory,
  resolveAuthorForCategory,
  suggestBooks,
  toLibraryHref,
  type BookQuery,
} from "@/lib/filter-books";
import type { Book, Locale, Localized } from "@/lib/types";

const LIVE_FILTER_DELAY_MS = 300;

type Option = { id: string; label: Localized };
type Filters = {
  chips: Option[];
  dropdowns: {
    categories: Option[];
    authors: Option[];
    authorsByCategory?: Record<string, string[]>;
    types: Option[];
  };
};
type Ui = {
  search: Localized;
  searchPlaceholder: Localized;
  noResults: Localized;
};

function authorsForCategory(authors: Option[], category: string): Option[] {
  const allowed = getAuthorIdsForCategory(category);
  if (!allowed) return authors;
  const allowedSet = new Set(["all", ...allowed]);
  return authors.filter((option) => allowedSet.has(option.id));
}

export function SearchBar({
  locale,
  filters,
  ui,
  books,
}: {
  locale: Locale;
  filters: Filters;
  ui: Ui;
  books: Book[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listId = useId();
  const [queryText, setQueryText] = useState(searchParams.get("q") ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const focused = useRef(false);
  const liveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const category = searchParams.get("category") ?? "all";
  const author = resolveAuthorForCategory(category, searchParams.get("author") ?? "all");
  const type = searchParams.get("type") ?? "all";
  const isLibrary = pathname === "/library";

  const authorOptions = useMemo(
    () => authorsForCategory(filters.dropdowns.authors, category),
    [filters.dropdowns.authors, category],
  );

  const suggestions = useMemo(
    () => suggestBooks(books, { q: queryText, category, author, type }),
    [books, queryText, category, author, type],
  );

  useEffect(() => {
    if (!focused.current) setQueryText(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(
    () => () => {
      if (liveTimer.current) clearTimeout(liveTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId]);

  function apply(next: BookQuery) {
    const href = toLibraryHref(next);
    if (isLibrary) {
      router.replace(href, { scroll: false });
    } else {
      router.push(href);
    }
  }

  function changeQuery(value: string) {
    setQueryText(value);
    setOpen(true);
    setActiveIndex(-1);
    if (!isLibrary) return;
    if (liveTimer.current) clearTimeout(liveTimer.current);
    liveTimer.current = setTimeout(
      () => apply(current({ q: value })),
      LIVE_FILTER_DELAY_MS,
    );
  }

  function openBook(book: Book) {
    setOpen(false);
    router.push(`/read/${book.slug}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, -1));
    } else if (event.key === "Enter" && open && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault();
      openBook(suggestions[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function current(overrides: BookQuery = {}): BookQuery {
    return {
      q: queryText,
      category,
      author,
      type,
      ...overrides,
    };
  }

  function setCategory(nextCategory: string) {
    apply(
      current({
        category: nextCategory,
        author: resolveAuthorForCategory(nextCategory, author),
      }),
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <form
        className="flex flex-col rounded-xl border border-[#e8dcc8] bg-white shadow-[0_8px_28px_rgba(84,16,24,0.08)] md:flex-row md:items-center"
        onSubmit={(event) => {
          event.preventDefault();
          if (liveTimer.current) clearTimeout(liveTimer.current);
          setOpen(false);
          apply(current({ q: queryText }));
        }}
      >
        <div className="relative flex min-w-0 flex-[2] items-center gap-3 px-5 py-3.5">
          <Search className="h-5 w-5 shrink-0 text-[#8a7a6a]" />
          <input
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            className="min-w-0 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-[#a3988c]"
            placeholder={t(ui.searchPlaceholder, locale)}
            value={queryText}
            onChange={(event) => changeQuery(event.target.value)}
            onFocus={() => {
              focused.current = true;
              setOpen(true);
            }}
            onClick={() => setOpen(true)}
            onBlur={() => {
              focused.current = false;
              setOpen(false);
              setActiveIndex(-1);
            }}
            onKeyDown={onKeyDown}
          />
          {queryText ? (
            <button
              type="button"
              aria-label="Clear"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => changeQuery("")}
              className="shrink-0 rounded-full p-1 text-[#8a7a6a] hover:bg-cream hover:text-maroon"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          {open ? (
            <SearchSuggestions
              id={listId}
              books={suggestions}
              query={queryText}
              locale={locale}
              activeIndex={activeIndex}
              emptyLabel={t(ui.noResults, locale)}
              onHover={setActiveIndex}
              onSelect={openBook}
            />
          ) : null}
        </div>
        <Select
          options={filters.dropdowns.categories}
          locale={locale}
          value={category}
          onChange={setCategory}
        />
        <Select
          options={authorOptions}
          locale={locale}
          value={author}
          onChange={(value) => apply(current({ author: value }))}
        />
        <Select
          options={filters.dropdowns.types}
          locale={locale}
          value={type}
          onChange={(value) => apply(current({ type: value }))}
        />
        <div className="shrink-0 p-2">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#7B181B] px-6 text-sm font-semibold text-white hover:bg-[#641216]"
          >
            <Search className="h-4 w-4" />
            {t(ui.search, locale)}
          </button>
        </div>
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {filters.chips.map((chip) => {
          const active = category === chip.id || (chip.id === "all" && category === "all");
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setCategory(chip.id)}
              className={
                active
                  ? "rounded-full bg-maroon px-4 py-1.5 text-sm text-white"
                  : "rounded-full border border-gold/50 bg-white px-4 py-1.5 text-sm text-ink hover:border-maroon hover:text-maroon"
              }
            >
              {t(chip.label, locale)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Select({
  options,
  locale,
  value,
  onChange,
}: {
  options: Option[];
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full shrink-0 border-t border-[#eee3d4] px-4 py-2 md:w-[180px] md:border-t-0 md:border-l">
      <select
        className="h-11 w-full appearance-none bg-transparent pr-7 text-[15px] text-[#4a3f36] outline-none"
        value={options.some((option) => option.id === value) ? value : "all"}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {t(option.label, locale)}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#8a7a6a]"
        strokeWidth={1.75}
      />
    </div>
  );
}
