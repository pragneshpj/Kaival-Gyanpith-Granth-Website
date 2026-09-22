import type { Book, BookQuery } from "./types";
import filters from "../../content/filters.json";

export type { BookQuery };

const authorsByCategory = filters.dropdowns.authorsByCategory as
  | Record<string, string[]>
  | undefined;

export function getAuthorIdsForCategory(category?: string): string[] | null {
  if (!category || category === "all") return null;
  const allowed = authorsByCategory?.[category];
  return allowed?.length ? allowed : null;
}

export function resolveAuthorForCategory(category?: string, author?: string): string {
  const value = author && author !== "all" ? author : "all";
  if (value === "all") return "all";
  const allowed = getAuthorIdsForCategory(category);
  if (!allowed) return value;
  return allowed.includes(value) ? value : "all";
}

function haystack(book: Book): string {
  return [
    book.id,
    book.slug,
    book.categoryId,
    book.authorId,
    ...(book.authorIds ?? []),
    book.literatureTypeId,
    ...Object.values(book.title),
    ...Object.values(book.author),
    ...Object.values(book.tag),
    ...Object.values(book.excerpt),
  ]
    .join(" ")
    .toLowerCase();
}

export function getBookAuthorIds(book: Book): string[] {
  if (book.authorIds?.length) return book.authorIds;
  return book.authorId ? [book.authorId] : [];
}

export function filterBooks(books: Book[], query: BookQuery): Book[] {
  const q = query.q?.trim().toLowerCase() ?? "";
  const category = query.category && query.category !== "all" ? query.category : "";
  const author = resolveAuthorForCategory(query.category, query.author);
  const authorFilter = author !== "all" ? author : "";
  const type = query.type && query.type !== "all" ? query.type : "";

  return books.filter((book) => {
    if (category && book.categoryId !== category) return false;
    if (authorFilter && !getBookAuthorIds(book).includes(authorFilter)) return false;
    if (type && book.literatureTypeId !== type) return false;
    if (q && !haystack(book).includes(q)) return false;
    return true;
  });
}

export function toLibraryHref(query: BookQuery): string {
  const params = new URLSearchParams();
  if (query.q?.trim()) params.set("q", query.q.trim());
  if (query.category && query.category !== "all") params.set("category", query.category);
  const author = resolveAuthorForCategory(query.category, query.author);
  if (author !== "all") params.set("author", author);
  if (query.type && query.type !== "all") params.set("type", query.type);
  const qs = params.toString();
  return qs ? `/library?${qs}` : "/library";
}
