from fastapi import APIRouter, HTTPException

from app.services.ipl_service import (
    get_all_matches,
    get_all_teams,
    get_match_by_id,
    get_team_by_short_name,
    get_upcoming_matches,
)

router = APIRouter(prefix="/ipl", tags=["ipl"])


@router.get("/teams")
def get_teams():
    return {"teams": get_all_teams()}


@router.get("/teams/{short_name}")
def get_team(short_name: str):
    team = get_team_by_short_name(short_name)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@router.get("/matches")
def get_matches():
    return {"matches": get_all_matches()}


@router.get("/matches/upcoming")
def upcoming_matches():
    return {"matches": get_upcoming_matches()}


@router.get("/matches/{match_id}")
def get_match(match_id: int):
    match = get_match_by_id(match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match