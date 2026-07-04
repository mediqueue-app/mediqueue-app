from fastapi import FastAPI

from app.api.v1.api import api_router
from app.core.config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["health"])
def root() -> dict[str, str]:
    return {"status": "ok", "service": settings.PROJECT_NAME}
