import sys
from unittest.mock import patch

import pytest

import docker_entrypoint


def _clear_relevant_env(monkeypatch: pytest.MonkeyPatch) -> None:
    for key in ("APP_ENV", "SEED_ON_START", "SKIP_MIGRATIONS"):
        monkeypatch.delenv(key, raising=False)


class TestProductionSeedGuard:
    def test_production_with_seed_on_start_exits_before_uvicorn(
        self, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
    ) -> None:
        _clear_relevant_env(monkeypatch)
        monkeypatch.setenv("APP_ENV", "production")
        monkeypatch.setenv("SEED_ON_START", "true")
        monkeypatch.setattr(sys, "argv", ["docker_entrypoint.py", "uvicorn", "app.main:app"])

        with patch("docker_entrypoint._run") as mock_run, patch("os.execvp") as mock_execvp:
            with pytest.raises(SystemExit) as exc_info:
                docker_entrypoint.main()

        assert exc_info.value.code != 0
        mock_run.assert_not_called()
        mock_execvp.assert_not_called()
        assert "production" in capsys.readouterr().err.lower()

    def test_production_without_seed_on_start_boots_normally(
        self, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        _clear_relevant_env(monkeypatch)
        monkeypatch.setenv("APP_ENV", "production")
        monkeypatch.setenv("SEED_ON_START", "false")
        monkeypatch.setattr(sys, "argv", ["docker_entrypoint.py", "uvicorn", "app.main:app"])

        with patch("docker_entrypoint._run", return_value=0) as mock_run, patch(
            "os.execvp"
        ) as mock_execvp:
            docker_entrypoint.main()

        mock_run.assert_called_once()
        mock_execvp.assert_called_once()


class TestStagingSeedWarning:
    def test_staging_with_seed_on_start_warns_but_boots(
        self, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
    ) -> None:
        _clear_relevant_env(monkeypatch)
        monkeypatch.setenv("APP_ENV", "staging")
        monkeypatch.setenv("SEED_ON_START", "true")
        monkeypatch.setattr(sys, "argv", ["docker_entrypoint.py", "uvicorn", "app.main:app"])

        with patch("docker_entrypoint._run", return_value=0) as mock_run, patch(
            "os.execvp"
        ) as mock_execvp:
            docker_entrypoint.main()

        mock_execvp.assert_called_once()
        assert mock_run.call_count >= 1
        assert "warning" in capsys.readouterr().err.lower()


class TestDevelopmentUnaffected:
    def test_development_with_seed_on_start_boots_without_warning(
        self, monkeypatch: pytest.MonkeyPatch, capsys: pytest.CaptureFixture[str]
    ) -> None:
        _clear_relevant_env(monkeypatch)
        monkeypatch.setenv("APP_ENV", "development")
        monkeypatch.setenv("SEED_ON_START", "true")
        monkeypatch.setattr(sys, "argv", ["docker_entrypoint.py", "uvicorn", "app.main:app"])

        with patch("docker_entrypoint._run", return_value=0), patch(
            "os.execvp"
        ) as mock_execvp:
            docker_entrypoint.main()

        mock_execvp.assert_called_once()
        assert capsys.readouterr().err == ""
