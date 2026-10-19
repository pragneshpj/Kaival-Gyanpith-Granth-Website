import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { getCategories, getSite, t } from "@/lib/content";
import {
  gujarati,
  devanagari,
  latin,
  serifGujarati,
  serifLatin,
} from "@/lib/fonts";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite();
  const name = t(site.brand.name, locale as Locale);
  return {
    title: { default: name, template: `%s | ${name}` },
    description: t(site.footer.about, locale as Locale),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const site = getSite();
  const categories = getCategories();

  return (
    <html
      lang={locale}
      className={`${gujarati.variable} ${devanagari.variable} ${latin.variable} ${serifGujarati.variable} ${serifLatin.variable} h-full antialiased`}
    >
      <body className="page-texture min-h-full font-sans">
        <NextIntlClientProvider locale={locale} messages={{}}>
          <Header locale={locale as Locale} site={site} />
          <main>{children}</main>
          <Footer locale={locale as Locale} site={site} categories={categories} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
