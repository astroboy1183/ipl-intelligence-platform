from fastapi import APIRouter

from app.services.analytics_service import get_basic_analytics_overview

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/overview")
def analytics_overview():
    return get_basic_analytics_overview()