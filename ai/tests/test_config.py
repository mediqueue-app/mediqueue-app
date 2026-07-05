"""Tests for environment-driven scoring configuration (app.core.config)."""

import importlib

import pytest

from app.core import config as config_module

SCORING_ENV_VARS = (
    "BASE_SCORE",
    "CITY_MATCH_BONUS",
    "MAX_RATING_BONUS",
    "MAX_EXPERIENCE_BONUS",
)

DEFAULT_SCORING_VALUES = {
    "BASE_SCORE": 60.0,
    "CITY_MATCH_BONUS": 15.0,
    "MAX_RATING_BONUS": 15.0,
    "MAX_EXPERIENCE_BONUS": 10.0,
}


@pytest.fixture(autouse=True)
def reset_config_module() -> None:
    """Reload config after each test so env monkeypatches do not leak."""
    yield
    importlib.reload(config_module)


class TestScoringConfigEnvOverrides:
    def test_scoring_defaults_when_env_unset(self, monkeypatch: pytest.MonkeyPatch) -> None:
        for variable in SCORING_ENV_VARS:
            monkeypatch.delenv(variable, raising=False)

        importlib.reload(config_module)

        assert config_module.BASE_SCORE == DEFAULT_SCORING_VALUES["BASE_SCORE"]
        assert config_module.CITY_MATCH_BONUS == DEFAULT_SCORING_VALUES["CITY_MATCH_BONUS"]
        assert config_module.MAX_RATING_BONUS == DEFAULT_SCORING_VALUES["MAX_RATING_BONUS"]
        assert config_module.MAX_EXPERIENCE_BONUS == DEFAULT_SCORING_VALUES["MAX_EXPERIENCE_BONUS"]

    def test_scoring_weights_read_from_environment_on_module_reload(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        monkeypatch.setenv("BASE_SCORE", "80")
        monkeypatch.setenv("CITY_MATCH_BONUS", "25")
        monkeypatch.setenv("MAX_RATING_BONUS", "12.5")
        monkeypatch.setenv("MAX_EXPERIENCE_BONUS", "7")

        importlib.reload(config_module)

        assert config_module.BASE_SCORE == 80.0
        assert config_module.CITY_MATCH_BONUS == 25.0
        assert config_module.MAX_RATING_BONUS == 12.5
        assert config_module.MAX_EXPERIENCE_BONUS == 7.0

    def test_scoring_constants_are_not_updated_without_module_reload(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        original_base_score = config_module.BASE_SCORE

        monkeypatch.setenv("BASE_SCORE", "99")

        assert config_module.BASE_SCORE == original_base_score
