# MediQueue — Doktor Portalı (`web-doctor`)

Doktorların günlük iş akışını yönettiği web arayüzü. **Ay 1 kapsamında gösterilebilir bir prototiptir:** mock veriyle çalışır, backend'e bağlı değildir, gerçek kimlik doğrulama yoktur.

Amaç; klinik görüşmelerinde, mentöre ve Demo Day provalarında doktor deneyimini uçtan uca göstermektir.

## Teknolojiler

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- lucide-react

## Hızlı Başlangıç

```powershell
cd web-doctor
npm install
npm run dev
```

Uygulama **http://localhost:3001** adresinde açılır.

Production build:

```powershell
npm run build
npm run start
```

## Demo Akışı

Önerilen sunum sırası:

```
/login → Özet → Hastalarım → [Hasta detay / Odontogram] → Takvim → Mesajlar → Profil → Çıkış
```

- Ana sayfa (`/`) otomatik olarak `/login`'e yönlendirir.
- Giriş ekranında herhangi bir e-posta/şifre ile "Giriş Yap" tıklanabilir; dashboard'a yönlendirir.
- Odontogram göstermek için diş branşlı bir hasta seçin (ör. mock veride `branch: "dentistry"`).

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/login` | Giriş ekranı (dekoratif auth) |
| `/dashboard` | Bugünün programı, KPI, hasta kuyruğu, son aktiviteler |
| `/dashboard/patients` | Hasta listesi — arama, filtre, sayfalama |
| `/dashboard/patients/[id]` | Hasta detay — 4 sekme (bilgi, randevu geçmişi, yolculuk, tıbbi kayıt) |
| `/dashboard/calendar` | Haftalık/aylık takvim, müsaitlik düzenleme |
| `/dashboard/messages` | Hasta–doktor mesajlaşma arayüzü |
| `/dashboard/profile` | Profil düzenleme (mock kaydet) |

## Ay 1 Kapsamı

### Dahil

- 7 sayfa, tıklanabilir navigasyon, mock veri
- Hasta detay: 7 adımlı tedavi yolculuğu, odontogram (FDI), diş bazlı tedavi geçmişi
- KVKK'ya duyarlı arayüz metinleri (mock veri üzerinde)
- `lib/services/` katmanı — ileride gerçek API'ye geçiş için hazır yapı

### Bilinçli olarak dahil değil

- Gerçek backend / JWT auth
- Fatura, komisyon, klinik yönetimi, personel (doktor sadece kendi hastasına odaklanır)
- Kalıcı mesajlaşma, gerçek zamanlı çeviri
- Gerçek randevu zamanlaması

## Proje Yapısı

```
web-doctor/
├── src/
│   ├── app/                    # Next.js App Router sayfaları
│   ├── components/
│   │   ├── calendar/           # Takvim, müsaitlik editörü
│   │   ├── dashboard/          # Özet widget'ları
│   │   ├── messages/           # Chat listesi ve penceresi
│   │   ├── patients/           # Hasta listesi, detay, odontogram
│   │   └── shared/             # Sidebar, TopBar, StatusBadge
│   ├── lib/
│   │   ├── mock-data.ts        # Mock hasta, randevu, mesaj verisi
│   │   ├── mock-dental-records.ts
│   │   ├── dental.ts           # FDI numaralandırma yardımcıları
│   │   └── services/           # Veri erişim katmanı (şimdilik mock)
│   └── types/                  # TypeScript tipleri
└── package.json
```

## Veri Katmanı

Component'ler doğrudan mock dosyalarına bağlanmaz. `lib/services/` altındaki fonksiyonlar kullanılır:

- `patients.ts` — `fetchPatients`, `fetchPatientById`
- `appointments.ts` — `fetchTodayAppointments`, `fetchCalendarAppointments`
- `messages.ts` — `fetchChatThreads`, `fetchQuickStats`, vb.

Ay 2'de bu fonksiyonların içi `fetch` ile backend API çağrılarına dönüştürülecek; component'lere dokunmaya gerek kalmayacak.

## Ay 2 Planı (özet)

- Backend auth entegrasyonu (JWT, session, route middleware)
- Hasta, randevu, mesaj API'lerinin backend'de oluşturulması
- `lib/services/*` fonksiyonlarının gerçek endpoint'lere bağlanması
- CORS: backend'e `http://localhost:3001` eklenmesi

## İlgili Dokümantasyon

- Monorepo genel bakış: [`../README.md`](../README.md)
- Backend API: [`../backend/README.md`](../backend/README.md)
- AI eşleştirme: [`../ai/README.md`](../ai/README.md)
