"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard, type Book } from "./BookCard";
import type { Locale, Localized } from "@/lib/types";

const EDGE_TOLERANCE = 4;

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

  function scroll(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;

    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = (first?.offsetWidth ?? 280) + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === 1 && el.scrollLeft >= maxScroll - EDGE_TOLERANCE) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && el.scrollLeft <= EDGE_TOLERANCE) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      el.scrollBy({ left: direction * step, behavior: "smooth" });
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-maroon shadow transition-colors hover:bg-maroon hover:text-white md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={scroller}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-1 pb-3"
      >
        {books.map((book) => (
          <div
            key={book.slug}
            className="w-[calc((100%-20px)/1.3)] shrink-0 snap-start sm:w-[calc((100%-40px)/2.3)] md:w-[calc((100%-60px)/3.3)] lg:w-[calc((100%-80px)/4.3)]"
          >
            <BookCard book={book} locale={locale} ui={ui} />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="absolute top-1/2 right-0 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-maroon shadow transition-colors hover:bg-maroon hover:text-white md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
