# Flutter: klavye altındaki input

Web hasta/klinik portallarında çözüm `visualViewport` + `scrollIntoView` +
`--keyboard-inset` / `--vv-height`. Flutter native kabuğa geçildiğinde aynı
sorun **WebView klavyesi değil, Flutter scaffold inset** ile çözülür.

## Android

`AndroidManifest.xml` içinde Activity için:

```xml
android:windowSoftInputMode="adjustResize"
```

Flutter tarafında Scaffold varsayılanı:

```dart
Scaffold(
  resizeToAvoidBottomInset: true, // varsayılan true; false yapma
  body: ...
)
```

`false` bırakılırsa klavye overlay olur ve alttaki TextField gizlenir.

## iOS

iOS’ta `resizeToAvoidBottomInset` çoğu durumda yeterlidir. Nested
`ListView` / `SingleChildScrollView` + alttaki form için ek olarak:

```dart
Scaffold(
  resizeToAvoidBottomInset: true,
  body: SafeArea(
    child: SingleChildScrollView(
      padding: EdgeInsets.only(
        bottom: MediaQuery.viewInsetsOf(context).bottom,
      ),
      child: form,
    ),
  ),
)
```

`MediaQuery.viewInsets.bottom` klavye yüksekliğidir (web’deki `--keyboard-inset`).

## Chat / sabit alt composer

Web’deki `fixed` sohbet çubuğu Flutter’da `Scaffold.bottomNavigationBar`
veya `Stack` + `Positioned` ile yapılırsa `viewInsets` kadar yukarı alın:

```dart
Padding(
  padding: EdgeInsets.only(
    bottom: MediaQuery.viewInsetsOf(context).bottom,
  ),
  child: composer,
)
```

Paketli alternatif: `flutter/services.dart` gerekmez; gerekirse
`keyboard_avoider` veya resmi olmayan `KeyboardAvoidingView` analogu yerine
yukarıdaki `viewInsets` yeterli.

## WebView içinde eski portal

Uygulama bir süre WebView’de Next.js’i açarsa bu dosyadaki web çözümü
geçerli kalır. Native route’lara geçince `KeyboardInsets` bileşenine gerek
kalmaz; her `Scaffold` `resizeToAvoidBottomInset: true` olmalı.
