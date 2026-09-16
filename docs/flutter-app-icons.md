# Flutter uygulama ikonları (native geçiş)

Web-first; Flutter kabuğu henüz yok. `flutter create` varsayılan mavi “F” / Android robot **ship edilmez**.

Kaynak: `web-marketing/public/mediqueue-icon.png` (512×512, M kiremit). Wordmark
`mediqueue-logo.png` splash’te kullanılabilir; App Store/Play ikonu **yalnızca M kiremit**.

## Checklist

- [ ] `flutter_launcher_icons` (veya eşdeğeri) ile Android + iOS üret.
- [ ] Android adaptive: foreground M, background `#EEF2FF` (veya `#3A6AD6`).
  `mipmap-*/ic_launcher` default Flutter asset’ini üzerine yaz.
- [ ] iOS `AppIcon` 1024 App Store + tüm Contents.json slotları.
- [ ] Maskable / safe zone: kiremit zaten yuvarlatılmış; kenara yapıştırma.
- [ ] Splash: `flutter_native_splash` background `#EEF2FF`, center M.
- [ ] Notification small icon (Android): monokrom beyaz M, şeffaf zemin —
  renkli PNG status bar’da ezilir.
- [ ] WebView diliminde PWA `manifest.ts` ikonu ile aynı dosya.
- [ ] Lucide `Stethoscope` / `HeartPulse` launcher olarak **yok**.

Üretim komutu (kabuk eklendiğinde):

```yaml
# flutter_launcher_icons.yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/brand/mediqueue-icon.png"
  adaptive_icon_background: "#EEF2FF"
  adaptive_icon_foreground: "assets/brand/mediqueue-icon.png"
  web:
    generate: true
    background_color: "#EEF2FF"
    theme_color: "#3A6AD6"
```

Web envanteri: `docs/brand-icons.md`.
