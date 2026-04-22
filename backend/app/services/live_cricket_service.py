from typing import Any

from app.clients.cricapi_client import fetch_live_matches, fetch_live_points_table


def get_live_matches() -> dict[str, Any]:
    data = fetch_live_matches()
    return {
        "source": data["source"],
        "last_updated": data["last_updated"],
        "matches": data["matches"],
    }


def get_live_points_table() -> dict[str, Any]:
    data = fetch_live_points_table()
    return {
        "source": data["source"],
        "last_updated": data["last_updated"],
        "points_table": data["points_table"],
    }