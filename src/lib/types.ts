export type Locale = "en" | "gu" | "hi";

export type Localized = {
  gu: string;
  hi: string;
  en: string;
};

export type Book = {
  id: string;
  slug: string;
  cover: string;
  pdf: string;
  featured: boolean;
  categoryId: string;
  authorId: string;
  literatureTypeId: string;
  title: Localized;
  author: Localized;
  tag: Localized;
  excerpt: Localized;
};

export type BookQuery = {
  q?: string;
  category?: string;
  author?: string;
  type?: string;
};
