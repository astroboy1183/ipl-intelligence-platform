from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analytics import router as analytics_router
from app.routes.health import router as health_router
from app.routes.ipl import router as ipl_router
from app.routes.live import router as live_router
from app.routes.news import router as news_router

app = FastAPI(
    title="IPL Intelligence API",
    description="Backend API for the IPL Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(ipl_router)
app.include_router(live_router)
app.include_router(news_router)
app.include_router(analytics_router)


@app.get("/")
def read_root():
    return {"message": "IPL Intelligence API is running"}