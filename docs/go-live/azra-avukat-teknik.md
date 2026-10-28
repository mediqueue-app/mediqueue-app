# Avukat teknik notu — İstanbul Local Zone ve Frankfurt

Hazırlayan: Azra, CTO. Tarih: 20 Ekim 2026.
Kaynak: `docs/go-live/kasim-frankfurt-data-path.md` (Kasım, 17 Eylül 2026).
Bu sayfa hukuki görüş değildir. Avukat cümlesi burada yazılmaz.

Toplantıda sorulacak iki şey:

1. Staging (api + veritabanı + AI, İstanbul Local Zone) kurulabilir mi?
2. “Kişisel veya sağlık verisi Türkiye’de kalıyor” — evet / hayır / şartlı?

İkinci cümle avukat yazmadan slaytta, sitede ve sözde kullanılmaz.

## İstanbul’da çalışabilir

- EC2 ve üzerindeki uygulama (api, veritabanı, AI konteyneri)
- Disk (EBS) canlı kopyası
- Load balancer (ALB) — bağlantıyı İstanbul’da karşılar
- İnternete doğrudan çıkış (public IP, Local Zone’dan)
- Kendi kurduğumuz NAT makinesi (managed NAT Gateway değil)

## Frankfurt’a gider

- Managed NAT Gateway (İstanbul’da bu hizmet yok)
- Secrets Manager — şifre ve anahtar metni
- CloudWatch Logs — uygulama logları
- ECR — konteyner imajı
- ACM — sertifikanın üretildiği ve saklandığı yer (sertifika İstanbul’daki ALB’de kullanılabilir; üretim ve anahtar Frankfurt’ta)

## Karışık

- EBS snapshot: canlı disk İstanbul’da. Snapshot dosyası, ayrıca yerel depolama açılmazsa, Frankfurt’taki S3’te.
- ALB erişim logu: dengeleyici İstanbul’da. Log dosyası bölgesel S3 kovasında, yani Frankfurt tarafında.

## Bilinmiyor

- GitHub Actions çalıştırıcısı AWS değil. Hangi ülkede koştuğu bu notta yok.
- İstanbul’un “local snapshot” özelliği açık mı, Kasım’ın kaynağında ayrıca doğrulanmadı. Açılmazsa snapshot Frankfurt’tadır.

## Bu nottan çıkmayan cümle

“Veri Türkiye’de kalıyor” bu tabloyla söylenemez. Secrets, log, imaj ve sertifika kontrolü Frankfurt’ta. Staging kararı ve (b) cümlesi avukattadır.
