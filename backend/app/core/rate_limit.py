"""Process-local sliding-window rate limiter (no external store).

M1 scope: single-process limiter for auth endpoints. Not shared across
multiple API replicas — a future milestone may move this to Redis if the
API is ever scaled horizontally behind the ALB.
"""

from __future__ import annotations

import threading
import time
from collections import defaultdict, deque

from fastapi import Request


class SlidingWindowRateLimiter:
    def __init__(self, *, max_attempts: int, window_seconds: float) -> None:
        self.max_attempts = max_attempts
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def check(self, key: str) -> float | None:
        """Record one attempt for `key`.

        Returns None if the attempt is allowed. Returns the number of
        seconds the caller should wait before retrying if the limit for
        the current window has already been reached.
        """
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            cutoff = now - self.window_seconds
            while hits and hits[0] <= cutoff:
                hits.popleft()

            if len(hits) >= self.max_attempts:
                retry_after = hits[0] + self.window_seconds - now
                return max(retry_after, 0.0)

            hits.append(now)
            return None

    def reset(self) -> None:
        """Clear all tracked state. Intended for test isolation."""
        with self._lock:
            self._hits.clear()


def client_identity(request: Request) -> str:
    """Best-effort caller identity for rate-limit keys.

    Uses the first hop of X-Forwarded-For when present (the ALB-fronted
    staging/production scenario), otherwise falls back to the direct
    connection's client host. Never derived from credentials.
    """
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        first_hop = forwarded.split(",")[0].strip()
        if first_hop:
            return first_hop[:64]
    if request.client is not None:
        return request.client.host
    return "unknown"
