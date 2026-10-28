# Furkan — M1 Go-Live Raporu

**Kapsam:** `web-marketing`, `web-admin`, `web-patient`
**Kapsam dışı (dokunulmadı):** `web-clinic`, `web-doctor`, `backend/`, `ai/`, `docker/`, `docker-compose.yml`, `.github/`

Rapor satırı: Furkan → CTO.
“Bitti” ilanı CTO’ya aittir; bu belge yalnızca teslim raporudur.

---

## Özet tablo

| Madde | Durum |
|--------|--------|
| Canonical www only | DONE |
| Marketing Secure cookies | DONE |
| Admin noindex | DONE |
| Admin prod lock | DONE |
| Patient Secure locale | DONE |
| Mock clinic list closed | NOT IN M1 |
| Playwright CI | NOT IN M1 |
| Vercel env confirmed | EXTERNAL CHANGE REQUIRED |

---

## Beş soru

**1. Pazarlama çerezi HTTPS’de Secure mı?**
Evet. Her iki yazım da (`analytics consent` ve `locale`) sayfa `https:` üzerinden
servis edildiğinde `; Secure` alır. `http://localhost` ve SSR’de eklenmez.

**2. Admin indexlenir mi?**
Hayır. `robots.txt` → `Disallow: /`, her yanıtta
`X-Robots-Tag: noindex, nofollow, noarchive`, layout metadata’sında
`robots: { index: false, follow: false, nocache: true }`. Production’da zaten
403 dönüyor.

**3. Mock admin development’ta duruyor mu?**
Evet, bilinçli. `npm run dev` kilitten etkilenmez; panel localhost:3003’te
açılır. Kilit yalnızca `NODE_ENV === "production"` için geçerlidir.

**4. Hasta mock M1’de kapandı mı?**
Hayır — beklenen. `web-patient/src/lib/services/clinics.ts` diffsiz.
F4 mock kapatma `REQUIRES SEPARATE MILESTONE (FURKAN M2)`.

**5. Production host değişti mi?**
Hayır. `PRODUCTION_SITE_URL` hâlâ `https://www.getmediqueue.com`. Değişen tek
şey host allowlist’inin daralması ve production fallback’inin www’ye sabitlenmesi.

---

## F1 — Pazarlama çerez + canonical

### Host allowlist daraltıldı

`web-marketing/src/lib/site.ts` içindeki allowlist artık yalnız iki host:

```ts
const PRODUCTION_HOSTS = ["getmediqueue.com", "www.getmediqueue.com"];
```

`mediqueue.co` ve `www.mediqueue.co` girdileri silindi. Geri eklenmeyecek.

### Production fallback www’ye sabitlendi

Eski davranışta `NEXT_PUBLIC_SITE_URL` tanımsızsa `resolveSiteUrl` sessizce
`http://localhost:3004` döndürüyordu; bu, env eksik bir production build’inde
canonical/OG/sitemap’in localhost’u işaret etmesi demekti. Artık production
build’inde tanımsız **veya** allowlist dışı her değer `www.getmediqueue.com`’a
düşer. Development’ta localhost korunur.

Doğrulanmış çözümleme matrisi (`resolveSiteUrl`):

| `NEXT_PUBLIC_SITE_URL` | production | sonuç |
|---|---|---|
| `https://getmediqueue.com` | evet | `https://www.getmediqueue.com` |
| `https://www.getmediqueue.com` | evet | `https://www.getmediqueue.com` |
| `https://mediqueue.co` | evet | `https://www.getmediqueue.com` |
| `https://www.mediqueue.co` | evet | `https://www.getmediqueue.com` |
| `https://mq-preview-abc.vercel.app` | evet | `https://www.getmediqueue.com` |
| tanımsız | evet | `https://www.getmediqueue.com` |
| geçersiz string | evet | `https://www.getmediqueue.com` |
| tanımsız | hayır | `http://localhost:3004` |
| `http://localhost:3004` | hayır | `http://localhost:3004` |

### Secure çerez kuralı

Tek kaynak: `web-marketing/src/lib/cookie-secure.ts`.

```ts
export function secureCookieSuffix(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}
```

Uygulandığı iki yazım:

| Çerez | Dosya | Sonuç dizesi (HTTPS) |
|---|---|---|
| `mq-analytics` | `src/components/AnalyticsConsent.tsx` → `writeConsent` | `mq-analytics=<v>; path=/; max-age=31536000; SameSite=Lax; Secure` |
| `mq-locale` | `src/lib/locale-cookie.ts` → `localeCookieString` | `mq-locale=<v>; Path=/; Max-Age=31536000; SameSite=Lax; Secure` |

`SameSite=Lax` her iki çerezde de korundu.

Doğrulama çıktısı:

```
https (browser)     helper=[; Secure]
http localhost      helper=[]
no window (SSR)     helper=[]
```

---

## F2 — Admin kilidi

