from typing import Any


def fetch_live_matches() -> dict[str, Any]:
    """
    Placeholder for real live cricket API integration.
    Later, replace this with actual API calls using requests/httpx.
    """
    return {
        "source": "fallback",
        "last_updated": "2026-04-21T12:00:00Z",
        "matches": [
            {
                "id": 101,
                "team1": "SRH",
                "team2": "DC",
                "venue": "Hyderabad",
                "date": "2026-04-21",
                "status": "live",
            },
            {
                "id": 102,
                "team1": "LSG",
                "team2": "RR",
                "venue": "Lucknow",
                "date": "2026-04-22",
                "status": "upcoming",
            },
        ],
    }


def fetch_live_points_table() -> dict[str, Any]:
    """
    Placeholder for live standings API.
    """
    return {
        "source": "fallback",
        "last_updated": "2026-04-21T12:00:00Z",
        "points_table": [
            {"position": 1, "team": "CSK", "played": 14, "won": 9, "lost": 5, "points": 18, "net_run_rate": 0.82},
            {"position": 2, "team": "MI", "played": 14, "won": 9, "lost": 5, "points": 18, "net_run_rate": 0.64},
            {"position": 3, "team": "RCB", "played": 14, "won": 8, "lost": 6, "points": 16, "net_run_rate": 0.41},
            {"position": 4, "team": "KKR", "played": 14, "won": 8, "lost": 6, "points": 16, "net_run_rate": 0.22},
        ],
    }