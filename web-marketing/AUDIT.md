# MEDIQUEUE Marketing Site — Phase 1 Audit

Audit date: 2026-08-27  
Scope: read-only inspection of `web-patient`, `web-clinic`, `web-doctor`, `web-admin`, `ai/`, root tooling. No existing app folders were modified.

---

## 3.1 Monorepo / tooling

| Check | Finding |
|---|---|
| Root `package.json` | Exists. Name `mediqueue-app-main`. **No workspaces field.** Scripts are a stub (`test` echoes error). |
| `pnpm-workspace.yaml` / `turbo.json` / `nx.json` / `lerna.json` | **None** at repo root. |
| Shared packages | **No** `packages/ui`, `packages/design-tokens`, or `shared/` folder. |
| App bootstrapping | Each of `web-patient`, `web-clinic`, `web-doctor`, `web-admin` is an **independent Next.js app** with its own `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`, and `node_modules`. |

**Decision:** `web-marketing` is a **fully standalone Next.js app** with its own lockfile, sibling to the other web apps. It is **not** added to a workspace list because there isn’t one.

Dev ports already in use: clinic `3000`, doctor `3001`, patient `3002`, admin `3003`. Marketing will use **`3004`**.

---

## 3.2 Stack confirmation

All four web apps share the same stack:

| Layer | Value |
|---|---|
| Next.js | **16.2.10**, **App Router** (`src/app/`) |
| React | **19.2.4** |
| TypeScript | **^5**, `strict: true`, path alias `@/*` → `./src/*` |
| Styling | **Tailwind CSS v4** via `@import "tailwindcss"` in `globals.css` + `@theme inline` tokens. **No** `tailwind.config.ts`. PostCSS plugin: `@tailwindcss/postcss`. |
| Icons | **lucide-react** `^1.23.0` |
| Class merging | `clsx` + `tailwind-merge` |
| Animation lib | **framer-motion** only in `web-clinic`. Patient/doctor/admin use CSS keyframes. |
| Charts | `recharts` in clinic + admin (not needed here) |
| i18n | **None.** All UI copy is hardcoded Turkish (`lang="tr"`). No `next-intl` / i18next. |
| ESLint | `eslint-config-next` (core-web-vitals + typescript). Patient adds `@typescript-eslint/no-unused-vars` warn with `_` ignore. **No root ESLint/Prettier/tsconfig.base.** |
| Tests | Web apps have no unit CI. Patient has Playwright. AI has real pytest + GitHub Actions. |

**Decision for `web-marketing`:** Match the stack exactly (Next 16 App Router, React 19, Tailwind v4, TypeScript, lucide-react, clsx/tailwind-merge). Do **not** add framer-motion — CSS + IntersectionObserver keeps the marketing bundle closer to patient/doctor and avoids a third-party animation runtime. Content is structured as `{ en, tr }` so localization can land later without a rewrite; the site ships with a client locale toggle (English default for the international/investor audience).

---

## 3.3 Design token extraction

### Primary accent (identical across all four apps)

| Token | Hex | Notes |
|---|---|---|
| `--color-primary` | `#3a6ad6` | Comment in clinic/admin: “MediQueue kurumsal medikal mavi” |
| `--color-primary-hover` | `#2f57b3` | |
| `--color-primary-light` | `#eaf0fc` | |
| Selection | `#3a6ad633` on `#0f172a` | |

### Neutrals / surfaces

| Token | Patient | Clinic / Admin | Doctor |
|---|---|---|---|
| `--background` | `#ffffff` | `#f5f6f8` | `#eef1f6` |
| `--foreground` | `#0f172a` | `#0f172a` | `#0b1220` |
| `--color-surface` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--color-border` | `#e2e8f0` | `#e2e8f0` | `#e2e8f0` |
| Tailwind slate | Heavy use of `slate-50`–`slate-900` | Same | Same |

**Unification for marketing:** light public theme from **patient** (`#ffffff` page, `#0f172a` text) with **clinic’s** `#f5f6f8` and **doctor’s** `#eef1f6` as layered section bands. Border `#e2e8f0`. This is layered near-white, not flat white.

### Semantic (clinic / doctor / admin; absent in patient globals)

| Token | Hex |
|---|---|
| `--color-success` | `#10b981` |
| `--color-warning` | `#f59e0b` |
| `--color-danger` | `#ef4444` |

### Radius

| Class | Dominant use |
|---|---|
| `rounded-full` | Patient **marketing CTAs**, chips, badges, search bar (desktop) |
| `rounded-2xl` | Cards, modals, booking widget, auth card |
| `rounded-xl` | Logo icon box, inputs, secondary buttons, amenity tiles |
| `rounded-3xl` | Large CTA banners; clinic login card |
| `rounded-[1.5rem]` / `[1.75rem]` | Doctor-only cinematic heroes |

**Unification:** `rounded-full` for primary marketing CTAs (patient public language). `rounded-2xl` for cards. `rounded-xl` for logo mark and inputs. `rounded-3xl` for large editorial bands.

