import logging
from contextlib import asynccontextmanager
from typing import Any, AsyncIterator

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.feedback import router as feedback_router
from app.api.routes import router
from app.core.dependencies import get_matcher_service
from app.core.config import (
    APP_NAME,
    APP_VERSION,
    ALLOWED_ORIGINS,
    DEBUG,
    HOST,
    PORT,
)

logging.basicConfig(
    level=logging.DEBUG if DEBUG else logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

OPENAPI_DESCRIPTION = """
MediQueue AI Service, hasta tercihlerine göre doktor eşleştirmesi yapan bağımsız bir microservice'tir.

Şu anki sürüm **kural tabanlı (rule-based) filtreleme ve skorlama** kullanır. Makine öğrenmesi, LLM veya NLP kullanılmaz; makine öğrenmesi modeli Faz 2'de eklenecektir.

## Entegrasyon Özeti

1. Önce `GET /health` ile servisin ayakta olduğunu doğrulayın.
2. `POST /match` endpoint'ine hasta tercihlerini JSON olarak gönderin.
3. Dönen `doctors` ve `clinics` listelerini skor sırasına göre kullanın.

## Desteklenen Uzmanlıklar

`Cardiology`, `Dermatology`, `Orthopedics`, `Neurology`, `Psychiatry`,
`Pediatrics`, `Gynecology`, `Dentistry`, `Plastic Surgery`,
`Hair Transplant`, `Aesthetic Surgery`, `Eye Surgery`, `Obesity Surgery`

Türkçe karşılıkları da kabul edilir (ör. `Kardiyoloji`, `Saç Ekimi`, `Estetik`, `Bariatrik`).

## Desteklenen Diller

`Turkish`, `English`, `Arabic`, `Russian`, `German` veya kısa kodlar (`tr`, `en`, `ar`, `ru`, `de`).
""".strip()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    try:
        doctor_count = len(get_matcher_service().load_doctors())
        logger.info(
            "Startup complete — loaded %d active doctors from PostgreSQL",
            doctor_count,
        )
    except Exception:
        logger.warning(
            "Startup — could not preload doctors from PostgreSQL",
            exc_info=True,
        )
    yield
    logger.info("Shutdown — %s stopping", APP_NAME)


app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description=OPENAPI_DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
    contact={
        "name": "MediQueue AI Team",
        "email": "ai-team@mediqueue.com",
    },
    license_info={
        "name": "Proprietary",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(feedback_router)


def _is_invalid_json_error(errors: list[dict[str, Any]]) -> bool:
    return any(error.get("type") == "json_invalid" for error in errors)


def _sanitize_validation_errors(errors: list[dict[str, Any]]) -> list[dict[str, Any]]:
    sanitized: list[dict[str, Any]] = []
    for error in errors:
        loc = error.get("loc")
        if not isinstance(loc, (list, tuple)):
            loc = []
        sanitized.append(
            {
                "type": error.get("type"),
                "loc": [part for part in loc if isinstance(part, (str, int))],
            }
        )
    return sanitized


def _safe_http_detail(status_code: int) -> str:
    if status_code >= 500:
        return "Internal server error"
    mapping = {
        400: "The request could not be processed",
        401: "Authentication required",
        403: "Access denied",
        404: "Resource not found",
        409: "This action conflicts with the current state",
        422: "Request validation failed",
        429: "Too many requests",
    }
    return mapping.get(status_code, "Request failed")


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    errors = exc.errors()
    if _is_invalid_json_error(errors):
        logger.warning("Invalid JSON payload on %s %s", request.method, request.url.path)
        return JSONResponse(
            status_code=400,
            content={"detail": "Invalid JSON payload"},
        )

    sanitized = _sanitize_validation_errors(errors)
    logger.warning(
        "Validation error on %s %s: %d issue(s)",
        request.method,
        request.url.path,
        len(sanitized),
    )
    return JSONResponse(
        status_code=422,
        content={"detail": sanitized},
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request,
    exc: StarletteHTTPException,
) -> JSONResponse:
    logger.warning(
        "HTTP error on %s %s: status=%s detail=%s",
        request.method,
        request.url.path,
        exc.status_code,
        exc.detail,
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": _safe_http_detail(exc.status_code)},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


@app.get("/", include_in_schema=False)
async def root() -> dict[str, Any]:
    return {
        "service": APP_NAME,
        "version": APP_VERSION,
        "docs": "/docs",
        "redoc": "/redoc",
        "openapi": "/openapi.json",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=HOST,
        port=PORT,
        reload=DEBUG,
    )
