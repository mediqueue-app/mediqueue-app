# MediQueue AI Service — API Dokümantasyonu

**Versiyon:** 1.0.0  
**Base URL (local):** `http://localhost:8001`  
**Base URL (production):** `https://ai.mediqueue.com` *(deploy ortamına göre güncellenir)*  
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

MediQueue AI Service, backend'den **tamamen bağımsız** çalışan bir microservice'tir. Hasta tercihlerine göre doktor listesini filtreler, skorlar ve sıralı sonuç döner.

| Özellik | Değer |
|---------|-------|
| Port (default) | `8001` |
| Authentication | Yok *(internal network / API gateway arkasında çalıştırılması önerilir)* |
| Timeout önerisi | `5 saniye` |
| Retry önerisi | `500` hatalarında en fazla 2 retry (exponential backoff) |

### Mimari Akış

```
Backend API  ──HTTP POST──▶  AI Service (/match)
                                │
                                ├─ doctors.json yükle
                                ├─ filtrele (uzmanlık, dil, bütçe)
                                ├─ skorla ve sırala
                                └─ JSON response döndür
```

---

## 2. Endpoint'ler

### 2.1 Health Check

Servisin ayakta olup olmadığını kontrol eder.

```http
GET /health
```

**Response `200 OK`**

```json
{
  "status": "ok"
}
```

---

### 2.2 Doctor Matching

Hasta tercihlerine göre doktor eşleştirmesi yapar.

```http
POST /match
Content-Type: application/json
```

#### Request Body

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| `specialty` | `string` | Evet | İstenen uzmanlık alanı. Boş olamaz. |
| `language` | `string` | Evet | Tercih edilen dil (tam ad veya kod). Boş olamaz. |
| `budget` | `integer` | Evet | Maksimum bütçe (TRY). Negatif olamaz. |
| `city` | `string` | Hayır | Tercih edilen şehir. Aynı şehirdeki doktorlara bonus puan verilir. |

#### Desteklenen Uzmanlıklar

`Cardiology`, `Dermatology`, `Orthopedics`, `Neurology`, `Psychiatry`, `Pediatrics`, `Gynecology`, `Dentistry`, `Plastic Surgery`

Türkçe karşılıklar da desteklenir: `Kardiyoloji`, `Dermatoloji`, vb.

#### Desteklenen Diller

| Tam Ad | Kod |
|--------|-----|
| Turkish | `tr` |
| English | `en` |
| Arabic | `ar` |
| Russian | `ru` |
| German | `de` |

#### Desteklenen Şehirler

`İstanbul`, `Ankara`, `İzmir`, `Antalya`, `Bursa` (`Istanbul` yazımı da kabul edilir)

#### Response Body

| Alan | Tip | Açıklama |
|------|-----|----------|
| `matches` | `array` | Skora göre azalan sırada doktor listesi |
| `matches[].id` | `integer` | Doktor kimliği |
| `matches[].name` | `string` | Doktor adı |
| `matches[].specialty` | `string` | Uzmanlık alanı |
| `matches[].city` | `string` | Şehir |
| `matches[].languages` | `array` | Konuşulan diller |
| `matches[].price` | `integer` | Muayene ücreti (TRY) |
| `matches[].rating` | `float` | Hasta puanı (0–5) |
| `matches[].experience` | `integer` | Deneyim yılı |
| `matches[].score` | `float` | Eşleşme skoru (0–100) |

---

## 3. Request JSON Örnekleri

### Şehir ile istek

Dosya: [`docs/examples/match-request-with-city.json`](examples/match-request-with-city.json)

```json
{
  "specialty": "Cardiology",
  "language": "Turkish",
  "budget": 3000,
  "city": "Istanbul"
}
```

### Şehir olmadan istek

Dosya: [`docs/examples/match-request-without-city.json`](examples/match-request-without-city.json)

```json
{
  "specialty": "Dermatology",
  "language": "English",
  "budget": 1500
}
```

### Türkçe uzmanlık + dil kodu

