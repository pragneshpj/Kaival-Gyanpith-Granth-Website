import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Site = {
  brand: { logo: string; footerLogo: string; footerEmblem: string; gujarati: string; english: string };
  nav: { id: string; href: string; label: Localized }[];
  ui: { privacy: Localized; terms: Localized };
  contact: { address: Localized; phone: string; email: string };
  social: { id: string; href: string; label: string }[];
  footer: {
    about: Localized;
    quickLinksTitle: Localized;
    collectionTitle: Localized;
    contactTitle: Localized;
    followUs: Localized;
    copyright: Localized;
  };
};

type Category = {
  id: string;
  href: string;
  title: Localized;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2L17 12h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM9.8 15.6V8.8l6.2 3.4-6.2 3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8ZM17.4 7.1a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
    </svg>
  );
}

const socialIcon = {
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
};

export function Footer({
  locale,
  site,
  categories,
}: {
  locale: Locale;
  site: Site;
  categories: Category[];
}) {
  return (
    <footer className="bg-maroon-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Logo compact src={site.brand.footerLogo} alt={site.brand.gujarati} />
          <p className="mt-4 text-sm leading-6 text-white/80">{t(site.footer.about, locale)}</p>
          <div className="mt-5 flex gap-3">
            {site.social.map((item) => {
              const Icon = socialIcon[item.id as keyof typeof socialIcon] ?? FacebookIcon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-gold hover:text-maroon-dark"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">{t(site.footer.quickLinksTitle, locale)}</h3>
          <ul className="space-y-2 text-sm text-white/85">
            {site.nav.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-gold">
                  {t(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">{t(site.footer.collectionTitle, locale)}</h3>
          <ul className="space-y-2 text-sm text-white/85">
            {categories.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="hover:text-gold">
                  {t(item.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">{t(site.footer.contactTitle, locale)}</h3>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {t(site.contact.address, locale)}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="mb-4 font-semibold text-gold">{t(site.footer.followUs, locale)}</p>
          <Image
            src={site.brand.footerEmblem}
            alt=""
            width={180}
            height={180}
            className="mx-auto h-36 w-36 object-contain opacity-90"
          />
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>{t(site.footer.copyright, locale)}</p>
          <p>
            {t(site.ui.privacy, locale)} | {t(site.ui.terms, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
