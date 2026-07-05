# `clinics.json` — Referans Veri Dosyası

**NOT:** Bu dosya yalnızca backend seed script'i (`backend/scripts/seed_clinics_from_ai_json.py`) için referans veridir.

`min_price`, `max_price`, `rating`, `doctor_count` alanları PostgreSQL'e migrate **edilmemiştir** ve runtime'da (`clinic_matcher.py`) **kullanılmaz**.

Klinik uzmanlık, dil, şehir ve rating bilgisi bağlı aktif doktorlardan türetilir (`doctor_clinics` join üzerinden).

Bu dosyadaki fiyat veya rating alanlarını güncellemek matching davranışını **etkilemez** — yalnızca seed script'inin okuduğu alanlar (`id`, `name`, `specialty`, `city`, `languages`, `description`, `address`, `phone` vb.) veritabanına yazılır.

AI eşleştirme motoru bu JSON dosyasını **okumaz**; PostgreSQL'deki `clinics` ve `doctor_clinics` tablolarını kullanır.
