# MediQueue — Süperadmin Paneli (`web-admin`)

Platform sahibi için pazar yeri kontrol paneli (başvurular, klinikler, hastalar, destek, ayarlar).

**Durum (Ay 1):** UI prototip — **mock veri**. Backend’de yalnızca `GET /v1/admin/summary` var; applications/onboarding API’si yok. Ay 1 E2E için zorunlu değil.

## Dağıtım kuralı — panel kamuya açılmaz

Bu panelde kimlik doğrulama yok: boş olmayan her e-posta/şifre giriş yapar ve
oturum jetonu `demo-<timestamp>`. Bu yüzden panel public bir adreste servis
edilmez.

Uygulanan kilitler:

| Kontrol | Yer |
|---------|-----|
| `Disallow: /` | `src/app/robots.ts` |
| `X-Robots-Tag: noindex, nofollow, noarchive` | `next.config.ts` headers |
| `robots: { index: false, follow: false }` | `src/app/layout.tsx` metadata |
| Production’da 403 | `src/middleware.ts` |
| Production’da kilit ekranı | `src/app/layout.tsx` + `src/lib/public-access.ts` |

`NODE_ENV === "production"` ve `ALLOW_PUBLIC_ADMIN !== "true"` olduğunda panel
403 döner ve “This console is not available.” ekranını gösterir. Bayrak
tanımsızsa kilit **kapalı tarafa** düşer.

`npm run dev` (development) kilitten etkilenmez; local çalışmaya devam eder.

**Bu env AWS’te tanımlanmaz.** `ALLOW_PUBLIC_ADMIN` ne ALB/ECS task
definition’ına, ne `docker-compose.yml`’a, ne de Vercel projesine `true` olarak
girilir. Admin için ALB listener kuralı veya public `portal.` DNS kaydı
açılmaz. Bu bayrak yalnızca bilinçli, kapalı devre bir demo ortamı için vardır
ve açılması CTO onayına bağlıdır.

## Teknoloji

- Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · lucide-react · Recharts

## Kurulum

```powershell
cd web-admin
npm install
npm run dev
```

→ **http://localhost:3003**

Demo UI login herhangi bir non-empty credential kabul edebilir (mock auth). Backend seed hesabı: `admin@mediqueue.com` / `Demo1234!` — bu panel henüz JWT’ye bağlı değil.

## Modüller (mock)

| Rota | Açıklama |
|------|----------|
| `/login` | Demo giriş |
| `/dashboard` | KPI / özet |
| `/dashboard/applications` | Klinik başvuruları |
| `/dashboard/clinics` | Klinik yönetimi |
| `/dashboard/patients` | Hasta listesi |
| `/dashboard/feedback` | Destek talepleri |
| `/dashboard/settings` | Komisyon / platform ayarları |

Veri: `src/lib/mock-data.ts`

## Ay 2

- JWT + admin role
- Applications / moderation API
- `GET /admin/summary` dashboard’a bağlama

## İlgili

- Monorepo: [`../README.md`](../README.md)
- Backend: [`../backend/README.md`](../backend/README.md)
