from fastapi import APIRouter

from app.api.v1 import admin, auth, clinics, doctors, match, reviews


api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(clinics.router)
api_router.include_router(doctors.router)
api_router.include_router(match.router)
api_router.include_router(reviews.router)
api_router.include_router(admin.router)
