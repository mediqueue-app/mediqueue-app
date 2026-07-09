# MediQueue — Hasta Paneli (web-patient)

Profesyonel bir B2C sağlık pazaryeri arayüzü. Hastalar semptom, şehir ve tarihe
göre akredite klinikleri ve uzman doktorları keşfeder, şeffaf fiyatlarla anında
randevu talebi oluşturur.

## Teknoloji

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **lucide-react** (kurumsal / medikal ikonlar)

## Marka

- Ana renk: `#3a6ad6` (Medikal Mavi)
- Hover: `#2f57b3`
- Açık ton: `#eaf0fc`

## Kurulum

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3002` adresinde çalışır.

```bash
npm run build   # production derlemesi
npm run start   # production sunucusu
npm run lint    # eslint
```

## Sayfalar

| Rota | Açıklama |
| --- | --- |
| `/` | Ana sayfa: hero + gölgeli arama barı, tedaviler, öne çıkan klinik & doktorlar, nasıl çalışır |
| `/treatments` | Tedavi kategorileri |
| `/clinics` | Klinik keşfet (arama + filtre) |
| `/clinics/[id]` | Klinik detay: galeri, yapışkan sekmeler, yapışkan randevu widget'ı |
| `/doctors` | Doktor keşfet (arama + filtre) |
| `/doctors/[id]` | Doktor profili: biyografi, eğitim, diller, yorumlar + yapışkan randevu widget'ı |
| `/how-it-works` | Nasıl çalışır |

## Klasör Yapısı

```
src/
  app/            # rotalar (App Router)
  components/     # UI bileşenleri (layout, home, clinics, doctors, booking, ui)
  lib/            # mock-data.ts, utils.ts
```

> Not: Görseller Unsplash (klinik fotoğrafları) ve randomuser.me (doktor
> portreleri) üzerinden servis edilir; isim–cinsiyet eşleşmesi elle
> doğrulanmıştır. Yükleme hatasında zarif bir yedek gösterilir.