`web-admin` kimlik doğrulaması olmayan bir mock prototip: boş olmayan her
e-posta/şifre giriş yapıyor, oturum jetonu `demo-<timestamp>`, tüm ekranlar
`src/lib/mock-data.ts` okuyor. Bu yüzden katmanlı kilit uygulandı.

| Kontrol | Dosya | Durum |
|---|---|---|
| `Disallow: /` | `src/app/robots.ts` (yeni) | DONE |
| `X-Robots-Tag: noindex, nofollow, noarchive` | `next.config.ts` headers | DONE |
| Metadata `robots: index/follow false` | `src/app/layout.tsx` | DONE |
| Production 403 | `src/proxy.ts` (yeni) | DONE |
| Production kilit ekranı | `src/app/layout.tsx` + `src/components/ConsoleLocked.tsx` | DONE |
| Kilit koşulu | `src/lib/public-access.ts` (yeni) | DONE |
| Görünür mock uyarısı | `src/app/login/page.tsx` | DONE |
| Dağıtım kuralı | `README.md` | DONE |

### Kilit koşulu

```ts
export function isAdminConsoleLocked(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_PUBLIC_ADMIN !== "true"
  );
}
```

Bayrak tanımsızsa kilit **kapalı tarafa** düşer.

### Next 16 notu

Kilit önce `src/middleware.ts` olarak yazıldı; Next 16 bu konvansiyonu deprecate
ettiği için (`middleware-to-proxy`) `src/proxy.ts`’e taşındı. Build çıktısında
`ƒ Proxy (Middleware)` olarak kayıtlı, deprecation uyarısı yok.

### Ölçülen davranış

Gerçek production build çalıştırılarak doğrulandı (`next build` + `next start`).

**Production, `ALLOW_PUBLIC_ADMIN` tanımsız:**

| Rota | Status | Gövde | X-Robots-Tag |
|---|---|---|---|
| `/` | 403 | `This console is not available.` | `noindex, nofollow, noarchive` |
| `/login` | 403 | `This console is not available.` | `noindex, nofollow, noarchive` |
| `/dashboard` | 403 | `This console is not available.` | `noindex, nofollow, noarchive` |
| `/robots.txt` | 200 | `User-Agent: *` / `Disallow: /` | `noindex, nofollow, noarchive` |

`robots.txt` bilinçli olarak 403’ten muaf tutuldu; crawler’ın `Disallow`
kuralını okuyabilmesi indekslenmemeyi güçlendiriyor.

**Production, bayrak yalnızca runtime’da `true` (build’de yoktu):** proxy geçiş
veriyor (200) ama layout build sırasında kilitli prerender edildiği için sayfa
hâlâ kilit ekranını gösteriyor. Yani tek başına runtime bayrağı paneli açmıyor —
savunma katmanı çalışıyor.

**Production, bayrak build + runtime’da `true`:** 200, kilit ekranı yok, mock
uyarısı görünür, `X-Robots-Tag` ve meta `noindex` yerinde.

**Development (`npm run dev`, bayrak yok):** 200, kilit yok, panel çalışıyor,
mock uyarısı görünür, `robots.txt` → `Disallow: /`. Bilinçli.

### Altyapı

`ALLOW_PUBLIC_ADMIN` repoda hiçbir yerde `true` olarak tanımlı değil; grep
sonucu kod dışında sıfır. `docker-compose.yml` ve `docker/` diffsiz. Kasım’ın
ALB’sine admin listener kuralı eklenmedi, public `portal.` DNS kaydı
istenmedi. Kural `web-admin/README.md`’de yazılı.

### Dürüstlük

Login ekranındaki “Gerçek zamanlı gelir analizi” gibi paneli gerçek bir ops
konsolu gibi gösteren ifadeler demo olarak etiketlendi, “Mock prototip” rozeti
ve görünür uyarı eklendi. JWT eklenmedi — o F8/M2.

---

## F3 — Hasta + admin locale

`web-patient/src/lib/ui-locale.ts` ve `web-admin/src/lib/ui-locale.ts` ayrı ayrı
güncellendi; uygulamalar arası paylaşılan modül oluşturulmadı. Her ikisinde de
aynı kural:

```ts
function secureCookieSuffix(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? ";Secure" : "";
}
```

`mq-ui-locale` çerezi HTTPS’de `;Secure` alıyor, `SameSite=Lax` korunuyor.
Path çakışması olmadı, durmaya gerek kalmadı.

---

## Doğrulama

| Kanıt | Sonuç |
|---|---|
| `site.ts` host listesi | 2 host |
| `mediqueue.co` grep (3 uygulama, tüm uzantılar) | **0 hit** |
| İki pazarlama çerez yazımında https Secure | DONE |
| Admin robots `Disallow` + header + production lock | DONE (403 ölçüldü) |
| Patient + admin locale Secure | DONE |
| `web-clinic` / `web-doctor` / `backend` diffsiz | DONE |

