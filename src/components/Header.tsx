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
    <header className="sticky top-0 z-40 border-b border-gold/70 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo gujarati={site.brand.gujarati} english={site.brand.english} />
        <nav className="hidden items-center gap-7 text-[15px] lg:flex">
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
                    ? "font-semibold text-maroon"
                    : "text-ink/80 transition-colors hover:text-maroon"
                }
              >
                {t(item.label, locale)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="rounded-full p-2 text-ink hover:bg-cream-dark"
            aria-label={t(site.nav[1].label, locale)}
          >
            <Search className="h-5 w-5" />
          </Link>
          <LanguageSwitcher languages={site.languages} />
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-gold/30 px-4 py-2 text-sm lg:hidden">
        {site.nav.map((item) => (
          <Link key={item.id} href={item.href} className="whitespace-nowrap text-ink">
            {t(item.label, locale)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
