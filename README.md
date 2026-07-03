# MediQueue

Monorepo — backend, web, mobile ve AI servisleri.

## AI servisini çalıştırma

AI microservice `ai/` klasöründedir. **Komutları `ai/` içinden çalıştırın:**

```powershell
cd ai
.venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

Monorepo kökünden (`mediqueue-app/`) `uvicorn app.main:app` çalıştırırsanız `ModuleNotFoundError: No module named 'app'` alırsınız — Python `app` paketini `ai/app/` altında arar.

Swagger: http://localhost:8001/docs

Detaylı kurulum ve API dokümantasyonu: [`ai/README.md`](ai/README.md)
