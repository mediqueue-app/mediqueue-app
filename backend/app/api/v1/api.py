from fastapi import APIRouter

from app.api.v1 import auth, clinics, match


api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(clinics.router)
api_router.include_router(match.router)
