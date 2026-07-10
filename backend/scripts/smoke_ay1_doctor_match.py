"""Ay 1 Azra smoke: doctor auth + appointments + /v1/match hit/empty.

Prerequisites: Postgres, migrations, seeds, backend :8000, AI :8001.

    cd backend
    .venv\\Scripts\\python.exe -m scripts.smoke_ay1_doctor_match
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
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        body = exc.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} -> {exc.code}: {body}") from exc


def main() -> int:
    doctor_login = _request(
        "POST",
        "/auth/login",
        form={"username": "doctor@mediqueue.com", "password": "Demo1234!"},
    )
    doctor_token = str(doctor_login["access_token"])
    me = _request("GET", "/auth/me", token=doctor_token)
    if me.get("role") != "doctor" or me.get("doctor_id") is None:
        raise RuntimeError(f"Doctor /auth/me failed: {me}")
    doctor_id = me["doctor_id"]
    appts = _request("GET", f"/doctors/{doctor_id}/appointments", token=doctor_token)
    if not isinstance(appts, list):
        raise RuntimeError(f"Appointments not a list: {appts}")

    patient_login = _request(
        "POST",
        "/auth/login",
        form={"username": "patient@mediqueue.com", "password": "Demo1234!"},
    )
    patient_token = str(patient_login["access_token"])

    hit = _request(
        "POST",
        "/match",
        token=patient_token,
        json_body={
            "specialty": "Cardiology",
            "language": "Turkish",
            "budget": 3000,
            "city": "Istanbul",
        },
    )
    if not hit.get("doctors") and not hit.get("clinics"):
        raise RuntimeError(f"Match HIT expected results: {hit}")

    empty = _request(
        "POST",
        "/match",
        token=patient_token,
        json_body={"specialty": "Cardiology", "language": "Japanese", "budget": 1},
    )
    if empty.get("doctors") or empty.get("clinics") or not empty.get("message"):
        raise RuntimeError(f"Match EMPTY expected empty+message: {empty}")

    print("SMOKE OK")
    print(f"  doctor_id={doctor_id} appointments={len(appts)}")
    print(f"  match_hit doctors={len(hit.get('doctors', []))} clinics={len(hit.get('clinics', []))}")
    print(f"  match_empty message={empty.get('message')!r}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — CLI smoke
        print(f"SMOKE FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
