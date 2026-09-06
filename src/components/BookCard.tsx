import Image from "next/image";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

export type Book = {
  slug: string;
  cover: string;
  pdf: string;
  title: Localized;
  author: Localized;
  tag: Localized;
};

type Ui = {
  read: Localized;
  pdf: Localized;
};

export function BookCard({
  book,
  locale,
  ui,
}: {
  book: Book;
  locale: Locale;
  ui: Ui;
}) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-gold/25 bg-parchment shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
        <Image
          src={book.cover}
          alt={t(book.title, locale)}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 210px"
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <span className="mb-2 inline-flex w-fit rounded bg-maroon px-2 py-0.5 text-[11px] font-medium text-white">
          {t(book.tag, locale)}
        </span>
        <h3 className="text-[15px] font-bold leading-snug text-ink">{t(book.title, locale)}</h3>
        <p className="mt-1 text-xs text-muted">{t(book.author, locale)}</p>
        <div className="mt-auto flex gap-2 pt-3">
          <Link
            href={`/read/${book.slug}`}
            className="flex-1 rounded-md bg-maroon py-2 text-center text-xs font-semibold text-white hover:bg-maroon-hover"
          >
            {t(ui.read, locale)}
          </Link>
          <a
            href={book.pdf}
            download
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-maroon/40 py-2 text-xs font-semibold text-maroon hover:bg-cream-dark"
          >
            <Download className="h-3.5 w-3.5" />
            {t(ui.pdf, locale)}
          </a>
        </div>
      </div>
    </article>
  );
}
