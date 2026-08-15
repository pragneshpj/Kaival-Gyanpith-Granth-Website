import { defineRouting } from "next-intl/routing";

export const locales = ["gu", "hi", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "gu",
  localePrefix: "always",
  localeDetection: false,
});
