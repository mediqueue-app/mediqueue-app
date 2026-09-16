# Web App Router: history push / replace

Tüm hasta, klinik, doktor ve admin uygulamalarında overlay’ler
`useHistoryLayer` ile kapanır. Geri tuşu çıkış yaptırmaz, formu toptan
sıfırlamaz, boş sayfada bırakmaz.

## Ne zaman `router.replace`

- Login / kayıt başarısı
- Zaten oturumluyken login sayfasına gelince hedefe atlama
- `AuthGuard` → `login?next=`
- Logout sonrası login
- Liste filtreleri ve paylaşılabilir query (`?q=`, `?city=`, `?spec=`, `?id=`, `?patient=`)

## Ne zaman `router.push` / `<Link>`

- Liste → detay (klinik, doktor, hasta kartı)
- Randevu widget’ından login (geri kaynak kliniğe dönsün; başarı `replace`)
- Dashboard sayfaları arası menü

## Overlay

`useHistoryLayer(open, onClose)` dummy `pushState` basar. UI kapatışı
`history.back()` kullanır. `open` React ile düşerse sahte kayıt
`history.back()` ile temizlenir (başka overlay tetiklenmez).

Çok adımlı form: açık adımlar **tek** katman (`time || confirmed`); adım
değişince ikinci `pushState` basılmaz.
