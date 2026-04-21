from fastapi import APIRouter, HTTPException

from app.services.ipl_service import (
    get_all_matches,
    get_all_teams,
    get_match_by_id,
    get_points_table,
    get_stats_summary,
    get_team_by_short_name,
    get_team_matches,
    get_team_stats,
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


@router.get("/teams/{short_name}/stats")
def get_team_stats_route(short_name: str):
    stats = get_team_stats(short_name)
    if not stats:
        raise HTTPException(status_code=404, detail="Team stats not found")
    return stats


@router.get("/teams/{short_name}/matches")
def get_team_matches_route(short_name: str):
    team = get_team_by_short_name(short_name)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return {"matches": get_team_matches(short_name)}


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


@router.get("/points-table")
def points_table():
    return {"points_table": get_points_table()}


@router.get("/stats/summary")
def stats_summary():
    return get_stats_summary()