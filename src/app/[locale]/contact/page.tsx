import { Mail, MapPin, Phone } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getContactPage, getSite, t } from "@/lib/content";
import type { Locale } from "@/lib/types";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  setRequestLocale(locale);
  const site = getSite();
  const page = getContactPage();

  return (
    <>
      <PageHero title={t(page.title, locale)} subtitle={t(page.subtitle, locale)} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8">
        <div>
          <p className="mb-8 leading-7 text-muted">{t(page.intro, locale)}</p>
          <ul className="space-y-5 text-ink">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 text-maroon" />
              <a
                href={site.contact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-maroon"
              >
                {t(site.contact.address, locale)}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 text-maroon" />
              <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 text-maroon" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
          </ul>
        </div>
        <ContactForm locale={locale} ui={site.ui} />
      </section>
    </>
  );
}
