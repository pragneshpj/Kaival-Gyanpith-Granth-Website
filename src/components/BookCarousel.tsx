"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard, type Book } from "./BookCard";
import type { Locale, Localized } from "@/lib/types";

export function BookCarousel({
  books,
  locale,
  ui,
}: {
  books: Book[];
  locale: Locale;
  ui: { read: Localized; pdf: Localized };
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    scroller.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white shadow md:flex"
      >
        <ChevronLeft className="h-5 w-5 text-maroon" />
      </button>
      <div
        ref={scroller}
        className="hide-scrollbar flex gap-5 overflow-x-auto px-1 pb-2 pt-1"
      >
        {books.map((book) => (
          <div key={book.slug} className="w-[210px] shrink-0">
            <BookCard book={book} locale={locale} ui={ui} />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="absolute top-1/2 right-0 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white shadow md:flex"
      >
        <ChevronRight className="h-5 w-5 text-maroon" />
      </button>
    </div>
  );
}
