# Flutter: native izin primer’ı (rationale-first)

Web-first dönemde tarayıcı izni (kamera / konum / bildirim) native OS
diyaloğundan **önce** bir açıklama ekranı gösterir (`PermissionPrimer`).
Aynı kural **Ay 3 native Flutter kabuğa** taşınır. `permission_handler`
veya iOS `requestAuthorization` **doğrudan** çağrılmaz.

**Öncelik:** web-first tamam; native geçiş backlog’u (P2). WebView içinde
Next.js açıldığı sürece tarayıcı primer’ı geçerlidir; native route’larda
bu checklist kullanılır.

## Neden ara ekran

OS diyaloğu bir kez reddedilince iOS’ta yeniden göstermek zordur
(Ayarlar’a yönlendirme). Kullanıcı “neden?” görmeden “Don’t Allow”
derse özellik kapanır. Primer: amaç + veri kapsamı + “Şimdi değil”.

## Eşleme (web → Flutter)

| Web | Flutter | Primer metni (TR örnek) |
| --- | --- | --- |
| Kamera / galeri / dosya (kimlik, belge, klinik foto, sohbet eki) | `Permission.camera` + `Permission.photos` / `Permission.storage` (SDK’ya göre) | “Kimlik belgeni doğrulamak için kamera erişimine ihtiyacımız var.” |
| Konum (hasta harita “Konumumu bul”) | `Permission.locationWhenInUse` | “Yakındaki klinikleri göstermek için konumuna ihtiyacımız var.” |
| Bildirim (randevu onayı / mesaj; **aksiyon anında**) | `Permission.notification` + iOS APNs | “Randevu onayı ve yeni mesajlar için bildirim göndermek istiyoruz.” |

`Permission.microphone` bu MVP’de yok; eklenirse aynı primer kuralı.

## Akış

```
Kullanıcı eylemi (buton)
  → zaten granted? native API’yi çağır, primer yok
  → permanentlyDenied / iOS limited? Ayarlar’a git diyaloğu (primer değil)
  → aksi halde uygulama içi primer (neden + devam / şimdi değil)
       → Devam: AYNI tap’te permission_handler.request()
       → granted → asıl iş (picker, getCurrentPosition analogu)
       → denied → kısa açıklama; tekrar spam istek yok
```

Android: `shouldShowRequestRationale == true` ise sistem de bir cümle
gösterebilir; **yine de** uygulama primer’ı önce gelir (tutarlı kopya).

## Kurallar

1. **Gesture aynı kare.** Primer “Devam” `onPressed` içinde `await request()`;
   `Future.delayed` / sonraki frame yok (iOS prompt düşer).
2. **Yüklemede / onboarding’de istek yok.** `main()` / splash / login’de
   kamera, konum, bildirim **ve** dosya **istenmez**. Birden fazla izni
   peş peşe gösterme. Her izin yalnızca o özelliğin butonunda.
3. **Kamera/galeri her seferinde primer.** iOS Photo Library / camera
   grant kalıcı olsa bile ilk yükleme yüzeyinde nedeni göster; “granted”
   ise native dialog çıkmaz, primer yine bilgi verir. İsteğe bağlı:
   oturumda bir kez (shared prefs) — varsayılan: her yükleme butonunda.
4. **Konum / bildirim:** `granted` ise primer atlanır.
5. **Reddedildiyse** tekrar `request()` döngüsü yok; “Ayarlar’dan aç”
   (`openAppSettings`) bir kez, kullanıcı tap’i ile.
6. **Metin i18n.** TR + EN (UK). Yeni izin yüzeyi PR’ında primer kopyası
   olmadan merge edilmez.
7. **WebView.** Native kabuk Next.js portalını açıyorsa web primer
   yeter; native route’a geçince bu dosya.

## Ekran checklist (Ay 3)

### Hasta

- [ ] Randevu sohbeti: kimlik / tıbbi foto / belge eki → camera + photos
- [ ] Klinik haritası “Konumumu bul” → locationWhenInUse
- [ ] Randevu talebi **başarılı olduktan sonra** bildirim opt-in → notification
- [ ] Sohbet açıkken yanıt bildirimi (granted ise gizle)
- [ ] Login / kayıt / splash / randevu listesi başlığı → izin **yok**

### Klinik

- [ ] Profil galeri “Fotoğraf Ekle”
- [ ] Akreditasyon Yükle / Güncelle
- [ ] Hekim fotoğrafı
- [ ] Mesaj ataşmanı
- [ ] Bildirim zili açılınca opt-in (dashboard yüklemesinde değil)

### Doktor

- [ ] Profil fotoğrafı değiştir
- [ ] Sertifika / diploma yükle
- [ ] Sohbet ataşmanı
- [ ] Mesaj kutusunu açınca bildirim opt-in (profil sayfasında değil)

### Admin

- [ ] Bildirim opt-in (başvuru / destek); kamera/konum yoksa primer yok

## Info.plist / AndroidManifest (yalnızca kullanılan izin)

Metin usage description = primer ile aynı amaç (kısa OS cümlesi).

```xml
NSCameraUsageDescription
NSPhotoLibraryUsageDescription
NSLocationWhenInUseUsageDescription
```

```xml
<!-- Android 13+ -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

İstenmeyen izin manifest’e eklenmez (Play / App Store incelemesi).

## Uygulama planı (Ay 3, native kabuk)

1. `lib/ui/permission_primer.dart` — sheet: ikon, başlık, gövde, Devam /
   Şimdi değil. Native `request()` yalnız Devam’da.
2. `permission_handler` + platform permission durum haritası.
3. Web’deki yüzey sırasıyla: hasta sohbet + harita → klinik yüklemeler →
   bildirim opt-in.
4. QA: ilk istek (primer + OS), granted (primer yok konum/bildirim),
   denied (ayarlar), Don’t Allow sonrası ikinci tap spam yok.
5. iOS Settings → MediQueue toggle ile geri dönüş.

Web karşılığı: `PermissionPrimer` + `permission-gate.tsx` (dört portal).
SafeArea: `docs/flutter-safe-area.md`. Haptic: `docs/flutter-haptic-feedback.md`.
