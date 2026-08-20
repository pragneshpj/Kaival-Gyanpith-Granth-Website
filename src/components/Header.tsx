"use client";

import { Search } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type NavItem = {
  id: string;
  href: string;
  label: Localized;
};

type Site = {
  brand: { gujarati: string; english: string };
  languages: { code: string; label: string }[];
  nav: NavItem[];
};

export function Header({ locale, site }: { locale: Locale; site: Site }) {
  const pathname = usePathname();

  return (
    <header className="site-header sticky top-0 z-40 border-b-2 border-[#D4AF37] bg-[#FEF9E7]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Logo gujarati={site.brand.gujarati} english={site.brand.english} />

        <div className="flex items-center gap-7 lg:gap-10">
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={
                    active
                      ? "font-serif text-[16px] font-semibold text-[#7B181B]"
                      : "font-serif text-[16px] font-normal text-[#333333] transition-colors hover:text-[#7B181B]"
                  }
                >
                  {item.label.en}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/library"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37] text-[#4A4A4A]"
              aria-label={t(site.nav[1].label, locale)}
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <LanguageSwitcher languages={site.languages} />
          </div>
        </div>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-t border-[#D4AF37]/40 px-5 py-2.5 lg:hidden">
        {site.nav.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={
                active
                  ? "whitespace-nowrap font-serif text-[14px] font-semibold text-[#7B181B]"
                  : "whitespace-nowrap font-serif text-[14px] font-normal text-[#333333]"
              }
            >
              {item.label.en}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
