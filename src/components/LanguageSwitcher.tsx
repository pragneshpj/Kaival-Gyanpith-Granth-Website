"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";

type Language = { code: string; label: string };

export function LanguageSwitcher({ languages }: { languages: Language[] }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const current = languages.find((item) => item.code === locale) ?? languages[0];

  return (
    <label className="relative inline-flex items-center gap-1.5 text-sm text-ink">
      <Globe className="h-4 w-4 text-maroon" />
      <select
        className="cursor-pointer appearance-none bg-transparent pr-5 font-medium outline-none"
        value={locale}
        aria-label="Language"
        onChange={(event) => {
          router.replace(pathname, { locale: event.target.value as Locale });
        }}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 text-[10px] text-muted">
        {current ? "" : null}▾
      </span>
    </label>
  );
}
