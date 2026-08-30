"""One-shot local .env helper — writes SECRET_KEY and ENCRYPTION_KEY if missing."""
from __future__ import annotations

import re
import secrets
from pathlib import Path

from cryptography.fernet import Fernet


def main() -> None:
    env_path = Path(__file__).resolve().parents[1] / ".env"
    text = env_path.read_text(encoding="utf-8")

    if not re.search(r"^SECRET_KEY=.+", text, re.M) or "replace-this" in text:
        text = re.sub(
            r"^SECRET_KEY=.*$",
            f"SECRET_KEY={secrets.token_urlsafe(48)}",
            text,
            flags=re.M,
        )

    if re.search(r"^ENCRYPTION_KEY=\s*$", text, re.M):
        text = re.sub(
            r"^ENCRYPTION_KEY=.*$",
            f"ENCRYPTION_KEY={Fernet.generate_key().decode()}",
            text,
            flags=re.M,
        )

    env_path.write_text(text, encoding="utf-8")
    print("Updated backend/.env with local development keys.")


if __name__ == "__main__":
    main()
