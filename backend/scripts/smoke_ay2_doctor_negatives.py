"""Ay 2 Azra smoke: doctor negative auth + availability persist.

Prerequisites: Postgres, migrations (incl. weekly_availability), seeds, backend :8000.
AI is optional — appointments/availability must work without it.

    cd backend
    .venv\\Scripts\\python.exe -m scripts.smoke_ay2_doctor_negatives
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request

BASE = "http://127.0.0.1:8000/v1"


def _request(
    method: str,
    path: str,
    *,
    token: str | None = None,
    form: dict[str, str] | None = None,
    json_body: dict | None = None,
    expect_error: int | None = None,
) -> dict | list | None:
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
            if expect_error is not None:
                raise RuntimeError(
                    f"{method} {path} expected HTTP {expect_error}, got {resp.status}"
                )
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        body = exc.read().decode(errors="replace")
        if expect_error is not None and exc.code == expect_error:
            return None
        raise RuntimeError(f"{method} {path} -> {exc.code}: {body}") from exc


def _login(email: str, password: str = "Demo1234!") -> tuple[str, dict]:
    token_resp = _request(
        "POST",
        "/auth/login",
        form={"username": email, "password": password},
    )
    if not isinstance(token_resp, dict):
        raise RuntimeError(f"Login unexpected: {token_resp}")
    token = str(token_resp["access_token"])
    me = _request("GET", "/auth/me", token=token)
    if not isinstance(me, dict):
        raise RuntimeError(f"/auth/me unexpected: {me}")
    return token, me


def main() -> int:
    # N4 — wrong password → 401
    _request(
        "POST",
        "/auth/login",
        form={"username": "doctor@mediqueue.com", "password": "WrongPass!"},
        expect_error=401,
    )
    print("N4 OK: wrong password -> 401")

    doctor_token, doctor_me = _login("doctor@mediqueue.com")
    doctor_id = doctor_me.get("doctor_id")
    if doctor_me.get("role") != "doctor" or doctor_id is None:
        raise RuntimeError(f"Doctor auth failed: {doctor_me}")
    doctor_id = int(doctor_id)

    patient_token, _ = _login("patient@mediqueue.com")

    # N1 — no token → 401
    _request("GET", f"/doctors/{doctor_id}/appointments", expect_error=401)
    print("N1 OK: no token -> 401")

    # N2 — patient JWT on doctor appointments → 403
    _request(
        "GET",
        f"/doctors/{doctor_id}/appointments",
        token=patient_token,
        expect_error=403,
    )
    print("N2 OK: patient JWT -> 403")

    # N3 — wrong doctor_id (self-only) → 403
    wrong_id = doctor_id + 9999
    _request(
        "GET",
        f"/doctors/{wrong_id}/appointments",
        token=doctor_token,
        expect_error=403,
    )
    print(f"N3 OK: doctor_id={wrong_id} -> 403")

    # N5 — availability GET/PUT round-trip (persist)
    before = _request("GET", f"/doctors/{doctor_id}/availability", token=doctor_token)
    if not isinstance(before, dict) or not before.get("days"):
        raise RuntimeError(f"Availability GET unexpected: {before}")

    days = before["days"]
    # Flip first slot of first day
    first_day = days[0]
    first_slot = first_day["slots"][0]
    flipped = not bool(first_slot["available"])
    first_slot["available"] = flipped

    saved = _request(
        "PUT",
        f"/doctors/{doctor_id}/availability",
        token=doctor_token,
        json_body={"days": days},
    )
    if not isinstance(saved, dict):
        raise RuntimeError(f"Availability PUT unexpected: {saved}")

    again = _request("GET", f"/doctors/{doctor_id}/availability", token=doctor_token)
    if not isinstance(again, dict):
        raise RuntimeError(f"Availability re-GET unexpected: {again}")
    got = again["days"][0]["slots"][0]["available"]
    if got != flipped:
        raise RuntimeError(f"Availability not persisted: expected {flipped}, got {got}")
    print(f"N5 OK: availability persist (slot available={flipped})")

    # N6 — appointments list still works without AI
    appts = _request("GET", f"/doctors/{doctor_id}/appointments", token=doctor_token)
    if not isinstance(appts, list):
        raise RuntimeError(f"Appointments unexpected: {appts}")
    print(f"N6 OK: appointments list without AI (count={len(appts)})")

    # Restore original first-slot value for idempotent re-runs
    first_slot["available"] = not flipped
    _request(
        "PUT",
        f"/doctors/{doctor_id}/availability",
        token=doctor_token,
        json_body={"days": days},
    )

    print("SMOKE AY2 DOCTOR NEGATIVES OK")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — CLI smoke
        print(f"SMOKE FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
