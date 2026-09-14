import type { Book, BookQuery } from "./types";

export type { BookQuery };

function haystack(book: Book): string {
  return [
    book.id,
    book.slug,
    book.categoryId,
    book.authorId,
    book.literatureTypeId,
    ...Object.values(book.title),
    ...Object.values(book.author),
    ...Object.values(book.tag),
    ...Object.values(book.excerpt),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterBooks(books: Book[], query: BookQuery): Book[] {
  const q = query.q?.trim().toLowerCase() ?? "";
  const category = query.category && query.category !== "all" ? query.category : "";
  const author = query.author && query.author !== "all" ? query.author : "";
  const type = query.type && query.type !== "all" ? query.type : "";

  return books.filter((book) => {
    if (category && book.categoryId !== category) return false;
    if (author && book.authorId !== author) return false;
    if (type && book.literatureTypeId !== type) return false;
    if (q && !haystack(book).includes(q)) return false;
    return true;
  });
}

export function toLibraryHref(query: BookQuery): string {
  const params = new URLSearchParams();
  if (query.q?.trim()) params.set("q", query.q.trim());
  if (query.category && query.category !== "all") params.set("category", query.category);
  if (query.author && query.author !== "all") params.set("author", query.author);
  if (query.type && query.type !== "all") params.set("type", query.type);
  const qs = params.toString();
  return qs ? `/library?${qs}` : "/library";
}