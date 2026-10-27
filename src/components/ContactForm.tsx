"use client";

import { useId, useRef, useState } from "react";
import { t } from "@/lib/content";
import type { Locale, Localized } from "@/lib/types";

const TO_EMAIL = "Info@satkaival.in";

async function sendWithFormSubmit(payload: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      _subject: `Kaival Gyanpith website: message from ${payload.name}`,
      _template: "box",
      _captcha: "false",
      _replyto: payload.email,
    }),
  });
  const result = (await response.json()) as { success?: string | boolean; message?: string };
  const ok =
    result.success === true ||
    result.success === "true" ||
    /activat/i.test(result.message ?? "");
  if (!response.ok || !ok) {
    throw new Error("formsubmit failed");
  }
}

type Ui = {
  name: Localized;
  email: Localized;
  phone: Localized;
  message: Localized;
  send: Localized;
  formSuccessTitle: Localized;
  formSuccess: Localized;
  formError: Localized;
  formOk: Localized;
};

export function ContactForm({ locale, ui }: { locale: Locale; ui: Ui }) {
  const formRef = useRef<HTMLFormElement>(null);
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; fallback?: string };
      if (!response.ok) throw new Error("send failed");
      if (result.fallback === "formsubmit") {
        await sendWithFormSubmit(payload);
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form
        ref={formRef}
        className="space-y-4 rounded-xl border border-gold/30 bg-white p-6 shadow-sm"
        onSubmit={onSubmit}
      >
        <Field label={t(ui.name, locale)} name="name" required />
        <Field label={t(ui.email, locale)} name="email" type="email" required />
        <Field label={t(ui.phone, locale)} name="phone" />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <label className="block text-sm font-medium">
          {t(ui.message, locale)}
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 outline-none focus:border-maroon"
          />
        </label>
        {status === "error" ? (
          <p className="text-sm text-maroon">{t(ui.formError, locale)}</p>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-maroon py-3 font-semibold text-white hover:bg-maroon-hover disabled:opacity-70"
        >
          {status === "sending" ? "…" : t(ui.send, locale)}
        </button>
      </form>

      {status === "success" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setStatus("idle")}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-gold/40 bg-white p-6 text-center shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="text-xl font-bold text-maroon">
              {t(ui.formSuccessTitle, locale)}
            </p>
            <p className="mt-3 text-ink/80">{t(ui.formSuccess, locale)}</p>
            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-maroon py-2.5 font-semibold text-white hover:bg-maroon-hover"
              onClick={() => setStatus("idle")}
            >
              {t(ui.formOk, locale)}
            </button>
          </div>
        </div>
      ) : null}
    </>
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
