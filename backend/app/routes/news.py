from fastapi import APIRouter

from app.services.news_service import get_latest_ipl_news

router = APIRouter(prefix="/news", tags=["news"])


@router.get("/ipl/latest")
def latest_ipl_news():
    return get_latest_ipl_news()