```json
{
  "specialty": "Kardiyoloji",
  "language": "tr",
  "budget": 2500,
  "city": "Ankara"
}
```

---

## 4. Response JSON Örnekleri

### Başarılı eşleşme — `200 OK`

Dosya: [`docs/examples/match-response-success.json`](examples/match-response-success.json)

```json
{
  "matches": [
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
    },
    {
      "id": 2,
      "name": "Dr. Mehmet Kaya",
      "specialty": "Cardiology",
      "city": "Ankara",
      "languages": ["Turkish", "English", "German"],
      "price": 2200,
      "rating": 4.7,
      "experience": 14,
      "score": 81
    }
  ]
}
```

### Eşleşme bulunamadı — `200 OK`

Kriterlere uyan doktor yoksa HTTP `200` döner, `matches` boş listedir.

Dosya: [`docs/examples/match-response-empty.json`](examples/match-response-empty.json)

```json
{
  "matches": []
}
```

> **Not:** Boş sonuç bir hata değildir. Backend bu durumu normal akış olarak ele almalıdır.

---

## 5. HTTP Status Kodları

| Kod | Anlam | Ne Zaman Döner? |
|-----|-------|-----------------|
| **200** | OK | İstek başarılı. Eşleşme olsun veya olmasın geçerli response döner. |
| **400** | Bad Request | JSON gövdesi bozuk veya parse edilemiyor. |
| **422** | Unprocessable Entity | JSON geçerli ama alan validasyonundan geçemedi (boş specialty, negatif budget vb.). |
| **500** | Internal Server Error | Beklenmeyen sunucu hatası. |

### Hata Response Formatları

#### `400 Bad Request`

Dosya: [`docs/examples/error-400.json`](examples/error-400.json)

```json
{
  "detail": "Invalid JSON payload"
}
```

#### `422 Unprocessable Entity`

Dosya: [`docs/examples/error-422.json`](examples/error-422.json)

```json
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "specialty"],
      "msg": "String should have at least 1 character",
      "input": ""
    }
  ]
}
```

#### `500 Internal Server Error`

Dosya: [`docs/examples/error-500.json`](examples/error-500.json)

```json
{
  "detail": "Internal server error"
}
```

---

## 6. Backend Entegrasyon Rehberi

### Adım 1 — Servisi doğrula

Backend ayağa kalkarken veya her istek öncesi periyodik olarak health check yapın:

```
GET http://localhost:8001/health
```

`200` ve `{"status":"ok"}` beklenir.

### Adım 2 — Match isteği gönderin

Backend, hasta kaydı veya randevu akışında AI servisine HTTP POST atar:

```
POST http://localhost:8001/match
Content-Type: application/json

{ "specialty": "...", "language": "...", "budget": 3000, "city": "Istanbul" }
```

### Adım 3 — Response'u işleyin

| Durum | Backend Aksiyonu |
|-------|------------------|
| `200` + dolu `matches` | Listeyi skor sırasıyla UI'a veya randevu motoruna aktarın |
| `200` + boş `matches` | Kullanıcıya "uygun doktor bulunamadı" mesajı gösterin |
| `400` / `422` | İstek verisini loglayın, kullanıcıya validasyon hatası dönün |
| `500` | Retry uygulayın; devam ederse fallback akışa geçin |

### Önerilen Backend Konfigürasyonu

```env
MEDIQUEUE_AI_BASE_URL=http://localhost:8001
MEDIQUEUE_AI_TIMEOUT_MS=5000
MEDIQUEUE_AI_RETRY_COUNT=2
```

### Java (Spring WebClient) Örneği

```java
WebClient client = WebClient.builder()
    .baseUrl("http://localhost:8001")
    .build();

MatchResponse response = client.post()
    .uri("/match")
    .contentType(MediaType.APPLICATION_JSON)
    .bodyValue(new PatientRequest("Cardiology", "Turkish", 3000, "Istanbul"))
    .retrieve()
    .onStatus(HttpStatusCode::is4xxClientError, r ->
        r.bodyToMono(String.class).map(e ->
            new RuntimeException("AI validation error: " + e)))
    .onStatus(HttpStatusCode::is5xxServerError, r ->
        r.bodyToMono(String.class).map(e ->
            new RuntimeException("AI server error: " + e)))
    .bodyToMono(MatchResponse.class)
    .block(Duration.ofSeconds(5));
```

