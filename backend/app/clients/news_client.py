from typing import Any


def fetch_latest_ipl_news() -> dict[str, Any]:
    """
    Placeholder for real IPL news provider integration.
    """
    return {
        "source": "fallback",
        "last_updated": "2026-04-21T12:00:00Z",
        "articles": [
            {
                "id": 1,
                "headline": "SRH push for top-four finish with key mid-season win",
                "summary": "Sunrisers Hyderabad strengthened their playoff case with a strong all-round performance.",
                "source_name": "IPL News Desk",
                "published_at": "2026-04-21T09:00:00Z",
                "team_tags": ["SRH"],
            },
            {
                "id": 2,
                "headline": "CSK remain title contenders despite squad rotation",
                "summary": "Chennai Super Kings continue to look balanced with bat and ball as the season intensifies.",
                "source_name": "Cricket Central",
                "published_at": "2026-04-21T08:15:00Z",
                "team_tags": ["CSK"],
            },
            {
                "id": 3,
                "headline": "MI vs CSK rivalry shapes playoff narrative again",
                "summary": "The league's marquee rivalry is once again influencing momentum near the top of the table.",
                "source_name": "T20 Insight",
                "published_at": "2026-04-21T07:30:00Z",
                "team_tags": ["MI", "CSK"],
            },
        ],
    }