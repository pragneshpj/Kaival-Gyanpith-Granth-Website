"use client";

import { Search } from "lucide-react";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Option = { id: string; label: Localized };
type Filters = {
  chips: Option[];
  dropdowns: {
    categories: Option[];
    authors: Option[];
    types: Option[];
  };
};
type Ui = {
  search: Localized;
  searchPlaceholder: Localized;
};

export function SearchBar({
  locale,
  filters,
  ui,
}: {
  locale: Locale;
  filters: Filters;
  ui: Ui;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <form
        className="flex flex-col overflow-hidden rounded-xl border border-gold/30 bg-white shadow-[0_8px_30px_rgba(84,16,24,0.08)] md:flex-row md:items-stretch"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex flex-1 items-center gap-3 px-4 py-3">
          <Search className="h-5 w-5 text-muted" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
            placeholder={t(ui.searchPlaceholder, locale)}
          />
        </label>
        <Select options={filters.dropdowns.categories} locale={locale} />
        <Select options={filters.dropdowns.authors} locale={locale} />
        <Select options={filters.dropdowns.types} locale={locale} />
        <button
          type="submit"
          className="m-2 inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-semibold text-white hover:bg-maroon-hover"
        >
          <Search className="h-4 w-4" />
          {t(ui.search, locale)}
        </button>
      </form>
      <div className="mt-5 flex flex-wrap gap-2">
        {filters.chips.map((chip, index) => (
          <button
            key={chip.id}
            type="button"
            className={
              index === 0
                ? "rounded-full bg-maroon px-4 py-1.5 text-sm text-white"
                : "rounded-full border border-gold/50 bg-white px-4 py-1.5 text-sm text-ink hover:border-maroon hover:text-maroon"
            }
          >
            {t(chip.label, locale)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Select({ options, locale }: { options: Option[]; locale: Locale }) {
  return (
    <div className="border-t border-cream-dark px-3 py-2 md:border-l md:border-t-0">
      <select className="h-full w-full min-w-[140px] bg-transparent py-2 text-sm text-ink outline-none">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {t(option.label, locale)}
          </option>
        ))}
      </select>
    </div>
  );
}
