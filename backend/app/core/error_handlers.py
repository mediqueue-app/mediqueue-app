from __future__ import annotations

import logging
from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger(__name__)

HTTP_STATUS_TO_CODE: dict[int, str] = {
    status.HTTP_400_BAD_REQUEST: "BAD_REQUEST",
    status.HTTP_401_UNAUTHORIZED: "UNAUTHORIZED",
    status.HTTP_403_FORBIDDEN: "FORBIDDEN",
    status.HTTP_404_NOT_FOUND: "NOT_FOUND",
    status.HTTP_409_CONFLICT: "CONFLICT",
    status.HTTP_422_UNPROCESSABLE_ENTITY: "VALIDATION_ERROR",
    status.HTTP_429_TOO_MANY_REQUESTS: "RATE_LIMITED",
    status.HTTP_502_BAD_GATEWAY: "BAD_GATEWAY",
    status.HTTP_503_SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    status.HTTP_504_GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
}

SAFE_HTTP_MESSAGES: dict[int, str] = {
    status.HTTP_400_BAD_REQUEST: "The request could not be processed",
    status.HTTP_401_UNAUTHORIZED: "Authentication required",
    status.HTTP_403_FORBIDDEN: "Access denied",
    status.HTTP_404_NOT_FOUND: "Resource not found",
    status.HTTP_409_CONFLICT: "This action conflicts with the current state",
    status.HTTP_422_UNPROCESSABLE_ENTITY: "Request validation failed",
    status.HTTP_429_TOO_MANY_REQUESTS: "Too many requests",
    status.HTTP_502_BAD_GATEWAY: "Upstream service unavailable",
    status.HTTP_503_SERVICE_UNAVAILABLE: "Service temporarily unavailable",
    status.HTTP_504_GATEWAY_TIMEOUT: "The request timed out",
}


def build_error_response(
    *,
    status_code: int,
    code: str,
    message: str,
    details: Any | None = None,
) -> JSONResponse:
    error_body: dict[str, Any] = {
        "code": code,
        "message": message,
    }
    if details is not None:
        error_body["details"] = details

    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": error_body,
        },
    )


def _http_error_code(status_code: int, detail: Any) -> str:
    text = detail if isinstance(detail, str) else ""
    lowered = text.lower()
    if status_code == status.HTTP_409_CONFLICT:
        if "email already exists" in lowered:
            return "EMAIL_TAKEN"
        if "active appointment already exists" in lowered:
            return "DUPLICATE_APPOINTMENT"
        if "already has an active appointment" in lowered:
            return "DOCTOR_DATE_CONFLICT"
    return HTTP_STATUS_TO_CODE.get(status_code, f"HTTP_{status_code}")


def _safe_http_message(status_code: int) -> str:
    if status_code in SAFE_HTTP_MESSAGES:
        return SAFE_HTTP_MESSAGES[status_code]
    if status_code >= 500:
        return "An unexpected error occurred"
    return "Request failed"


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


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError,
    ) -> JSONResponse:
        errors = _sanitize_validation_errors(exc.errors())
        logger.warning(
            "Validation error on %s %s: %d issue(s)",
            request.method,
            request.url.path,
            len(errors),
        )
        return build_error_response(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            code="VALIDATION_ERROR",
            message="Request validation failed",
            details=errors,
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(
        request: Request,
        exc: StarletteHTTPException,
    ) -> JSONResponse:
        if exc.status_code >= 500:
            logger.error(
                "HTTP error on %s %s: status=%s detail=%s",
                request.method,
                request.url.path,
                exc.status_code,
                exc.detail,
            )
        else:
            logger.warning(
                "HTTP error on %s %s: status=%s detail=%s",
                request.method,
                request.url.path,
                exc.status_code,
                exc.detail,
            )

        return build_error_response(
            status_code=exc.status_code,
            code=_http_error_code(exc.status_code, exc.detail),
            message=_safe_http_message(exc.status_code),
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(
        request: Request,
        exc: SQLAlchemyError,
    ) -> JSONResponse:
        logger.exception(
            "Database error on %s %s",
            request.method,
            request.url.path,
        )
        return build_error_response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            code="DATABASE_ERROR",
            message="An unexpected error occurred",
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        logger.exception(
            "Unhandled exception on %s %s",
            request.method,
            request.url.path,
        )
        return build_error_response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            code="INTERNAL_SERVER_ERROR",
            message="An unexpected error occurred",
        )
