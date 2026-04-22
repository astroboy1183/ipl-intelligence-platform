from fastapi import APIRouter

from app.services.live_cricket_service import get_live_matches, get_live_points_table

router = APIRouter(prefix="/ipl/live", tags=["ipl-live"])


@router.get("/matches")
def live_matches():
    return get_live_matches()


@router.get("/points-table")
def live_points_table():
    return get_live_points_table()