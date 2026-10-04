"use client";

import Image from "next/image";
import { t } from "@/lib/content";
import type { Book, Locale } from "@/lib/types";

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-gold/30 text-ink">{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  );
}

export function SearchSuggestions({
  id,
  books,
  query,
  locale,
  activeIndex,
  emptyLabel,
  onHover,
  onSelect,
}: {
  id: string;
  books: Book[];
  query: string;
  locale: Locale;
  activeIndex: number;
  emptyLabel: string;
  onHover: (index: number) => void;
  onSelect: (book: Book) => void;
}) {
  return (
    <div className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-xl border border-[#e8dcc8] bg-white shadow-[0_16px_40px_rgba(84,16,24,0.14)]">
      {books.length === 0 ? (
        <p className="px-5 py-4 text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul id={id} role="listbox" className="max-h-80 overflow-y-auto py-2">
          {books.map((book, index) => {
            const active = index === activeIndex;
            return (
              <li
                key={book.id}
                id={`${id}-${index}`}
                role="option"
                aria-selected={active}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => onHover(index)}
                onClick={() => onSelect(book)}
                className={`flex cursor-pointer items-center gap-3 px-4 py-2 ${
                  active ? "bg-cream" : ""
                }`}
              >
                <Image
                  src={book.cover}
                  alt=""
                  width={30}
                  height={40}
                  className="h-10 w-[30px] shrink-0 rounded-sm border border-gold/20 object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    <Highlight text={t(book.title, locale)} query={query} />
                  </span>
                  <span className="block truncate text-xs text-muted">
                    <Highlight text={t(book.author, locale)} query={query} />
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
