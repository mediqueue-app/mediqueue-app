import { test, expect, type Page } from "@playwright/test";

/**
 * BOOKING E2E — Randevu oluşturma uçtan uca akışı.
 *
 * Akış: klinik listesi → klinik detayı → tarih & saat seçimi →
 * "Randevu Talebi Oluştur" → başarı/"Bekliyor (pending)" doğrulaması.
 *
 * Kararlılık (anti-flaky) ilkeleri:
 *  - Ağ çağrıları intercept edilir; gerçek backend'e gidilmez.
 *  - Klinik verisi projenin yerel mock'undan gelir (deterministik): klinik
 *    uçları abort edilir → servisler mock fallback'e düşer. Yalnızca
 *    booking'in gerçekten ihtiyaç duyduğu iki uç (`/patients/me`,
 *    `/appointments`) sahte yanıtla karşılanır.
 *  - Elementler `data-testid` ve erişilebilir rol/ad (ARIA) ile seçilir.
 */

// Uygulamanın oturum anahtarları (bkz. src/lib/auth.ts).
const AUTH_TOKEN_KEY = "mq-patient-token";
const AUTH_USER_KEY = "mq-patient-user";

const MOCK_USER = {
  id: 1,
  email: "demo.hasta@mediqueue.test",
  full_name: "Demo Hasta",
  role: "patient",
  clinic_id: null,
  doctor_id: null,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
};

const MOCK_PATIENT = {
  id: 42,
  user_id: 1,
  full_name: "Demo Hasta",
  email: "demo.hasta@mediqueue.test",
  phone: null,
  country: null,
  country_code: null,
  preferred_language: "tr",
  has_health_history: false,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

/** POST /appointments yanıtı — talep "pending" (Bekliyor) statüsünde döner. */
function mockAppointment(body: Record<string, unknown>) {
  return {
    id: 5001,
    patient_id: MOCK_PATIENT.id,
    clinic_id: body.clinic_id ?? 1,
    doctor_id: body.doctor_id ?? null,
    branch: body.branch ?? "Genel Muayene",
    requested_date: body.requested_date ?? "2026-07-15",
    alternative_date: null,
    status: "pending",
    notes: body.notes ?? null,
    patient_name: MOCK_PATIENT.full_name,
    doctor_name: null,
    created_at: "2026-07-09T10:00:00Z",
    updated_at: "2026-07-09T10:00:00Z",
  };
}

/** Oturumu enjekte eder ve tüm `/v1/**` çağrılarını intercept eder. */
async function setupSessionAndMocks(page: Page) {
  // Oturumu başlat: isAuthenticated() sessionStorage token'ına bakar.
  await page.addInitScript(
    ({ tokenKey, userKey, user }) => {
      sessionStorage.setItem(tokenKey, "e2e-fake-token");
      sessionStorage.setItem(userKey, JSON.stringify(user));
    },
    { tokenKey: AUTH_TOKEN_KEY, userKey: AUTH_USER_KEY, user: MOCK_USER }
  );

  await page.route("**/v1/**", async (route) => {
    const request = route.request();
    const url = request.url();
    const method = request.method();

    // Hasta profili — createAppointment öncesi çağrılır.
    if (url.includes("/patients/me")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_PATIENT),
      });
      return;
    }

    // Randevu oluşturma — asıl booking çağrısı.
    if (method === "POST" && /\/appointments$/.test(new URL(url).pathname)) {
      const payload = request.postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(mockAppointment(payload ?? {})),
      });
      return;
    }

    // Klinik uçları vb. — abort et; servisler yerel mock verisine düşer.
    await route.abort();
  });
}

test.describe("Booking (randevu oluşturma) akışı", () => {
  test("hasta klinik seçip tarih/saat ile randevu talebi oluşturur", async ({
    page,
  }) => {
    await setupSessionAndMocks(page);

    // (a) Klinik listesine git.
    await page.goto("/clinics");

    // (b) Bookable kliniği (apiId=1 → /clinics/1) seç ve detayına gir.
    const clinicLink = page.locator('a[href="/clinics/1"]').first();
    await expect(clinicLink).toBeVisible();
    await clinicLink.click();

    // Detay sayfası + booking modülü yüklendi mi?
    await expect(page).toHaveURL(/\/clinics\/1$/);
    const submit = page.getByTestId("booking-submit");
    await expect(submit).toBeVisible();

    // (c) Uygun bir tarih ve saat seç.
    await page.getByTestId("booking-day-15").click();
    await page.getByTestId("booking-time-10:00").click();

    // Buton, saat seçilince aktif metnine geçmeli.
    await expect(submit).toBeEnabled();
    await expect(submit).toContainText("Randevu Talebi Oluştur");

    // (d) "Randevu Talebi Oluştur" butonuna tıkla.
    await submit.click();

    // (e) Başarı ekranı + "Bekliyor (pending)" statüsü doğrulaması.
    const success = page.getByTestId("booking-success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("Randevu Talebiniz Alındı");
    await expect(success).toContainText("Durum: pending");
    await expect(success).toContainText("15 Temmuz 2026");
  });
});
