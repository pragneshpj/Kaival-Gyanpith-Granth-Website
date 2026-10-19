import localFont from "next/font/local";

export const gujarati = localFont({
  src: [
    { path: "../fonts/noto-sans-gujarati-gujarati-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-sans-gujarati-gujarati-500-normal.woff2", weight: "500" },
    { path: "../fonts/noto-sans-gujarati-gujarati-600-normal.woff2", weight: "600" },
    { path: "../fonts/noto-sans-gujarati-gujarati-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-gujarati",
  display: "swap",
});

export const devanagari = localFont({
  src: [
    { path: "../fonts/noto-sans-devanagari-devanagari-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-sans-devanagari-devanagari-500-normal.woff2", weight: "500" },
    { path: "../fonts/noto-sans-devanagari-devanagari-600-normal.woff2", weight: "600" },
    { path: "../fonts/noto-sans-devanagari-devanagari-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-devanagari",
  display: "swap",
});

export const latin = localFont({
  src: [
    { path: "../fonts/noto-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/noto-sans-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/noto-sans-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-latin",
  display: "swap",
});

export const serifGujarati = localFont({
  src: [
    { path: "../fonts/noto-serif-gujarati-gujarati-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-serif-gujarati-gujarati-600-normal.woff2", weight: "600" },
    { path: "../fonts/noto-serif-gujarati-gujarati-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-serif-gujarati",
  display: "swap",
});

export const serifLatin = localFont({
  src: [
    { path: "../fonts/crimson-text-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/crimson-text-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/crimson-text-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-serif-latin",
  display: "swap",
});
