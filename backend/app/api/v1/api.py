from fastapi import APIRouter

from app.api.v1 import (
    account,
    admin,
    appointment_messages,
    appointments,
    auth,
    clinics,
    doctors,
    match,
    patients,
    reviews,
)


api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(account.router)
api_router.include_router(clinics.router)
api_router.include_router(doctors.router)
api_router.include_router(patients.router)
api_router.include_router(appointments.router)
api_router.include_router(appointment_messages.router)
api_router.include_router(match.router)
api_router.include_router(reviews.router)
api_router.include_router(admin.router)
