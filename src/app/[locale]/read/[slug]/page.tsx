import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getBookBySlug, getBooks, getPdfEmbedUrl, getSite, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBooks().map((book) => ({ locale, slug: book.slug })),
  );
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);

  const book = getBookBySlug(slug);
  if (!book) notFound();
  const site = getSite();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <Link href="/library" className="text-sm font-semibold text-maroon">
        ← {t(site.ui.backToLibrary, locale)}
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <Image
          src={book.cover}
          alt={t(book.title, locale)}
          width={220}
          height={300}
          className="w-full rounded-lg border border-gold/30 object-cover"
        />
        <div>
          <span className="inline-block rounded bg-maroon px-2 py-0.5 text-xs text-white">
            {t(book.tag, locale)}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-ink">{t(book.title, locale)}</h1>
          <p className="mt-2 text-muted">{t(book.author, locale)}</p>
          <p className="mt-4 leading-7 text-ink/80">{t(book.excerpt, locale)}</p>
          <a
            href={book.pdf}
            target={book.pdf.startsWith("http") ? "_blank" : undefined}
            rel={book.pdf.startsWith("http") ? "noreferrer" : undefined}
            download={book.pdf.startsWith("http") ? undefined : true}
            className="mt-6 inline-flex rounded-lg border border-maroon px-4 py-2 text-sm font-semibold text-maroon"
          >
            {t(site.ui.downloadPdf, locale)}
          </a>
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-xl border border-gold/30 bg-white">
        <iframe
          title={t(book.title, locale)}
          src={getPdfEmbedUrl(book.pdf)}
          className="h-[80vh] w-full"
          allow="autoplay"
        />
      </div>
    </section>
  );
}
