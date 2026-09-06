"use client";

import { ChevronDown, Search } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <form
        className="flex flex-col rounded-xl border border-[#e8dcc8] bg-white shadow-[0_8px_28px_rgba(84,16,24,0.08)] md:flex-row md:items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex min-w-0 flex-[2] items-center gap-3 px-5 py-3.5">
          <Search className="h-5 w-5 shrink-0 text-[#8a7a6a]" />
          <input
            className="min-w-0 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-[#a3988c]"
            placeholder={t(ui.searchPlaceholder, locale)}
          />
        </label>
        <Select options={filters.dropdowns.categories} locale={locale} />
        <Select options={filters.dropdowns.authors} locale={locale} />
        <Select options={filters.dropdowns.types} locale={locale} />
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
    <div className="relative w-full shrink-0 border-t border-[#eee3d4] px-4 py-2 md:w-[180px] md:border-t-0 md:border-l">
      <select className="h-11 w-full appearance-none bg-transparent pr-7 text-[15px] text-[#4a3f36] outline-none">
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
