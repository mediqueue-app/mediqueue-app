# Flutter: SafeArea (çentik / Dynamic Island / home indicator)

Web’de çözüm `viewport-fit=cover` + `env(safe-area-inset-*)` (`.safe-top` /
`.safe-bottom`). Native Flutter kabuğa geçildiğinde CSS inset’leri **yoktur**;
her ekran `MediaQuery.padding` / `SafeArea` ile aynı boşluğu korumalıdır.

**Öncelik:** web-first tamam; bu madde native geçiş backlog’u (P2).

## Kural

Her tam ekran `Scaffold` gövdesi (veya eşdeğeri) çentik, Dynamic Island,
status bar ve home indicator’ı **içerikten** ayırır. Sabit üst bar / AppBar
başlığı kesilmez; sabit alt composer / FAB home indicator’ın altında kalmaz.

```dart
Scaffold(
  appBar: AppBar(title: Text(title)), // AppBar status bar inset’ini kendi alır
  body: SafeArea(
    // AppBar varsa top genelde false; yoksa true
    top: false,
    child: content,
  ),
)
```

AppBar yoksa (özel üst çubuk, `Stack` + `Positioned`):

```dart
SafeArea(
  child: Column(
    children: [
      customTopBar,
      Expanded(child: body),
    ],
  ),
)
```

veya yalnızca padding:

```dart
padding: EdgeInsets.only(
  top: MediaQuery.paddingOf(context).top,
  bottom: MediaQuery.paddingOf(context).bottom,
)
```

`SafeArea` ile `MediaQuery.padding` **çift uygulanmaz**.

## Ekran checklist (her route)

- [ ] Login / register
- [ ] Tab kökleri (hasta, klinik, doktor, admin)
- [ ] Liste → detay
- [ ] Modal / bottom sheet / drawer (`showModalBottomSheet` `useSafeArea: true`)
- [ ] Tam ekran harita, sohbet, belge önizleme
- [ ] Sabit alt composer (mesaj) — `viewInsets` (klavye) **ve** `padding.bottom` (home indicator)
- [ ] FAB / toast / demo launcher
- [ ] Yatay (landscape) `padding.left` / `padding.right`

## Test cihazları

- iPhone Dynamic Island (14 Pro ve üzeri)
- iPhone çentik (X–13)
- Android cutout (ör. Pixel 8, bir Samsung A serisi)
- Gesture navigation home indicator

Web karşılığı: `viewport-fit=cover` + `.safe-top` / `env(safe-area-inset-*)`.
Klavye: `docs/flutter-keyboard-avoiding.md`. Geri yığını: `docs/flutter-navigation-back.md`.
