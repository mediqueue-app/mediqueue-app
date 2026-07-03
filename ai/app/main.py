import logging
from contextlib import asynccontextmanager
from typing import Any, AsyncIterator

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.routes import router
from app.services.matcher import matcher_service
from app.core.config import (
    APP_NAME,
    APP_VERSION,
    CORS_ORIGINS,
    DEBUG,
    DOCTORS_JSON_PATH,
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

## Entegrasyon Özeti

1. Önce `GET /health` ile servisin ayakta olduğunu doğrulayın.
2. `POST /match` endpoint'ine hasta tercihlerini JSON olarak gönderin.
3. Dönen `matches` listesini skor sırasına göre kullanın.

## Desteklenen Uzmanlıklar

`Cardiology`, `Dermatology`, `Orthopedics`, `Neurology`, `Psychiatry`,
`Pediatrics`, `Gynecology`, `Dentistry`, `Plastic Surgery`

Türkçe karşılıkları da kabul edilir (ör. `Kardiyoloji`).

## Desteklenen Diller

`Turkish`, `English`, `Arabic`, `Russian`, `German` veya kısa kodlar (`tr`, `en`, `ar`, `ru`, `de`).
""".strip()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    doctor_count = len(matcher_service.load_doctors())
    logger.info(
        "Startup complete — loaded %d doctors from %s",
        doctor_count,
        DOCTORS_JSON_PATH,
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
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


def _is_invalid_json_error(errors: list[dict[str, Any]]) -> bool:
    return any(error.get("type") == "json_invalid" for error in errors)


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

    logger.warning("Validation error on %s %s: %s", request.method, request.url.path, errors)
    return JSONResponse(
        status_code=422,
        content={"detail": errors},
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(
    request: Request,
    exc: StarletteHTTPException,
) -> JSONResponse:
    logger.warning("HTTP error on %s %s: %s", request.method, request.url.path, exc.detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
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
