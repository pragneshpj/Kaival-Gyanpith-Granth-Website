import Image from "next/image";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { t } from "@/lib/content";
import type { Book, Locale, Localized } from "@/lib/types";

export type { Book };

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
  const title = t(book.title, locale);
  const detailHref = `/read/${book.slug}`;

  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-gold/25 bg-parchment shadow-sm">
      <Link href={detailHref} className="flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <Image
            src={book.cover}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 210px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col p-3 pb-0">
          <span className="mb-2 inline-flex w-fit rounded bg-maroon px-2 py-0.5 text-[11px] font-medium text-white">
            {t(book.tag, locale)}
          </span>
          <h3 className="text-[15px] font-bold leading-snug text-ink">{title}</h3>
          <p className="mt-1 text-xs text-muted">{t(book.author, locale)}</p>
        </div>
      </Link>
      <div className="flex gap-2 p-3">
        <Link
          href={detailHref}
          className="flex-1 rounded-md bg-maroon py-2 text-center text-xs font-semibold text-white hover:bg-maroon-hover"
        >
          {t(ui.read, locale)}
        </Link>
        <a
          href={book.pdf}
          target={book.pdf.startsWith("http") ? "_blank" : undefined}
          rel={book.pdf.startsWith("http") ? "noreferrer" : undefined}
          download={book.pdf.startsWith("http") ? undefined : true}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-maroon/40 py-2 text-xs font-semibold text-maroon hover:bg-cream-dark"
        >
          <Download className="h-3.5 w-3.5" />
          {t(ui.pdf, locale)}
        </a>
      </div>
    </article>
  );
}
