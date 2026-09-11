import { NextResponse } from "next/server";

type LeadPayload = {
  mode?: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  treatment?: string;
  clinicName?: string;
  city?: string;
  website?: string;
  role?: string;
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
  const mode = body.mode === "clinic" ? "clinic" : "patient";

  if (!name || !isEmail(email) || body.consent !== true) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  if (mode === "patient" && (!body.country?.trim() || !body.treatment)) {
    return NextResponse.json({ error: "Missing patient fields" }, { status: 422 });
  }

  if (mode === "clinic" && (!body.clinicName?.trim() || !body.city?.trim())) {
    return NextResponse.json({ error: "Missing clinic fields" }, { status: 422 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    mode,
    name,
    email,
    phone: body.phone?.trim() || null,
    country: body.country?.trim() || null,
    treatment: body.treatment || null,
    clinicName: body.clinicName?.trim() || null,
    city: body.city?.trim() || null,
    website: body.website?.trim() || null,
    role: body.role || null,
    message: body.message?.trim() || null,
  };

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!forwarded.ok) {
      return NextResponse.json({ error: "Webhook failed" }, { status: 502 });
    }
  } else {
    console.info("[mediqueue-lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
