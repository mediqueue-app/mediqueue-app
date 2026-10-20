import logging

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.v1.api import api_router
from app.core.config import PROTECTED_ENVIRONMENTS, Settings, settings
from app.core.error_handlers import register_exception_handlers
from app.core.logging_config import configure_logging
from app.db.session import get_db

configure_logging()
logger = logging.getLogger(__name__)


def _docs_urls(app_env: str, enable_api_docs: bool) -> tuple[str | None, str | None, str | None]:
    """(openapi_url, docs_url, redoc_url) — None disables the route entirely.

    Protected environments (staging, production) are locked by default;
    ENABLE_API_DOCS=true is the only way to re-enable them there.
    """
    is_protected = app_env.strip().lower() in PROTECTED_ENVIRONMENTS
    docs_enabled = not is_protected or enable_api_docs
    if docs_enabled:
        return "/openapi.json", "/docs", "/redoc"
    return None, None, None


def create_app(app_settings: Settings = settings) -> FastAPI:
    openapi_url, docs_url, redoc_url = _docs_urls(
        app_settings.APP_ENV, app_settings.ENABLE_API_DOCS
    )

    fastapi_app = FastAPI(
        title=app_settings.PROJECT_NAME,
        version="0.1.0",
        openapi_url=openapi_url,
        docs_url=docs_url,
        redoc_url=redoc_url,
    )

    fastapi_app.add_middleware(
        CORSMiddleware,
        allow_origins=app_settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(fastapi_app)

    fastapi_app.include_router(api_router, prefix=app_settings.API_V1_PREFIX)

    @fastapi_app.get("/", tags=["health"])
    def root() -> dict[str, str]:
        """Process liveness only — must never depend on the database."""
        return {"status": "ok", "service": app_settings.PROJECT_NAME}

    @fastapi_app.get("/health", tags=["health"])
    def health(db: Session = Depends(get_db)) -> JSONResponse:
        """DB-aware readiness check (no auth). Compose/ALB target this."""
        try:
            db.execute(text("SELECT 1"))
        except SQLAlchemyError:
            logger.error("Health check failed: database unreachable", exc_info=True)
            return JSONResponse(
                status_code=503,
                content={
                    "status": "error",
                    "service": app_settings.PROJECT_NAME,
                    "database": "error",
                },
            )

        return JSONResponse(
            status_code=200,
            content={
                "status": "ok",
                "service": app_settings.PROJECT_NAME,
                "database": "ok",
            },
        )

    return fastapi_app


app = create_app()
