# Tasarım planı — gerçek panellerden

Kaynak: `web-patient`, `web-clinic`, `web-doctor`, `web-admin` globals + navigasyon. Tahmin yok.

## Adım 1 — Gerçek tasarım sistemi

| Rol | Hex | Kaynak |
|---|---|---|
| Primary | `#3a6ad6` | dört panel — “kurumsal medikal mavi” |
| Primary hover | `#2f57b3` | dört panel |
| Primary light | `#eaf0fc` | dört panel |
| Background (hasta) | `#ffffff` | web-patient |
| Background (B2B) | `#f5f6f8` | web-clinic / web-admin |
| Foreground | `#0f172a` | patient/clinic/admin |
| Border | `#e2e8f0` | dört panel |
| Success / warning / danger | `#10b981` / `#f59e0b` / `#ef4444` | clinic/doctor/admin |

**Fontlar (üründen, karakterli çift):**
- Başlık: **Source Serif 4** — `web-doctor` `--font-display`
- Gövde/UI: **Plus Jakarta Sans** — `web-doctor` `--font-jakarta`  
  (Geist/Inter daha generic; pazarlama doktor panelinin display çiftini kullanır, palet tüm panellerle aynı mavi.)

**Radius:** kart `rounded-2xl`, logo/input `rounded-xl`, hasta CTA `rounded-full`.

**Gerçek terimler (uydurma değil):**
- Klinik: Randevu Talepleri, Ön Konsültasyon & Teklifler, Hasta Mesajları, Klinik Profili & Belgeler, Doktor Kadrosu, Finans & Komisyonlar, Dashboard
- Doktor: Özet, Hastalarım, Takvim, Mesajlar, Profil, Bugünün Programı
- Hasta: Arayın & Karşılaştırın → Randevu Alın → Tedavi Olun; Klinikler, Doktorlar, Tedaviler

**Ekran görüntüsü:** Klinik/doktor/admin login duvarı var; canlı screenshot alınamadı. Bunun yerine panel JSX’i (Randevu Talepleri list+detay, KPI kartları, Bugünün Programı, hasta klinik kartı) aynı class/token/etiketlerle gömülüyor. Demo hasta adları panel mock’undan (`Ahmed Al-Farsi`, `Sophie Laurent`…). Canlı PNG isterseniz iletin, yerleştiririm.

## Adım 5 — Layout konseptleri

- **İmza:** Klinik **Randevu Talepleri** kutusu (hero sağında) — gerçek panel düzeni.
- **Ana sayfa:** kısa hero + imza önizleme + 3 kapı (klinik/hasta/doktor sayfalarına). Sonsuz scroll yok.
- **Klinikler / Hastalar / Doktorlar:** kendi sayfa, 1 derin önizleme.
- **Nasıl çalışır:** ürünün 3 adımı + Filter → Score → Rank (numara yalnız burada).
- **Ekip:** kısa grid.

## Checklist özeleştiri

- Krem + kiremit **yok** — ürün mavisi.
- Ana sayfa ortalanmış hero + 3 jenerik kart **değil** — asimetrik hero + gerçek kutu; alttaki 3 blok sayfa kapısı.
- `01/02/03` yalnız **Nasıl çalışır**’da (gerçek sıra).
- Font çifti doktor panelinden, sistem sans değil.
- Tüm sayfalar aynı palet.
- Mesh/orb yok.
