# Flutter: geri tuşu, swipe-back ve yığın sözleşmesi

Web’de overlay’ler `history.pushState` (`useHistoryLayer`) ile yığına eklenir;
tarayıcı geri tuşu önce sohbet / modal / form adımını kapatır. Native kabukta
aynı sözleşme `Navigator` + `PopScope` ile kurulur. Android donanım geri ve
iOS kenardan kaydırma **aynı yığını** pop etmeli.

Web karşılığı: `docs/web-navigation-history.md`.

## Push vs go (replace)

| Geçiş | Web | Flutter / GoRouter |
| --- | --- | --- |
| Liste → detay, klinik, sohbet | `router.push` / `<Link>` | `context.push` / `Navigator.push` |
| Login başarı, logout, splash → home | `router.replace` | `context.go` / `pushReplacement` |
| AuthGuard (oturumsuz korumalı URL) | `replace(login?next=)` | `go('/login?next=')` |
| Filtre, `?q=`, `?id=` deeplink senkronu | `router.replace(..., { scroll: false })` | `go` aynı path, query güncelle |
| Overlay (modal, sheet, drawer, form adımı) | `useHistoryLayer` → dummy history | `showDialog` / `push` child route / `PopScope` |

`next` yalnızca uygulama içi path (`safeInternalPath`): `//` ve `https:` yok.

## Android donanım geri tuşu

- Tam ekran route’lar `Navigator.push` ile açılır. `pushReplacement` yalnızca
  login başarı, logout, splash → home.
- Modal, bottom sheet, drawer, çok adımlı form adımı ayrı route veya
  `showDialog` / `showModalBottomSheet`. Sistem geri önce bunları kapatır.
- Overlay açıkken:
  `PopScope(canPop: false, onPopInvokedWithResult: (didPop, _) { if (!didPop) closeOverlay(); })`
- Korumalı derin link: oturum yoksa login, `extra` / query `next`; girişten
  sonra `go(next)` (replace). Geri tuşu login formunu doldurulmuş halde açmasın.
- `WillPopScope` kullanma; `PopScope` kullan.
- Tab kökündeyken (yığında tek sayfa): Android’de `SystemNavigator.pop()`,
  iOS’ta hiçbir şey (gesture zaten yok).

## iOS swipe-back (interactive pop)

- `CupertinoPageRoute` veya GoRouter `CustomTransitionPage` +
  `fullscreenDialog: false` kök sayfalar için kenar kaydırmayı açar.
- `fullscreenDialog: true` sheet’lerde kaydırma kapanışı beklenir; route
  yığında kalsın.
- Nested Navigator (tab + stack): swipe yalnızca **aktif tab stack**’ini pop
  etsin; tab değiştirmesin.
- Overlay açıkken swipe-back’i kapat (`PopScope(canPop: false)`) veya overlay’i
  bir `ModalRoute` yap ki gesture overlay’i kapatsın, alttaki sayfayı değil.
- WebView / harita tam ekran: `gestureRecognizers` çakışmasını test et; gerekirse
  o route’ta `canPop` false + özel geri.

## Çok adımlı form (randevu talebi)

- Her adım state’i üst widget’ta tut; geri yalnızca **son adımı** düşürsün.
- Saat seçiliyken geri → takvim, seçili gün kalsın; form sıfırlanmasın.
- Başarı ekranındayken geri → form (yeni talep), beyaz ekran yok.
- Adımlar arasında `pushReplacement` kullanma (yığını yakar).

## Kontrol listesi (QA)

Android (donanım geri) ve iOS (kenar kaydırma) için ayrı koş:

1. Modal / sheet / drawer açık → kapanır, alt sayfa durur. İkinci geri → önceki route.
2. Login olduktan sonra geri → login formu yok (uygulamadan çık / splash).
3. Logout `go('/login')`; geri ile dashboard’a (auth’suz) girilmez.
4. Form adım 2’de geri → adım 1, doldurulan alanlar durur.
5. Başarı ekranında geri → form veya liste; boş/beyaz route yok.
6. Derin link `/dashboard/requests?id=` oturumsuz → login → replace ile aynı kayıt.
7. Derin link oturumlu → kayıt seçili; geri listeye (query replace ise tek geri).
8. Bildirim / hamburger açıkken geri → menü kapanır, sayfa değişmez.
9. Sohbet açıkken geri → sohbet kapanır; ikinci geri liste/önceki sayfa.
10. Filtre yazınca geri, her harf için bir sayfa geri gitmez (`go` / replace).
11. Tab bar kökünde Android geri → uygulama arka plana/çıkış; iOS swipe yok.
12. Overlay + swipe aynı anda: alttaki sayfa pop olmaz (canPop false veya ModalRoute).

## GoRouter iskeleti

```dart
GoRoute(
  path: '/login',
  redirect: (ctx, state) {
    if (loggedIn) {
      final next = state.uri.queryParameters['next'];
      if (next != null && next.startsWith('/') && !next.startsWith('//')) {
        return next;
      }
      return '/dashboard';
    }
    return null;
  },
),
GoRoute(
  path: '/clinics/:id',
  builder: ...,
),
```

`context.go` = replace. `context.push` = yığın. Overlay = `push` + geri `pop`.
