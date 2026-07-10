"""Ay 1 E2E smoke: patient books → clinic confirms → doctor sees appointment.

Prerequisites: Postgres, seeds, backend :8000, AI :8001 (AI optional for this path).

    cd backend
    .venv\\Scripts\\python.exe -m scripts.smoke_ay1_e2e
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, timedelta

BASE = "http://127.0.0.1:8000/v1"


def _request(
    method: str,
    path: str,
    *,
    token: str | None = None,
    form: dict[str, str] | None = None,
    json_body: dict | None = None,
) -> dict | list:
    headers: dict[str, str] = {}
    data: bytes | None = None
    if form is not None:
        data = urllib.parse.urlencode(form).encode()
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    if json_body is not None:
        data = json.dumps(json_body).encode()
        headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = urllib.request.Request(f"{BASE}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        body = exc.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} -> {exc.code}: {body}") from exc


def _login(email: str, password: str = "Demo1234!") -> tuple[str, dict]:
    token_resp = _request(
        "POST",
        "/auth/login",
        form={"username": email, "password": password},
    )
    token = str(token_resp["access_token"])
    me = _request("GET", "/auth/me", token=token)
    if not isinstance(me, dict):
        raise RuntimeError(f"/auth/me unexpected: {me}")
    return token, me


def _ensure_patient(token: str, user: dict) -> dict:
    try:
        me = _request("GET", "/patients/me", token=token)
        if isinstance(me, dict):
            return me
    except RuntimeError as exc:
        if "404" not in str(exc):
            raise

    created = _request(
        "POST",
        "/patients",
        token=token,
        json_body={
            "full_name": user.get("full_name") or user.get("email", "Demo Patient"),
            "email": user.get("email"),
        },
    )
    if not isinstance(created, dict):
        raise RuntimeError(f"POST /patients unexpected: {created}")
    return created


def main() -> int:
    # Book against the seeded demo clinic/doctor — not clinics[0] (name-ordered).
    clinic_token, clinic_user = _login("clinic@mediqueue.com")
    if clinic_user.get("role") != "clinic" or clinic_user.get("clinic_id") is None:
        raise RuntimeError(f"Clinic auth failed: {clinic_user}")
    clinic_id = int(clinic_user["clinic_id"])

    doctor_token, doctor_user = _login("doctor@mediqueue.com")
    doctor_id = doctor_user.get("doctor_id")
    if doctor_user.get("role") != "doctor" or doctor_id is None:
        raise RuntimeError(f"Doctor auth failed: {doctor_user}")
    doctor_id = int(doctor_id)

    patient_token, patient_user = _login("patient@mediqueue.com")
    if patient_user.get("role") != "patient":
        raise RuntimeError(f"Expected patient role, got {patient_user}")

    clinic = _request("GET", f"/clinics/{clinic_id}", token=patient_token)
    if not isinstance(clinic, dict):
        raise RuntimeError(f"Demo clinic {clinic_id} not found")

    doctors = _request("GET", f"/clinics/{clinic_id}/doctors", token=patient_token)
    if not isinstance(doctors, list) or not any(int(d["id"]) == doctor_id for d in doctors):
        raise RuntimeError(
            f"Demo doctor_id={doctor_id} is not linked to clinic_id={clinic_id}"
        )

    patient = _ensure_patient(patient_token, patient_user)
    requested = (date.today() + timedelta(days=7)).isoformat()

    created = _request(
        "POST",
        "/appointments",
        token=patient_token,
        json_body={
            "patient_id": patient["id"],
            "clinic_id": clinic_id,
            "doctor_id": doctor_id,
            "branch": "Main",
            "requested_date": requested,
            "notes": "Ay1 E2E smoke",
        },
    )
    if not isinstance(created, dict) or created.get("status") != "pending":
        raise RuntimeError(f"Expected pending appointment, got {created}")
    appointment_id = int(created["id"])

    clinic_appts = _request(
        "GET",
        f"/clinics/{clinic_id}/appointments",
        token=clinic_token,
    )
    if not isinstance(clinic_appts, list) or not any(
        int(item["id"]) == appointment_id for item in clinic_appts
    ):
        raise RuntimeError(f"Clinic inbox missing appointment {appointment_id}")

    confirmed = _request(
        "PATCH",
        f"/appointments/{appointment_id}/status",
        token=clinic_token,
        json_body={"status": "confirmed"},
    )
    if not isinstance(confirmed, dict) or confirmed.get("status") != "confirmed":
        raise RuntimeError(f"Confirm failed: {confirmed}")

    doctor_appts = _request(
        "GET",
        f"/doctors/{doctor_id}/appointments",
        token=doctor_token,
    )
    if not isinstance(doctor_appts, list):
        raise RuntimeError(f"Doctor appointments unexpected: {doctor_appts}")

    visible = [item for item in doctor_appts if int(item["id"]) == appointment_id]
    if not visible:
        raise RuntimeError(
            f"Doctor {doctor_id} does not see appointment {appointment_id}"
        )

    print("E2E SMOKE OK")
    print(f"  appointment_id={appointment_id} clinic_id={clinic_id} doctor_id={doctor_id}")
    print(f"  status={confirmed.get('status')} doctor_visible={bool(visible)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — CLI smoke
        print(f"E2E SMOKE FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
