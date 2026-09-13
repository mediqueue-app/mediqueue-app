# MEDIQUEUE — Web Marketing Platform (`web-marketing`)

Uluslararası sağlık turizmi odaklı **MediQueue** platformunun modern pazarlama web sitesi ve müşteri edinme (lead capture) uygulaması.

Next.js 16 App Router (Turbopack), Tailwind CSS, TypeScript ve Framer Motion kullanılarak geliştirilmiştir.

---

## 🚀 Öne Çıkan Özellikler

- **Çoklu Dil Desteği (TR / EN)**: Server & Client uyumlu dinamik i18n altyapısı.
- **Canlı Önizleme Kartları & Demo Paneller**: İnteraktif klinik, doktor ve hasta yönetim gösterimleri.
- **Canlı Lead & Webhook Entegrasyonu**: Form gönderimleri Zapier Catch Hook üzerinden anlık Gmail bildirimi tetikler.
- **Google Analytics 4 (GA4)**: `G-TT7VXLHRQF` kimliği ile `<Script>` entegrasyonu.
- **100% SEO Hazırlığı**: Dinamik metadata, hreflang etiketleri, Open Graph, Twitter Cards, Schema.org JSON-LD ve XML Sitemap.
- **Performanslı & Erişilebilir UI**: Tailwind CSS, Lucide ikonları ve Framer Motion animasyonları.

---

## 📁 Proje Klasör Yapısı

```
web-marketing/
├── public/                  # Statik medya görselleri (logo, kurucu fotoğrafları, favicons)
└── src/
    ├── app/                 # Next.js App Router (Sayfalar, API uç noktaları, Sitemap, Robots)
    │   ├── api/leads/       # Zapier Webhook entegrasyonu ve talep alma servisi
    │   ├── clinics/         # Klinikler landing sayfası
    │   ├── doctors/         # Doktorlar landing sayfası
    │   ├── patients/        # Hastalar landing sayfası
    │   ├── how-it-works/    # Sistem nasıl çalışır sayfası
    │   ├── team/            # Kurucular & Hakkımızda sayfası
    │   ├── contact/         # İletişim sayfası
    │   ├── opengraph-image  # Dinamik Open Graph sosyal medya görseli
    │   ├── robots.ts        # Dynamic robots.txt
    │   └── sitemap.ts       # Dynamic sitemap.xml
    ├── components/          # Modüler UI bileşenleri
    │   ├── about/           # Hakkımızda ve kurucu kartları
    │   ├── clinics/         # Klinikler modülleri & karşılaştırma tabloları
    │   ├── doctors/         # Doktorlar modülleri & takvim önizlemeleri
    │   ├── home/            # Ana sayfa hero ve eşleşme modülü
    │   ├── modals/          # Lead başvuru modalı
    │   ├── patients/        # Hastalar modülleri & akış adımları
    │   ├── product/         # İnteraktif ürün panelleri
    │   ├── sections/        # Navbar, Footer, FAQ
    │   └── ui/              # Temel tasarım sistem bileşenleri (Button, Input, DemoCaptionPill)
    ├── content/             # Dil sözlükleri (tr.ts, en.ts, previews.ts, types.ts)
    └── lib/                 # SEO, site konfigürasyonu, i18n ve webhook helpers
```

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın
`.env.example` dosyasını `.env.local` olarak kopyalayın:
```bash
cp .env.example .env.local
```

Gerekli değişkenler:
- `LEADS_WEBHOOK_URL`: Zapier veya webhook servis adresi
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Ölçüm Kimliği (`G-TT7VXLHRQF`)
- `NEXT_PUBLIC_SITE_URL`: Canlı veya yerel site adresi (`http://localhost:3004`)

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev -- --port 3004
```

### 4. Derleme & Tip Kontrolü (TypeScript Check)
```bash
npx tsc --noEmit
npm run build
```
