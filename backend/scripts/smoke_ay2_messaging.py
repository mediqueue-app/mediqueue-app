"""Ay 2 messaging smoke: patient↔clinic messages on a confirmed appointment.

Prerequisites: Postgres, seeds, backend :8000.

Environment (optional overrides):

    MEDIQUEUE_API_BASE   default http://127.0.0.1:8000/v1
    MEDIQUEUE_PASSWORD   default Demo1234!  (local seed users only)
    MEDIQUEUE_PATIENT_EMAIL  default patient@mediqueue.com
    MEDIQUEUE_CLINIC_EMAIL   default clinic@mediqueue.com
    MEDIQUEUE_DOCTOR_EMAIL   default doctor@mediqueue.com

    cd backend
    .venv\\Scripts\\python.exe -m scripts.smoke_ay2_messaging
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, timedelta

BASE = os.environ.get("MEDIQUEUE_API_BASE", "http://127.0.0.1:8000/v1").rstrip("/")
PASSWORD = os.environ.get("MEDIQUEUE_PASSWORD", "Demo1234!")
PATIENT_EMAIL = os.environ.get("MEDIQUEUE_PATIENT_EMAIL", "patient@mediqueue.com")
CLINIC_EMAIL = os.environ.get("MEDIQUEUE_CLINIC_EMAIL", "clinic@mediqueue.com")
DOCTOR_EMAIL = os.environ.get("MEDIQUEUE_DOCTOR_EMAIL", "doctor@mediqueue.com")


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


def _login(email: str, password: str = PASSWORD) -> tuple[str, dict]:
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


def _expect_http_error(
    method: str,
    path: str,
    *,
    token: str,
    json_body: dict | None = None,
    expected_codes: set[int],
) -> None:
    headers: dict[str, str] = {"Authorization": f"Bearer {token}"}
    data: bytes | None = None
    if json_body is not None:
        data = json.dumps(json_body).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(f"{BASE}{path}", data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raise RuntimeError(
                f"Expected HTTP {sorted(expected_codes)} for {method} {path}, "
                f"got {resp.status}"
            )
    except urllib.error.HTTPError as exc:
        if exc.code not in expected_codes:
            body = exc.read().decode(errors="replace")
            raise RuntimeError(
                f"Expected HTTP {sorted(expected_codes)} for {method} {path}, "
                f"got {exc.code}: {body}"
            ) from exc


def main() -> int:
    clinic_token, clinic_user = _login(CLINIC_EMAIL)
    if clinic_user.get("role") != "clinic" or clinic_user.get("clinic_id") is None:
        raise RuntimeError(f"Clinic auth failed: {clinic_user}")
    clinic_id = int(clinic_user["clinic_id"])

    doctor_token, doctor_user = _login(DOCTOR_EMAIL)
    doctor_id = doctor_user.get("doctor_id")
    if doctor_user.get("role") != "doctor" or doctor_id is None:
        raise RuntimeError(f"Doctor auth failed: {doctor_user}")
    doctor_id = int(doctor_id)

    patient_token, patient_user = _login(PATIENT_EMAIL)
    if patient_user.get("role") != "patient":
        raise RuntimeError(f"Expected patient role, got {patient_user}")

    clinic = _request("GET", f"/clinics/{clinic_id}", token=patient_token)
    if not isinstance(clinic, dict):
        raise RuntimeError(f"Demo clinic {clinic_id} not found")

    patient = _ensure_patient(patient_token, patient_user)
    # Offset further than Ay1 smoke to reduce date-level conflict collisions.
    requested = (date.today() + timedelta(days=21)).isoformat()

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
            "notes": "Ay2 messaging smoke",
        },
    )
    if not isinstance(created, dict) or created.get("status") != "pending":
        raise RuntimeError(f"Expected pending appointment, got {created}")
    appointment_id = int(created["id"])

    confirmed = _request(
        "PATCH",
        f"/appointments/{appointment_id}/status",
        token=clinic_token,
        json_body={"status": "confirmed"},
    )
    if not isinstance(confirmed, dict) or confirmed.get("status") != "confirmed":
        raise RuntimeError(f"Confirm failed: {confirmed}")

    patient_msg_body = "Hello clinic — messaging smoke from patient"
    patient_msg = _request(
        "POST",
        f"/appointments/{appointment_id}/messages",
        token=patient_token,
        json_body={"body": patient_msg_body},
    )
    if not isinstance(patient_msg, dict) or patient_msg.get("body") != patient_msg_body:
        raise RuntimeError(f"Patient message failed: {patient_msg}")
    if patient_msg.get("sender_role") != "patient":
        raise RuntimeError(f"Unexpected sender_role: {patient_msg}")

    clinic_list = _request(
        "GET",
        f"/appointments/{appointment_id}/messages",
        token=clinic_token,
    )
    if not isinstance(clinic_list, list):
        raise RuntimeError(f"Clinic message list unexpected: {clinic_list}")
    if not any(item.get("body") == patient_msg_body for item in clinic_list):
        raise RuntimeError("Clinic list missing patient message")

    clinic_msg_body = "Hello patient — clinic reply smoke"
    clinic_msg = _request(
        "POST",
        f"/appointments/{appointment_id}/messages",
        token=clinic_token,
        json_body={"body": clinic_msg_body},
    )
    if not isinstance(clinic_msg, dict) or clinic_msg.get("body") != clinic_msg_body:
        raise RuntimeError(f"Clinic reply failed: {clinic_msg}")

    patient_list = _request(
        "GET",
        f"/appointments/{appointment_id}/messages",
        token=patient_token,
    )
    if not isinstance(patient_list, list):
        raise RuntimeError(f"Patient message list unexpected: {patient_list}")
    if not any(item.get("body") == clinic_msg_body for item in patient_list):
        raise RuntimeError("Patient list missing clinic reply")
    if len(patient_list) < 2:
        raise RuntimeError(f"Expected at least 2 messages, got {len(patient_list)}")

    # Doctor must not access patient↔clinic messaging.
    _expect_http_error(
        "GET",
        f"/appointments/{appointment_id}/messages",
        token=doctor_token,
        expected_codes={403},
    )
    _expect_http_error(
        "POST",
        f"/appointments/{appointment_id}/messages",
        token=doctor_token,
        json_body={"body": "doctor should fail"},
        expected_codes={403},
    )

    print("MESSAGING SMOKE OK")
    print(f"  appointment_id={appointment_id} clinic_id={clinic_id} doctor_id={doctor_id}")
    print(f"  messages={len(patient_list)} patient_visible=True clinic_visible=True")
    print("  doctor_blocked=True")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — CLI smoke
        print(f"MESSAGING SMOKE FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
