"""API container entrypoint: migrate (and optionally seed) before uvicorn."""

from __future__ import annotations

import os
import subprocess
import sys


def _flag(name: str, default: str = "false") -> bool:
    return os.environ.get(name, default).strip().lower() in {"1", "true", "yes"}


def _run(args: list[str], *, check: bool = True) -> int:
    print(f"+ {' '.join(args)}", flush=True)
    completed = subprocess.run(args, check=False)
    if check and completed.returncode != 0:
        raise SystemExit(completed.returncode)
    return completed.returncode


def main() -> None:
    command = sys.argv[1:]
    if not command:
        raise SystemExit("docker_entrypoint: missing command")

    is_server = command[0] == "uvicorn"
    app_env = os.environ.get("APP_ENV", "development").strip().lower()
    seed_on_start = _flag("SEED_ON_START")

    if is_server and app_env == "production" and seed_on_start:
        print(
            "FATAL: SEED_ON_START=true is forbidden when APP_ENV=production. "
            "Refusing to start so the production database is never silently "
            "seeded. Set SEED_ON_START=false and restart.",
            file=sys.stderr,
            flush=True,
        )
        raise SystemExit(1)

    if is_server and app_env == "staging" and seed_on_start:
        print(
            "WARNING: SEED_ON_START=true in staging. This should only be used "
            "for the initial staging boot — set SEED_ON_START=false afterward "
            "(see backend/STAGING.md).",
            file=sys.stderr,
            flush=True,
        )

    if is_server and not _flag("SKIP_MIGRATIONS"):
        _run(["alembic", "upgrade", "head"])

    if is_server and seed_on_start:
        for module in (
            "scripts.seed_doctors_from_ai_json",
            "scripts.seed_clinics_from_ai_json",
            "scripts.seed_demo_users",
        ):
            code = _run([sys.executable, "-m", module], check=False)
            if code != 0:
                print(f"warning: {module} exited {code}; continuing", flush=True)

    os.execvp(command[0], command)


if __name__ == "__main__":
    main()