Build ve typecheck:

| Uygulama | `tsc --noEmit` | `next build` |
|---|---|---|
| `web-marketing` | temiz | başarılı |
| `web-admin` | temiz | başarılı |
| `web-patient` | temiz | başarılı |

Canlı Vercel E2E bu M1’de çalıştırılmadı (zorunlu değil). Playwright M2. Yeni
test runner eklenmedi.

---

## EXTERNAL CHANGE REQUIRED

Vercel’deki `NEXT_PUBLIC_SITE_URL` değeri bu çalışma sırasında doğrulanamadı
(panel erişimi yok).

Kod tarafı artık güvenli: production build’inde env eksik ya da yanlış olsa bile
canonical `https://www.getmediqueue.com` çıkıyor. Yine de Vercel’de değerin
`https://www.getmediqueue.com` olarak ayarlanması ve `mediqueue.co` içeren eski
bir değer varsa silinmesi isteniyor.

`ALLOW_PUBLIC_ADMIN` hiçbir Vercel/AWS ortamında tanımlanmamalı.

---

## Yapılmayanlar — bilinçli

| Konu | Neden |
|---|---|
| Hasta mock klinik listesi | `REQUIRES SEPARATE MILESTONE (FURKAN M2)` — F4 |
| Playwright CI | `REQUIRES SEPARATE MILESTONE (FURKAN M2)` — F4 |
| Erasure UI | `REQUIRES SEPARATE MILESTONE (FURKAN M2)` — F5, metin Sinem/avukat |
| Aydınlatma metni | `REQUIRES SEPARATE MILESTONE (FURKAN M2)` — F6, lorem yazılmadı |
| Marketing `robots.ts` / `seo.ts` | Index kararı Sinem ile alınmadı — F7, dokunulmadı |
| Admin Demo Day cümlesi + JWT | `REQUIRES SEPARATE MILESTONE (FURKAN M2)` — F8 |
| Klinik AuthGuard, doktor paneli | CTO’da |
| FastAPI, AWS, docker | Kasım’da |
| KVKK hukuki metin | `BLOCKED — CTO` — uydurulmadı |
| Public portal DNS | İstenmedi |
| `mediqueue.co` host | Eklenmedi, eklenmeyecek |

---

## Teslim formu

```
MARKETING SECURE COOKIES: DONE — mq-analytics + mq-locale, https-only, SameSite=Lax korundu
CANONICAL WWW: DONE — allowlist 2 host; production fallback www.getmediqueue.com
MEDIQUEUE.CO IN CODE: NO
ADMIN NOINDEX: DONE — robots Disallow: / + X-Robots-Tag: noindex, nofollow, noarchive + metadata robots
ADMIN PROD LOCK SKELETON: DONE — NODE_ENV=production && ALLOW_PUBLIC_ADMIN!=true => 403 + kilit ekrani; dev calisir
PATIENT MOCK LIST: UNCHANGED (M2)
PRODUCTION MARKETING HOST CHANGED: NO
READY FOR FURKAN M2: YES — F4 mock kapatma + Playwright, F5 erasure UI, F6 aydinlatma, F7 index karari sonrasi robots, F8 admin JWT
RECOMMENDED NEXT STEP: Vercel'de NEXT_PUBLIC_SITE_URL=https://www.getmediqueue.com dogrulansin; ardindan F7 icin Sinem ile index/noindex karari alinsin

REPOSITORY: mediqueue-app
BRANCH: furkan/m1-go-live-hardening
STARTING HEAD: 16e57edbadccb47f58aa8c766799bb5fe064cf63
FINAL COMMIT: 5f565c5705a5660ca1e2a61e754781eb822683bc (kod) + bu rapor commit'i
PUSH PERFORMED: YES — origin furkan/m1-go-live-hardening (main'e push yok, force push yok)
MARKETING FILES:
  web-marketing/src/lib/site.ts
  web-marketing/src/lib/cookie-secure.ts (yeni)
  web-marketing/src/lib/locale-cookie.ts
  web-marketing/src/components/AnalyticsConsent.tsx
ADMIN FILES:
  web-admin/src/app/robots.ts (yeni)
  web-admin/src/proxy.ts (yeni)
  web-admin/src/lib/public-access.ts (yeni)
  web-admin/src/components/ConsoleLocked.tsx (yeni)
  web-admin/src/app/layout.tsx
  web-admin/src/app/login/page.tsx
  web-admin/src/lib/ui-locale.ts
  web-admin/next.config.ts
  web-admin/README.md
PATIENT FILES:
  web-patient/src/lib/ui-locale.ts
FINAL GIT STATUS: clean — yalnizca web-marketing / web-admin / web-patient + docs/go-live;
  web-clinic, web-doctor, backend, ai, docker, docker-compose.yml, .github diffsiz; .env commit edilmedi
```
