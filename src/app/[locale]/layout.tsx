import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Crimson_Text,
  Noto_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Serif_Gujarati,
} from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { getCategories, getSite } from "@/lib/content";
import type { Locale } from "@/lib/types";

const gujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-gujarati",
  weight: ["400", "500", "600", "700"],
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});

const latin = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  weight: ["400", "500", "600", "700"],
});

const serifGujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-serif-gujarati",
  weight: ["400", "600", "700"],
});

const serifLatin = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-serif-latin",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kaival Gyanpith",
  description: "Digital Library of Gyan Sampraday Granths",
};

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
      </body>
    </html>
  );
}
