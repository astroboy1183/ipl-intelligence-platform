from typing import Any

from app.services.ipl_service import get_all_matches, get_all_teams


def get_basic_analytics_overview() -> dict[str, Any]:
    teams = get_all_teams()
    matches = get_all_matches()

    live_count = len([m for m in matches if m["status"] == "live"])
    upcoming_count = len([m for m in matches if m["status"] == "upcoming"])
    completed_count = len([m for m in matches if m["status"] == "completed"])

    return {
        "total_teams": len(teams),
        "total_matches": len(matches),
        "live_matches": live_count,
        "upcoming_matches": upcoming_count,
        "completed_matches": completed_count,
    }