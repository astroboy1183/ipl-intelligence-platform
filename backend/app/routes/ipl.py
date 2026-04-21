from fastapi import APIRouter

router = APIRouter(prefix="/ipl", tags=["ipl"])


@router.get("/teams")
def get_teams():
    return {
        "teams": [
            {"id": 1, "name": "Chennai Super Kings", "short_name": "CSK"},
            {"id": 2, "name": "Mumbai Indians", "short_name": "MI"},
            {"id": 3, "name": "Royal Challengers Bengaluru", "short_name": "RCB"},
            {"id": 4, "name": "Kolkata Knight Riders", "short_name": "KKR"},
            {"id": 5, "name": "Sunrisers Hyderabad", "short_name": "SRH"},
            {"id": 6, "name": "Rajasthan Royals", "short_name": "RR"},
            {"id": 7, "name": "Delhi Capitals", "short_name": "DC"},
            {"id": 8, "name": "Punjab Kings", "short_name": "PBKS"},
            {"id": 9, "name": "Gujarat Titans", "short_name": "GT"},
            {"id": 10, "name": "Lucknow Super Giants", "short_name": "LSG"},
        ]
    }


@router.get("/matches")
def get_matches():
    return {
        "matches": [
            {
                "id": 1,
                "team1": "CSK",
                "team2": "MI",
                "venue": "Chennai",
                "date": "2026-03-28",
                "status": "upcoming",
            },
            {
                "id": 2,
                "team1": "RCB",
                "team2": "KKR",
                "venue": "Bengaluru",
                "date": "2026-03-29",
                "status": "upcoming",
            },
        ]
    }