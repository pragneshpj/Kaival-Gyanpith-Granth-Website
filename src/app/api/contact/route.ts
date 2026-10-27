import { NextResponse } from "next/server";

const TO_EMAIL = "Info@satkaival.in";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (asText(body.website, 80)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const email = asText(body.email, 160);
  const phone = asText(body.phone, 40);
  const message = asText(body.message, 4000);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const subject = `Kaival Gyanpith website: message from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ fallback: "formsubmit" });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Kaival Gyanpith <beth.t@example.com>",
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error", detail);
      return NextResponse.json({ error: "Could not send the message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Could not send the message." }, { status: 502 });
  }
}
