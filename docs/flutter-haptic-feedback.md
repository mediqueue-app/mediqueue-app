# Flutter: HapticFeedback (kritik etkileşim)

Web-first dönemde tarayıcı haptic API’si (özellikle iOS Safari) **light /
medium / heavy** ayırt etmez; `Navigator.vibrate` varsa kaba, çoğu iPhone’da
yok. Bu madde **Ay 3 native Flutter kabuğa** ertelenir. WebView içinde Next.js
açıldığı sürece haptic **yok** sayılır; native route’larda `HapticFeedback`
kullanılır.

**Öncelik:** web-first tamam; native geçiş backlog’u (P2). Görsel toast /
status / `ConfirmDialog` yerine geçmez — yalnızca dokunsal onay.

## Şiddet sözlüğü

Tek bir sarmalayıcı; ekranlarda `HapticFeedback.*` doğrudan çağrılmaz.

| Sinyal | Flutter | Ne zaman |
| --- | --- | --- |
| Seçim | `selectionClick` | Takvim günü, slot, segment, tab (değer değişti) |
| Hafif | `lightImpact` | Küçük başarı: mesaj gönderildi, kopyalandı, kaydet (yan etki yok) |
| Orta | `mediumImpact` | Ana başarı: randevu oluşturuldu, form gönderildi, onaylandı |
| Ağır | `heavyImpact` | Hata, uyarı, yıkıcı onay (iptal / sil / reddet) |
| Yasak | `vibrate()` | Sürekli / belirsiz titreşim; iOS’ta kaba, Android’de uzun |

```dart
import 'package:flutter/services.dart';

abstract final class MqHaptics {
  static Future<void> selection() => HapticFeedback.selectionClick();
  static Future<void> success() => HapticFeedback.mediumImpact();
  static Future<void> light() => HapticFeedback.lightImpact();
  static Future<void> error() => HapticFeedback.heavyImpact();
  static Future<void> warning() => HapticFeedback.mediumImpact();
}
```

OS haptic’i kapalıysa çağrı no-op’tur; ekstra permission yok.

## Ne zaman çal (kritik anlar)

Yalnızca **sonuç belli olduktan sonra** bir kez. Butona basışta değil.

### Hasta

- [ ] Randevu talebi **başarılı** (`booking-success`) → `success` (medium)
- [ ] Randevu talebi **API / doğrulama hatası** → `error` (heavy)
- [ ] Takvim günü / saat slotu seçildi → `selection` (her kaydırmada değil)
- [ ] Randevu iptali onaylandı (dialog confirm sonrası) → `error` (heavy)
- [ ] Hesap silme talebi gönderildi → `error` (heavy)
- [ ] Login / kayıt başarı → haptic **yok** (sık, düşük değer)
- [ ] Sohbet gönderildi → `light` **isteğe bağlı**; tekrarlı sohbeti gürültü yapmasın — varsayılan kapalı

### Klinik

- [ ] Talep onaylandı → `success`
- [ ] Talep reddedildi / onaylı randevu iptali → `error` (confirm sonrası)
- [ ] Profil / form kaydı başarılı → `success`
- [ ] Fotoğraf / belge silindi (confirm sonrası) → `error`
- [ ] Mesaj silindi (kendi balonu, confirm sonrası) → `warning`

### Doktor

- [ ] Müsaitlik / slot kaydı başarılı → `success`
- [ ] Randevu durumu değişti (onay / tamamlandı) → `light` veya `success`
- [ ] Çakışma / kayıt hatası → `error`

### Ortak

- [ ] Inline validation (boş zorunlu alan, blur) → haptic **yok**; submit’teki ilk hatada `error`
- [ ] Toast / snackbar ile aynı anda: haptic **bir** kez (toast animasyonu ayrı)
- [ ] `ConfirmDialog` açılışı → haptic **yok**; onay tap’i sonrası
- [ ] Pull-to-refresh, liste scroll, hover analogu → **yok**
- [ ] Disabled kontrol tap → **yok** (görsel yeterli)
- [ ] Polling / arka plan yenileme → **yok**

## Kurallar

1. **Sonuç tetikler.** `onPressed` başında değil; `await createAppointment()` resolve/reject.
2. **Bir olay, bir darbe.** Retry döngüsü her denemede çalmaz; kullanıcıya gösterilen son durumda bir kez.
3. **Erişilebilirlik.** Haptic, semantik etiket / toast / hata metninin yerine geçmez. VoiceOver / TalkBack açıkken de görsel geri bildirim durur. Sistem “titreşimi kapat” ise sessiz kalır — uygulama ayarı şart değil.
4. **WebView.** Native sarmalayıcı `MqHaptics`’i JS köprüsüne bağlama (Ay 3 ilk dilim). Portal native route olunca bağla.
5. **Test.** Simulator’da iOS Taptic çoğu zaman zayıf/yok; gerçek iPhone + bir Android (Pixel veya Samsung).

## Uygulama planı (Ay 3, native kabuk)

1. `lib/ui/haptics.dart` — yukarıdaki sarmalayıcı; widget ağacından import.
2. Event eşlemesi — bu dosyadaki checklist; yeni ekran PR’ında aynı tabloya satır.
3. Hasta booking + iptal (en yüksek değer) → klinik onay/red → doktor kayıt hatası.
4. QA: başarı / hata / seçim / “çalınmaması gereken” (scroll, disabled, dialog open).
5. İsteğe bağlı sohbet `light` ayrı flag; varsayılan off.

Web karşılığı yok (bilinçli). SafeArea: `docs/flutter-safe-area.md`. Klavye:
`docs/flutter-keyboard-avoiding.md`. Geri yığını: `docs/flutter-navigation-back.md`.
İzin primer: `docs/flutter-permission-primer.md`.
