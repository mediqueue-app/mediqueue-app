# MediQueue AI Service — API Dokümantasyonu

**Versiyon:** 1.0.0  
**Base URL (local):** `http://localhost:8001`  
**Protokol:** HTTP/HTTPS  
**Content-Type:** `application/json`

---

## İçindekiler

1. [Genel Bakış](#1-genel-bakış)
2. [Endpoint'ler](#2-endpointler)
3. [Request JSON Örnekleri](#3-request-json-örnekleri)
4. [Response JSON Örnekleri](#4-response-json-örnekleri)
5. [HTTP Status Kodları](#5-http-status-kodları)
6. [Backend Entegrasyon Rehberi](#6-backend-entegrasyon-rehberi)
7. [cURL Örnekleri](#7-curl-örnekleri)
8. [Swagger / OpenAPI](#8-swagger--openapi)
9. [Eşleştirme Kuralları](#9-eşleştirme-kuralları)

---

## 1. Genel Bakış

MediQueue AI Service, backend'den bağımsız çalışan bir microservice'tir. Hasta tercihlerine göre **doktor ve klinik** listelerini filtreler, skorlar ve sıralı sonuç döner.

| Özellik | Değer |
|---------|-------|
| Port (default) | `8001` |
| Veri kaynağı | PostgreSQL (backend ile ortak DB) |
| Authentication | Yok *(internal network / API gateway arkasında çalıştırılması önerilir)* |
| Timeout önerisi | `5 saniye` |

### Mimari Akış

```
Backend API  ──HTTP POST──▶  AI Service (/match)
                                │
                                ├─ PostgreSQL doctors tablosu
                                ├─ PostgreSQL clinics + doctor_clinics
                                ├─ doktor filtrele (uzmanlık, dil, bütçe)
                                ├─ klinik filtrele (uzmanlık, dil — bütçe yok)
                                ├─ skorla ve sırala
                                └─ { doctors, clinics, message } döndür
```

---

## 2. Endpoint'ler

### 2.1 Health Check

```http
GET /health
```

**Response `200 OK`**

```json
{ "status": "ok" }
```

---

### 2.2 Doctor & Clinic Matching

```http
POST /match
Content-Type: application/json
```

#### Request Body

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `specialty` | `string` | Evet | İstenen uzmanlık alanı |
| `language` | `string` | Evet | Tercih edilen dil (tam ad veya kod) |
| `budget` | `integer` | Evet | Maksimum bütçe (TRY). **Sadece doktor eşleştirmede** uygulanır |
| `city` | `string` | Hayır | Tercih edilen şehir. Aynı şehir bonus puanı verir |
| `max_doctors` | `integer` | Hayır | Skor sırasına göre dönecek maksimum doktor sayısı (1–100). Verilmezse tüm eşleşmeler döner |
| `max_clinics` | `integer` | Hayır | Skor sırasına göre dönecek maksimum klinik sayısı (1–100). Verilmezse tüm eşleşmeler döner |

#### Response Body

| Alan | Tip | Açıklama |
|------|-----|----------|
| `doctors` | `array` | Skora göre azalan sırada doktor listesi |
| `doctors[].id` | `integer` | PostgreSQL `doctors.id` |
| `doctors[].name` | `string` | Doktor adı |
| `doctors[].specialty` | `string` | Uzmanlık |
| `doctors[].city` | `string` | Şehir |
| `doctors[].languages` | `array` | Konuşulan diller |
| `doctors[].price` | `integer` | Muayene ücreti (TRY) |
| `doctors[].rating` | `float` | Puan (0–5) |
| `doctors[].experience` | `integer` | Deneyim yılı |
| `doctors[].score` | `float` | Eşleşme skoru (0–100) |
| `clinics` | `array` | Skora göre azalan sırada klinik listesi |
| `clinics[].id` | `integer` | PostgreSQL `clinics.id` |
| `clinics[].name` | `string` | Klinik adı |
| `clinics[].description` | `string \| null` | Açıklama |
| `clinics[].address` | `string \| null` | Adres |
| `clinics[].phone` | `string \| null` | Telefon |
| `clinics[].score` | `float` | Eşleşme skoru (0–100) |
| `message` | `string \| null` | Yalnızca `doctors` ve `clinics` ikisi de boşsa dolu |

#### `message` Davranışı

| doctors | clinics | message |
|---------|---------|---------|
| dolu | dolu/boş | `null` |
| boş | dolu | `null` |
| dolu | boş | `null` |
| boş | boş | Bilgilendirme metni |

---

### 2.3 Match Feedback (Draft — kalıcı değil)

```http
POST /feedback
Content-Type: application/json
```

> **ÖNEMLİ:** Bu endpoint **draft** aşamasındadır. Yanıt `202 Accepted` döner; veri yalnızca loglanır, **PostgreSQL'e veya dosyaya yazılmaz**. Demo'da canlı gösterilebilir ancak kalıcılık iddiası yapılmamalıdır.

> **Backend ile fark:** Backend'de `POST /v1/reviews` (JWT + patient rolü) canlıdır ve yorumları DB'ye yazar. AI `/feedback` ile backend reviews **henüz entegre değildir** — Ay 2 planı.

#### Request Body

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `match_request` | `object` | Evet | Orijinal match isteği |
| `selected_doctor_id` | `integer \| null` | Hayır | Seçilen doktor ID |
| `selected_clinic_id` | `integer \| null` | Hayır | Seçilen klinik ID |
| `rating` | `integer \| null` | Hayır | 1–5 arası değerlendirme |
| `comment` | `string \| null` | Hayır | Serbest metin |

**Response `202 Accepted`**

```json
{ "status": "received" }
```

---

## 3. Request JSON Örnekleri

Dosya: [`docs/examples/match-request-with-city.json`](examples/match-request-with-city.json) — şehir tercihi, limit yok

Dosya: [`docs/examples/match-request-with-limits.json`](examples/match-request-with-limits.json) — şehir + `max_doctors` / `max_clinics`

```json
{
  "specialty": "Cardiology",
  "language": "Turkish",
  "budget": 3000,
  "city": "Istanbul",
  "max_doctors": 5,
  "max_clinics": 3
}
```

Dosya: [`docs/examples/match-request-without-city.json`](examples/match-request-without-city.json)

```json
{
  "specialty": "Dermatology",
  "language": "English",
  "budget": 1500
}
```

---

## 4. Response JSON Örnekleri

### Başarılı eşleşme — `200 OK`

Dosya: [`docs/examples/match-response-success.json`](examples/match-response-success.json)

```json
{
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Ayşe Yılmaz",
      "specialty": "Cardiology",
      "city": "İstanbul",
      "languages": ["Turkish", "English"],
      "price": 2800,
      "rating": 4.9,
      "experience": 18,
      "score": 94
    }
  ],
  "clinics": [
    {
      "id": 1,
      "name": "MediQueue Heart Center",
      "description": "Cardiology and internal medicine",
      "address": "Nişantaşı, İstanbul",
      "phone": "+90 212 555 0101",
      "score": 88
    }
  ],
  "message": null
}
```

### Sadece klinik eşleşmesi — `200 OK`

Dosya: [`docs/examples/match-response-clinics-only.json`](examples/match-response-clinics-only.json)

Doktor bulunamaz ama klinik bulunursa `message` **null** kalır.

### Eşleşme bulunamadı — `200 OK`

Dosya: [`docs/examples/match-response-empty.json`](examples/match-response-empty.json)

```json
{
  "doctors": [],
  "clinics": [],
  "message": "Kriterlerinize uygun doktor veya klinik bulunamadı, filtreleri genişletmeyi deneyin."
}
```

---

## 5. HTTP Status Kodları

| Kod | Anlam | Ne Zaman? |
|-----|-------|-----------|
| **200** | OK | Match başarılı (sonuç boş olabilir) |
| **202** | Accepted | Feedback alındı (draft) |
| **400** | Bad Request | Bozuk JSON |
| **422** | Unprocessable Entity | Validasyon hatası |
| **500** | Internal Server Error | Beklenmeyen hata |

---

## 6. Backend Entegrasyon Rehberi

### Beklenen proxy response formatı

Backend `POST /v1/match` proxy'si AI servisinden gelen yanıtı **olduğu gibi** client'a iletmelidir:

```json
{
  "doctors": [...],
  "clinics": [...],
  "message": null
}
```

> **Not:** Backend entegrasyonu tamamlanmıştır (Temmuz 2026). `backend/app/schemas/match.py` içindeki `MatchResponse` modeli bu servisin döndürdüğü `{ doctors, clinics, message }` formatıyla uyumludur. `POST /v1/match` proxy'si yanıtı doğrulayıp client'a iletir.

### Adımlar

1. `GET /health` ile AI servisini doğrulayın
2. `POST /match` ile eşleştirme isteği gönderin
3. Response'u işleyin:

| Durum | Aksiyon |
|-------|---------|
| `doctors` ve/veya `clinics` dolu | UI'da her iki listeyi skor sırasıyla gösterin |
| İkisi de boş + `message` dolu | Kullanıcıya `message` metnini gösterin |
| `400` / `422` | Validasyon hatası loglayın |
| `500` | Retry veya fallback |

### Önerilen env (backend)

```env
MEDIQUEUE_AI_BASE_URL=http://localhost:8001
MEDIQUEUE_AI_TIMEOUT_SECONDS=5
```

### Node.js örneği

```javascript
const response = await fetch("http://localhost:8001/match", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    specialty: "Cardiology",
    language: "Turkish",
    budget: 3000,
    city: "Istanbul",
  }),
});

const data = await response.json();
console.log(data.doctors, data.clinics, data.message);
```

---

## 7. cURL Örnekleri

```bash
curl -X GET "http://localhost:8001/health"

curl -X POST "http://localhost:8001/match" \
  -H "Content-Type: application/json" \
  -d '{"specialty":"Cardiology","language":"Turkish","budget":3000,"city":"Istanbul"}'

curl -X POST "http://localhost:8001/feedback" \
  -H "Content-Type: application/json" \
  -d '{
    "match_request": {"specialty":"Cardiology","language":"Turkish","budget":3000},
    "selected_doctor_id": 1,
    "rating": 5
  }'
```

---

## 8. Swagger / OpenAPI

| Araç | URL |
|------|-----|
| Swagger UI | http://localhost:8001/docs |
| ReDoc | http://localhost:8001/redoc |
| OpenAPI JSON | http://localhost:8001/openapi.json |

---

## 9. Eşleştirme Kuralları

Rule-based (ML yok).

### Doktor eşleştirme

**Hard filter:** uzmanlık, dil, bütçe (`price <= budget`)

**Skorlama (0–100):**

| Kural | Puan |
|-------|------|
| Temel skor | 60 |
| Şehir eşleşmesi | +15 |
| Rating bonusu | `(rating / 5) × 15` |
| Deneyim bonusu | `(experience / 20) × 10` |

### Klinik eşleştirme

Klinik tablosunda uzmanlık/dil/şehir kolonları yok — değerler **bağlı aktif doktorlardan** türetilir (`doctor_clinics` join).

> **Önemli — `clinics.json` ile karıştırmayın:** `app/data/clinics.json` dosyasındaki `min_price`, `max_price`, `rating`, `doctor_count` alanları PostgreSQL'e migrate edilmemiştir ve runtime'da **kullanılmaz**. Bu dosya yalnızca backend seed script'i için referanstır. Klinik eşleştirmesinde fiyat filtresi yoktur; rating bağlı doktorların ortalamasından türetilir. Ayrıntı: [`app/data/clinics.json.README.md`](../app/data/clinics.json.README.md).

**Hard filter:** uzmanlık (bağlı doktorlardan), dil (birleşim). **Bütçe filtresi uygulanmaz.**

**Skorlama (0–100):**

| Kural | Puan |
|-------|------|
| Temel skor | 60 |
| Şehir eşleşmesi (bağlı doktor şehirlerinden) | +15 |
| Rating bonusu (bağlı doktor ortalaması) | `(rating / 5) × 15` |

---

## Ek Kaynaklar

| Dosya | Açıklama |
|-------|----------|
| [`README.md`](../README.md) | Kurulum ve çalıştırma |
| [`docs/examples/`](examples/) | JSON örnek dosyaları |

**İletişim:** ai-team@mediqueue.com
