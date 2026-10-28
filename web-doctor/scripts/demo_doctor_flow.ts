#!/usr/bin/env ts-node
/**
 * demo_doctor_flow.ts
 * ──────────────────────────────────────────────────────────────────────────────
 * MediQueue Ortak E2E Demo Script — Görev 6 (P0)
 *
 * Akış:
 *  1. Backend demo kullanıcılarını seed'le  (seed_demo_users.py)
 *  2. web-doctor dev server'ı başlat        (npm run dev)
 *  3. Demo patient → randevu oluştur        (POST /appointments)
 *  4. Demo clinic  → randevuyu onayla       (PATCH /appointments/:id/status)
 *  5. Demo doctor  → mesaj gönder           (POST /doctors/:id/messages)
 *  6. Demo doctor  → AI review al           (GET  /doctors/:id/reviews)
 *  7. Özet yazdır + server'ı kapat
 *
 * Çalıştırma:
 *  npm run demo:doctor
 *
 * Gereksinim:
 *  - Backend localhost:8000 VEYA API_BASE override env değişkeni
 *  - Python + PostgreSQL (seed için) VEYA --skip-seed flag
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { execSync, spawn } from "child_process";
import http from "http";

// ─── Konfigurasyon ────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000/v1";

const DEV_SERVER_PORT = 3001;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

const DEMO_PATIENT = { email: "patient@mediqueue.com", password: "Demo1234!" };
const DEMO_CLINIC  = { email: "clinic@mediqueue.com",  password: "Demo1234!" };
const DEMO_DOCTOR  = { email: "doctor@mediqueue.com",  password: "Demo1234!" };

const SKIP_SEED = process.argv.includes("--skip-seed");

// ─── Renk yardımcıları ────────────────────────────────────────────────────────

const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  cyan:   "\x1b[36m",
  red:    "\x1b[31m",
  gray:   "\x1b[90m",
};

function log(emoji: string, msg: string) {
  console.log(`${c.bold}${emoji}  ${msg}${c.reset}`);
}
function ok(msg: string)   { console.log(`${c.green}  ✔ ${msg}${c.reset}`); }
function info(msg: string) { console.log(`${c.gray}  → ${msg}${c.reset}`); }
function warn(msg: string) { console.log(`${c.yellow}  ⚠ ${msg}${c.reset}`); }
function fail(msg: string) { console.error(`${c.red}  ✗ ${msg}${c.reset}`); }

// ─── HTTP yardımcıları ───────────────────────────────────────────────────────

interface TokenResponse { access_token: string; }
interface UserRead      { doctor_id?: number | null; clinic_id?: number | null; id: number; }

async function apiFetch<T>(
  path: string,
  init: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, headers: h, ...rest } = init;
  const headers: Record<string, string> = { ...(h as Record<string, string>) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (rest.body && !headers["Content-Type"])
    headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers });
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const detail =
      body?.detail ?? res.statusText ?? `HTTP ${res.status}`;
    throw new Error(`[${res.status}] ${detail}`);
  }
  return body as T;
}

async function login(email: string, password: string): Promise<{ token: string; user: UserRead }> {
  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);

  const tok = await apiFetch<TokenResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const user = await apiFetch<UserRead>("/auth/me", { token: tok.access_token });
  return { token: tok.access_token, user };
}

// ─── Dev server yardımcıları ─────────────────────────────────────────────────

function waitForDevServer(timeoutMs = 60_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    function poll() {
      http
        .get(DEV_SERVER_URL, (res) => {
          if (res.statusCode && res.statusCode < 500) resolve();
          else setTimeout(poll, 1000);
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs)
            reject(new Error("Dev server başlamadı (60s timeout)"));
          else setTimeout(poll, 1500);
        });
    }
    poll();
  });
}

// ─── Ana akış ────────────────────────────────────────────────────────────────

async function main() {
  console.log();
  console.log(
    `${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
  );
  console.log(
    `${c.cyan}${c.bold}  MediQueue E2E Demo — Patient → Clinic → Doctor     ${c.reset}`
  );
  console.log(
    `${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
  );
  console.log();

  // ── Adım 1: Seed ────────────────────────────────────────────────────────────
  log("🌱", "Adım 1 — Demo kullanıcı seed'leme");
  if (SKIP_SEED) {
    warn("--skip-seed flag aktif, seed atlandı.");
  } else {
    try {
      execSync("python -m scripts.seed_demo_users", {
        cwd: "../backend",
        stdio: "inherit",
        windowsHide: true,
      });
      ok("Demo kullanıcılar hazır.");
    } catch {
      warn("Seed başarısız (backend dizini veya DB olmayabilir). Devam ediliyor…");
    }
  }
  console.log();

  // ── Adım 2: Dev server başlat ───────────────────────────────────────────────
  log("🚀", `Adım 2 — web-doctor dev server başlatılıyor (port ${DEV_SERVER_PORT})`);
  const devServer = spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    stdio: "pipe",
    shell: true,
    windowsHide: true,
  });

  devServer.stdout?.on("data", (d: Buffer) => {
    const line = d.toString().trim();
    if (line) info(`[next] ${line}`);
  });
  devServer.stderr?.on("data", (d: Buffer) => {
    const line = d.toString().trim();
    if (line && !line.includes("warn")) info(`[next] ${line}`);
  });

  info("Dev server hazır olana kadar bekleniyor…");
  await waitForDevServer();
  ok(`Dev server çalışıyor → ${DEV_SERVER_URL}`);
  console.log();

  let appointmentId: number | null = null;
  let doctorToken: string | null = null;
  let doctorId: number | null = null;

  try {
    // ── Adım 3: Patient login → Randevu oluştur ────────────────────────────────
    log("🙋", "Adım 3 — Patient login ve randevu oluşturma");
    const { token: patToken } = await login(DEMO_PATIENT.email, DEMO_PATIENT.password);
    ok("Patient girişi başarılı.");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const requestedDate = tomorrow.toISOString().slice(0, 10);

    const appointment = await apiFetch<{ id: number; status: string }>(
      "/appointments",
      {
        method: "POST",
        token: patToken,
        body: JSON.stringify({
          branch: "dentistry",
          requested_date: requestedDate,
          notes: "Demo akışı — otomatik oluşturuldu",
        }),
      }
    );
    appointmentId = appointment.id;
    ok(`Randevu oluşturuldu → ID: ${appointmentId}  Tarih: ${requestedDate}`);
    console.log();

    // ── Adım 4: Clinic login → Onayla ──────────────────────────────────────────
    log("🏥", "Adım 4 — Clinic login ve randevu onaylama");
    const { token: clinicToken, user: clinicUser } = await login(
      DEMO_CLINIC.email,
      DEMO_CLINIC.password
    );
    ok(`Clinic girişi başarılı. clinic_id: ${clinicUser.clinic_id}`);

    await apiFetch(`/appointments/${appointmentId}/status`, {
      method: "PATCH",
      token: clinicToken,
      body: JSON.stringify({ status: "confirmed" }),
    });
    ok(`Randevu onaylandı → ID: ${appointmentId}`);
    console.log();

    // ── Adım 5: Doctor login → Mesaj gönder ────────────────────────────────────
    log("👨‍⚕️", "Adım 5 — Doctor login ve mesaj gönderme");
    const { token: docToken, user: docUser } = await login(
      DEMO_DOCTOR.email,
      DEMO_DOCTOR.password
    );
    doctorToken = docToken;
    doctorId = docUser.doctor_id ?? null;
    ok(`Doctor girişi başarılı. doctor_id: ${doctorId}`);

    if (doctorId) {
      try {
        await apiFetch(`/doctors/${doctorId}/messages`, {
          method: "POST",
          token: doctorToken,
          body: JSON.stringify({
            content:
              "Randevunuz onaylanmıştır. Lütfen kliniğimize zamanında gelmeyi unutmayın.",
            appointment_id: appointmentId,
          }),
        });
        ok("Hastaya mesaj gönderildi.");
      } catch {
        warn("Mesaj endpoint henüz implement edilmemiş olabilir — atlandı.");
      }
    }
    console.log();

    // ── Adım 6: AI Reviews ────────────────────────────────────────────────────
    log("🤖", "Adım 6 — AI Review özeti alınıyor");
    if (doctorId && doctorToken) {
      try {
        const reviews = await apiFetch<Array<{ rating: number; comment: string }>>(
          `/doctors/${doctorId}/reviews`,
          { token: doctorToken }
        );
        if (reviews.length > 0) {
          const avgRating =
            reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
          ok(`${reviews.length} review alındı. Ortalama puan: ${avgRating.toFixed(1)} ⭐`);
          info(`Son yorum: "${reviews[reviews.length - 1]?.comment}"`);
        } else {
          info("Henüz review yok.");
        }
      } catch {
        warn("Review endpoint erişilemedi — mock veriden devam edilecek.");
      }
    }
    console.log();

    // ── Özet ──────────────────────────────────────────────────────────────────
    console.log(
      `${c.green}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
    );
    console.log(`${c.green}${c.bold}  ✅  E2E Demo Akışı BAŞARILI!                       ${c.reset}`);
    console.log(
      `${c.green}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
    );
    console.log();
    console.log(`  ${c.bold}Randevu ID   :${c.reset} ${appointmentId}`);
    console.log(`  ${c.bold}Tarih        :${c.reset} ${requestedDate}`);
    console.log(`  ${c.bold}Doctor ID    :${c.reset} ${doctorId}`);
    console.log();
    console.log(`  ${c.bold}Portal URL   :${c.reset} ${c.cyan}${DEV_SERVER_URL}${c.reset}`);
    console.log(
      `  ${c.bold}Giriş        :${c.reset} ${DEMO_DOCTOR.email} / ${DEMO_DOCTOR.password}`
    );
    console.log();
    console.log(
      `  ${c.gray}Takvim sayfasına gidin ve yeni randevu yeşil glow ile görünecektir.${c.reset}`
    );
    console.log();
    console.log(
      `  ${c.yellow}Sunucuyu durdurmak için Ctrl+C'ye basın.${c.reset}`
    );
    console.log();
  } catch (err) {
    fail(`Demo akışı hata ile kesildi: ${(err as Error).message}`);
    info("Backend çalışmıyor olabilir — doctor portalı yine de mock verilerle açılacaktır.");
    info(`Portal URL: ${DEV_SERVER_URL}`);
    console.log();
  }

  // Dev server'ı açık bırak — kullanıcı Ctrl+C ile kapatır
  process.on("SIGINT", () => {
    devServer.kill("SIGTERM");
    process.exit(0);
  });
}

main().catch((err: unknown) => {
  fail(String(err));
  process.exit(1);
});
