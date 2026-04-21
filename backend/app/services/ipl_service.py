import json
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

TEAMS_FILE = DATA_DIR / "teams.json"
MATCHES_FILE = DATA_DIR / "matches.json"


def load_json_file(file_path: Path) -> list[dict[str, Any]]:
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def get_all_teams() -> list[dict[str, Any]]:
    return load_json_file(TEAMS_FILE)


def get_team_by_short_name(short_name: str) -> dict[str, Any] | None:
    teams = get_all_teams()
    for team in teams:
        if team["short_name"].lower() == short_name.lower():
            return team
    return None


def get_all_matches() -> list[dict[str, Any]]:
    return load_json_file(MATCHES_FILE)


def get_upcoming_matches() -> list[dict[str, Any]]:
    matches = get_all_matches()
    return [match for match in matches if match["status"] == "upcoming"]


def get_match_by_id(match_id: int) -> dict[str, Any] | None:
    matches = get_all_matches()
    for match in matches:
        if match["id"] == match_id:
            return match
    return None