"use client";

import { useState } from "react";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

type Ui = {
  name: Localized;
  email: Localized;
  phone: Localized;
  message: Localized;
  send: Localized;
  formSuccess: Localized;
};

export function ContactForm({ locale, ui }: { locale: Locale; ui: Ui }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="rounded-xl border border-gold/40 bg-white p-6 text-center text-maroon">
        {t(ui.formSuccess, locale)}
      </p>
    );
  }

  return (
    <form
      className="space-y-4 rounded-xl border border-gold/30 bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <Field label={t(ui.name, locale)} name="name" required />
      <Field label={t(ui.email, locale)} name="email" type="email" required />
      <Field label={t(ui.phone, locale)} name="phone" />
      <label className="block text-sm font-medium">
        {t(ui.message, locale)}
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 outline-none focus:border-maroon"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg bg-maroon py-3 font-semibold text-white hover:bg-maroon-hover"
      >
        {t(ui.send, locale)}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