### Spacing / containers

Patient how-it-works and homepage use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Card padding `p-5` / `p-6`. Section vertical rhythm is ad hoc (`py-12`, `mt-16`).

**Unification:** container `max-w-7xl` + the same horizontal padding. Section padding `py-20 md:py-28` for editorial breathing room the product dashboards don’t have (deliberate marketing choice, noted here).

### Typography (inconsistent across apps)

| App | Body | Display |
|---|---|---|
| Patient | **Geist** (`next/font/google`) | — |
| Clinic / Admin | **Inter** | — |
| Doctor | **Plus Jakarta Sans** | **Source Serif 4** (400/600) |

Patient (priority 1 for a public site) uses Geist. Three of four apps use a humanist sans (Inter / Jakarta). Only doctor has a display serif — and it is the most “premium editorial” treatment in the product family.

**Unification (explicit, not silent invention):**
- **Headings:** Source Serif 4 — already in `web-doctor`, matches the luxury-healthcare / editorial north star.
- **Body / UI:** Plus Jakarta Sans — already in `web-doctor`, close cousin of Inter used in clinic/admin, better than Geist for a corporate site.
- Geist is documented as the patient-app choice and is **not** used on the marketing site.

Scale (from spec, mapped onto Tailwind): 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 56 / 72. Body line-height **1.6** (clinic/doctor `globals.css`). Large headings: tight tracking (`-0.03em` to `-0.04em`).

### Shadows / elevation (keep 2–3, all subtle)

| Level | Source | Value used on marketing |
|---|---|---|
| 1 (rest) | Cards: `shadow-sm` | `0 1px 2px rgba(15,23,42,0.05)` |
| 2 (raised) | Booking widget `shadow-md`; doctor `panel-lift` | `0 8px 24px -12px rgba(15,23,42,0.18)` |
| 3 (hover) | Patient cards `hover:shadow-xl`; doctor lift | `0 18px 40px -24px rgba(15,23,42,0.28)` |

Patient cards often combine **border + hover shadow** (not both at rest). Marketing follows that: border at rest, shadow on hover, 2–4px translate, ~200ms ease.

### Buttons (patient public, highest weight)

- **Primary:** `rounded-full bg-[#3a6ad6] text-white font-semibold shadow-sm hover:bg-[#2f57b3]`
- **Secondary (brand outline):** `rounded-xl` or `rounded-full` + `border border-[#3a6ad6] text-[#3a6ad6] hover:bg-[#eaf0fc]`
- **Tertiary:** `text-sm font-semibold text-[#3a6ad6] hover:underline`
- Auth forms use `rounded-xl` (squarer). Marketing CTAs follow the **pill** public language.

### Cards

`rounded-2xl border border-slate-200 bg-white p-5|p-6`. Hover: `-translate-y-1` + soft shadow. Featured: `border-[#3a6ad6]/40 ring-1 ring-[#3a6ad6]/20`. Empty: dashed border.

### Icon set

**lucide-react** everywhere. Patient logo: `Stethoscope`. Clinic: `HeartPulse`. Doctor: `Stethoscope`. Admin: `ShieldCheck`.

### Logo assets

**No SVG/PNG wordmark in any `public/` folder.** Branding is inline JSX:

- Patient (public): `Stethoscope` in `rounded-xl bg-[#3a6ad6]` + wordmark `Medi` + blue `Queue`
- B2B: `MEDI·QUEUE` with a middle dot + role subtitle

**Decision:** Public marketing uses the **patient wordmark** (`MediQueue`) — it is the only consumer-facing lockup. Recreate as a shared `<Logo />` component (SVG-equivalent markup, not a file that doesn’t exist).

### Focus / selection (reuse as-is)

```css
:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
::selection { background-color: #3a6ad633; color: #0f172a; }
```

---

## 3.4 Content / domain extraction

### What a patient can actually do (`web-patient`)

Real routes: `/`, `/treatments`, `/clinics`, `/clinics/[id]`, `/doctors`, `/doctors/[id]`, `/how-it-works`, `/appointments`, `/auth/login`, `/auth/register`.

Confirmed capabilities:
1. **Discover** clinics and doctors — search by treatment/symptom, city, date.
2. **Filter & compare** — city, specialty, amenity chips (JCI, transfer, multilingual, …), sort, clinic/doctor profiles with about, amenities, doctors, reviews, price range.
3. **Request an appointment** — calendar + slots; copy: “Ödeme klinikte alınır — ön ödeme gerekmez”.
4. **Track appointments** — status list; messaging once confirmed.
5. **Auth** — register / login.

How-it-works steps in the product (verbatim):
1. *Arayın & Karşılaştırın* — “Semptom, şehir ve tarihe göre klinik ve doktorları filtreleyin…”
2. *Randevu Alın* — ön ödemesiz randevu talebi
3. *Tedavi Olun* — kliniğe gidin, ödemeyi yerinde yapın

