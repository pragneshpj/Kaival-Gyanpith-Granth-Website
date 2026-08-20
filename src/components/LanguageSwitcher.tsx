"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/types";

type Language = { code: string; label: string };

export function LanguageSwitcher({ languages }: { languages: Language[] }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="relative inline-flex items-center">
      <select
        className="h-[34px] cursor-pointer appearance-none rounded-[6px] border border-[#C5A059] bg-transparent py-0 pr-8 pl-3 font-serif text-[14px] font-normal text-[#5c4033] outline-none"
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
      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-[#5c4033]" strokeWidth={1.75} />
    </label>
  );
}
