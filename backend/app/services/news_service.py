from typing import Any

from app.clients.news_client import fetch_latest_ipl_news


def get_latest_ipl_news() -> dict[str, Any]:
    data = fetch_latest_ipl_news()
    return {
        "source": data["source"],
        "last_updated": data["last_updated"],
        "articles": data["articles"],
    }