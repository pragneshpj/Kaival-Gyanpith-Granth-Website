import type { Book, Locale, Localized } from "./types";
import site from "../../content/site.json";
import home from "../../content/home.json";
import filters from "../../content/filters.json";
import categories from "../../content/categories.json";
import literature from "../../content/literature.json";
import books from "../../content/books.json";
import about from "../../content/about.json";
import contact from "../../content/contact.json";

export function t(value: Localized, locale: Locale): string {
  return value[locale] || value.en;
}

export function getSite() {
  return site;
}

export function getHome() {
  return home;
}

export function getFilters() {
  return filters;
}

export function getCategories() {
  return categories;
}

export function getLiterature() {
  return literature;
}

export function getBooks(): Book[] {
  return (books as Book[]).filter((book) => !book.hidden);
}

export function getFeaturedBooks() {
  return getBooks().filter((book) => book.featured);
}

export function getBookBySlug(slug: string) {
  return getBooks().find((book) => book.slug === slug);
}

export function getPdfEmbedUrl(pdf: string) {
  const match = pdf.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return pdf;
}

export function getAbout() {
  return about;
}

export function getContactPage() {
  return contact;
}
