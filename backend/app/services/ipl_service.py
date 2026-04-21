import json
from pathlib import Path
from typing import Any


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

TEAMS_FILE = DATA_DIR / "teams.json"
MATCHES_FILE = DATA_DIR / "matches.json"
POINTS_TABLE_FILE = DATA_DIR / "points_table.json"
TEAM_STATS_FILE = DATA_DIR / "team_stats.json"


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


def get_team_matches(short_name: str) -> list[dict[str, Any]]:
    matches = get_all_matches()
    return [
        match
        for match in matches
        if match["team1"].lower() == short_name.lower()
        or match["team2"].lower() == short_name.lower()
    ]


def get_points_table() -> list[dict[str, Any]]:
    return load_json_file(POINTS_TABLE_FILE)


def get_team_stats(short_name: str) -> dict[str, Any] | None:
    stats = load_json_file(TEAM_STATS_FILE)
    for team in stats:
        if team["team"].lower() == short_name.lower():
            return team
    return None


def get_stats_summary() -> dict[str, Any]:
    teams = get_all_teams()
    matches = get_all_matches()
    points_table = get_points_table()

    top_team = points_table[0] if points_table else None
    total_titles = sum(team.get("titles", 0) for team in load_json_file(TEAM_STATS_FILE))

    return {
        "total_teams": len(teams),
        "total_matches": len(matches),
        "top_team": top_team["team"] if top_team else None,
        "top_team_points": top_team["points"] if top_team else None,
        "combined_titles": total_titles,
    }