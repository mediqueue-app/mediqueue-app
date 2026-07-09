from __future__ import annotations

from cryptography.fernet import Fernet, InvalidToken

from app.core.config import settings


def _get_fernet() -> Fernet:
    key = settings.ENCRYPTION_KEY.strip()
    if not key:
        raise ValueError("ENCRYPTION_KEY is not configured")
    try:
        return Fernet(key.encode("utf-8"))
    except Exception as exc:  # pragma: no cover - defensive fallback
        raise ValueError("ENCRYPTION_KEY is invalid") from exc


def encrypt_health_history(plain_text: str | None) -> str | None:
    if plain_text is None:
        return None
    value = plain_text.strip()
    if not value:
        return None
    fernet = _get_fernet()
    return fernet.encrypt(value.encode("utf-8")).decode("utf-8")


def decrypt_health_history(cipher_text: str | None) -> str | None:
    if cipher_text is None:
        return None
    fernet = _get_fernet()
    try:
        return fernet.decrypt(cipher_text.encode("utf-8")).decode("utf-8")
    except InvalidToken as exc:
        raise ValueError("Encrypted health history cannot be decrypted") from exc
