import { NextResponse } from "next/server";

type LeadPayload = {
  mode?: string;
  source?: string;
  formType?: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  treatment?: string;
  clinicName?: string;
  city?: string;
  website?: string;
  role?: string;
  topic?: string;
  message?: string;
  consent?: boolean;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  // Basic required fields: name, valid email, consent
  if (!name || !isEmail(email) || body.consent !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  // Determine mode, form type, and origin source
  const isClinicLead =
    body.mode === "clinic" || Boolean(body.clinicName?.trim()) || body.role === "clinic" || body.role === "doctor";

  const mode = isClinicLead ? "clinic" : "patient";

  const formSource = body.source?.trim() || (body.topic ? "İletişim Sayfası (/contact)" : "Modal Formu");

  let formType = body.formType?.trim();
  if (!formType) {
    if (isClinicLead) {
      formType = "Klinik / Doktor Kaydı Formu";
    } else if (body.topic) {
      formType = "İletişim Sayfası Mesajı";
    } else {
      formType = "Hasta Talebi Formu";
    }
  }

  const leadTitle = `[MEDIQUEUE LEAD] ${formType.toUpperCase()} - ${name}`;

  // Use clean string fallbacks ("-") instead of null to prevent Zapier email template errors
  const lead = {
    receivedAt: new Date().toISOString(),
    leadTitle,
    formType,
    source: formSource,
    mode,
    name,
    email,
    phone: body.phone?.trim() || "-",
    country: body.country?.trim() || "-",
    treatment: body.treatment?.trim() || body.topic?.trim() || "-",
    clinicName: body.clinicName?.trim() || "-",
    city: body.city?.trim() || "-",
    website: body.website?.trim() || "-",
    role: body.role || "-",
    topic: body.topic?.trim() || "-",
    message: body.message?.trim() || "-",
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(12_000),
        body: JSON.stringify(lead),
      });
      if (!forwarded.ok) {
        return NextResponse.json({ error: "Webhook failed" }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ error: "Webhook failed" }, { status: 504 });
    }
  } else {
    console.info("[mediqueue-lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