**Do not claim on the marketing site:** fabricated patient counts. The how-it-works CTA currently says “Binlerce akredite klinik” — that is **product copy, not a confirmed metric**, and must not be reused.

### What a clinic can actually do (`web-clinic`)

Root `/` redirects to login (no public landing). Live sidebar capabilities:
- Dashboard overview (requests, visibility, expected revenue)
- Appointment request inbox (approve / reject)
- Pre-consultation quotes
- Patient messages (auto-translate toggle in UI)
- Clinic profile & documents (storefront)
- Doctor roster
- Finance & commissions

**Coming soon / unwired — do not present as live product:** demand forecasts, competitor market chart (both have “Yakında” overlays), sponsorship “Satın Al”, campaign create button.

**Pricing language:** clinic UI shows mock commission figures (e.g. “%15”) and sponsorship €/month packages. Founder brief: **do not publish commission percentages**. Allowed hook: no upfront panel cost — pay when a patient is received. The phrase “free panel / no subscription” is **not in the clinic UI**; it comes from the founder brief and is used generically.

### What a doctor can actually do (`web-doctor`)

Root `/` redirects to login. Live sidebar: Özet, Hastalarım, Takvim, Mesajlar, Profil.
- Day-at-a-glance operations board
- Patient list + dossier
- Calendar / availability
- Messages
- Marketplace profile (bio, languages, certificates)

`/dashboard/schedule` exists in code but is **not in the live sidebar** — do not market it as a distinct product surface.

### Admin (`web-admin`) — not a public audience

Clinic applications, clinic/patient management, support tickets, commission settings. Useful as proof the platform has an operations backbone; **not** a marketing audience section. May appear only as a framed UI fragment in the product showcase, with a demo-data disclaimer.

### Copy / terminology already in product

| Pattern | Where | Marketing implication |
|---|---|---|
| “filtreleyin” | Patient how-it-works step 1 | **Preferred.** Aligns with the legal positioning rule. |
| “sizin için eşleştirildi” | Patient doctors hero | **Do not reuse.** Conflicts with “filters, does not match.” |
| “Hasta eşleştirmesinde” | Doctor profile languages | Internal product copy; **do not surface** on the marketing site. |
| “Yapay Zeka” / AI badges | Clinic forecasts (coming soon) | **Do not claim** clinic AI forecasts as live. |
| AI microservice | `ai/README.md`, `ai/docs/API.md` | Real: FastAPI, **rule-based filter + score + rank**, ~75 pytest tests, `ai-tests.yml` CI. OpenAPI still says “doktor eşleştirmesi” internally — **public copy must say filtering / ranking / structured comparison.** |
| “Türkiye'nin akredite sağlık pazaryeri” | Patient hero badge | Aspirational brand line. Fine qualitatively; **no scale claim.** |
| Privacy | Footer labels only (links go to how-it-works). Login mentions SSL. | Qualitative “patient privacy as a first principle” only. **No GDPR/KVKK compliance claim.** |
| Contact | Footer: `+90 850 000 00 00`, `destek@mediqueue.com`, “Levent, İstanbul” | These look like **placeholders**. Omit from marketing footer until founders confirm. |
| Legal pages | Privacy / Terms / KVKK links are dead (point at `/how-it-works`) | **Omit** legal footer links rather than 404. |

### AI service (engineering-trust point — real)

- Independent Python FastAPI microservice.
- Hard filters (specialty, language, budget) then scores and ranks survivors. **No ML/LLM in current version.**
- ~75 pytest tests; GitHub Actions `ai-tests.yml` with coverage.
- Approved public language: “intelligent filtering,” “structured comparison,” “curated discovery,” “assisted coordination.”
- **Never:** “AI-powered doctor matching,” “AI recommends your doctor.”

---

## Token table (marketing source of truth)

| Category | Value | Source |
|---|---|---|
| Primary | `#3a6ad6` | All four apps |
| Primary hover | `#2f57b3` | All four apps |
| Primary light | `#eaf0fc` | All four apps |
| Background | `#ffffff` | Patient |
| Band / muted | `#f5f6f8` / `#eef1f6` | Clinic, doctor |
| Foreground | `#0f172a` | Patient / clinic |
| Border | `#e2e8f0` | All four apps |
| Success / warning / danger | `#10b981` / `#f59e0b` / `#ef4444` | Clinic / doctor / admin |
| Heading font | Source Serif 4 | Doctor (unified) |
| Body font | Plus Jakarta Sans | Doctor (unified) |
| CTA radius | `rounded-full` | Patient public CTAs |
| Card radius | `rounded-2xl` | All apps |
| Mark radius | `rounded-xl` | Logo boxes |
| Icons | lucide-react | All apps |
| Container | `max-w-7xl` + `px-4 sm:px-6 lg:px-8` | Patient |

Anything not in this table that appears in `web-marketing` is a **deliberate marketing-only choice** and is commented at the point of use (section vertical padding, editorial type scale, custom SVG diagrams).
