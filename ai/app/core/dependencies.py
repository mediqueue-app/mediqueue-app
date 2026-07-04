from functools import lru_cache

from app.services.matcher import MatcherService


@lru_cache()
def get_matcher_service() -> MatcherService:
    return MatcherService()