### Node.js (fetch) Örneği

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
  signal: AbortSignal.timeout(5000),
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(`AI service error ${response.status}: ${JSON.stringify(error)}`);
}

const data = await response.json();
console.log(data.matches);
```

### .NET (HttpClient) Örneği

```csharp
using var client = new HttpClient { BaseAddress = new Uri("http://localhost:8001") };
client.Timeout = TimeSpan.FromSeconds(5);

var payload = new {
    specialty = "Cardiology",
    language = "Turkish",
    budget = 3000,
    city = "Istanbul"
};

var response = await client.PostAsJsonAsync("/match", payload);
response.EnsureSuccessStatusCode();

var result = await response.Content.ReadFromJsonAsync<MatchResponse>();
```

---

## 7. cURL Örnekleri

### Health check

```bash
curl -X GET "http://localhost:8001/health"
```

### Başarılı match isteği

```bash
curl -X POST "http://localhost:8001/match" \
  -H "Content-Type: application/json" \
  -d '{
    "specialty": "Cardiology",
    "language": "Turkish",
    "budget": 3000,
    "city": "Istanbul"
  }'
```

### Şehir olmadan match isteği

```bash
curl -X POST "http://localhost:8001/match" \
  -H "Content-Type: application/json" \
  -d '{
    "specialty": "Dermatology",
    "language": "English",
    "budget": 1500
  }'
```

### Validasyon hatası (422)

```bash
curl -X POST "http://localhost:8001/match" \
  -H "Content-Type: application/json" \
  -d '{
    "specialty": "",
    "language": "Turkish",
    "budget": 1000
  }'
```

### Bozuk JSON (400)

```bash
curl -X POST "http://localhost:8001/match" \
  -H "Content-Type: application/json" \
  -d '{ invalid json'
```

---

## 8. Swagger / OpenAPI

Servis çalışırken interaktif API dokümantasyonuna erişebilirsiniz:

| Araç | URL |
|------|-----|
| **Swagger UI** | http://localhost:8001/docs |
| **ReDoc** | http://localhost:8001/redoc |
| **OpenAPI JSON** | http://localhost:8001/openapi.json |

### Swagger'da test adımları

1. `http://localhost:8001/docs` adresini açın.
2. **Matching** bölümünden `POST /match` endpoint'ini genişletin.
3. **Try it out** butonuna tıklayın.
4. Örnek request body'yi düzenleyin veya varsayılanı kullanın.
5. **Execute** ile isteği gönderin.
6. Response bölümünden status code ve body'yi inceleyin.

Swagger'da her endpoint için `200`, `400`, `422`, `500` response örnekleri tanımlıdır.

---

## 9. Eşleştirme Kuralları

AI servisi rule-based çalışır (machine learning kullanılmaz).

### Filtreleme (hard rules)

1. Uzmanlık eşleşmezse doktor elenir.
2. Dil eşleşmezse doktor elenir.
3. Doktor fiyatı hasta bütçesinden büyükse doktor elenir.

### Skorlama (0–100)

| Kural | Puan |
|-------|------|
| Temel skor | 60 |
| Şehir eşleşmesi (şehir girilmişse) | +15 |
| Rating bonusu | `(rating / 5) × 15` |
| Deneyim bonusu | `(experience / 20) × 10` |

Sonuçlar `score` alanına göre **azalan** sırada döner.

---

## Ek Kaynaklar

| Dosya | Açıklama |
|-------|----------|
| [`README.md`](../README.md) | Kurulum ve çalıştırma |
| [`docs/examples/`](examples/) | Tüm JSON örnek dosyaları |
| [`openapi.json`](http://localhost:8001/openapi.json) | Machine-readable API spec |

**İletişim:** ai-team@mediqueue.com
