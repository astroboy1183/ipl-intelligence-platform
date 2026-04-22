"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MatchCard from "./components/MatchCard";
import NewsCard from "./components/NewsCard";
import StatCard from "./components/StatCard";
import TeamCard from "./components/TeamCard";

type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

type Article = {
  id: number;
  headline: string;
  summary: string;
  source_name: string;
  published_at: string;
  team_tags: string[];
};

type Overview = {
  total_teams: number;
  total_matches: number;
  live_matches: number;
  upcoming_matches: number;
  completed_matches: number;
};

type Team = {
  id: number;
  name: string;
  short_name: string;
  city: string;
};

export default function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<Article[]>([]);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (!apiUrl) return;

    const fetchData = async () => {
      try {
        const [matchesRes, newsRes, analyticsRes, teamsRes] = await Promise.all([
          fetch(`${apiUrl}/ipl/live/matches`),
          fetch(`${apiUrl}/news/ipl/latest`),
          fetch(`${apiUrl}/analytics/overview`),
          fetch(`${apiUrl}/ipl/teams`),
        ]);

        const matchesData = await matchesRes.json();
        const newsData = await newsRes.json();
        const analyticsData = await analyticsRes.json();
        const teamsData = await teamsRes.json();

        setMatches(matchesData.matches || []);
        setNews(newsData.articles || []);
        setOverview(analyticsData);
        setTeams((teamsData.teams || []).slice(0, 4));
      } catch (error) {
        console.error("Error loading homepage data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">IPL Intelligence Platform</h1>
      <p className="page-subtitle">
        Your multi-page IPL intelligence hub for teams, matches, news, and analytics.
      </p>

      <div className="grid-3 section-space">
        <StatCard title="Teams" value={overview?.total_teams ?? 0} />
        <StatCard title="Matches" value={overview?.total_matches ?? 0} />
        <StatCard title="Live Matches" value={overview?.live_matches ?? 0} />
      </div>

      <div className="section-space">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Featured Teams</h2>
          <Link href="/teams" className="badge">
            View All Teams
          </Link>
        </div>

        <div className="grid-2">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div>
          <h2>Live / Upcoming Matches</h2>
          {matches.map((match) => (
            <div key={match.id} style={{ marginBottom: "16px" }}>
              <MatchCard match={match} />
            </div>
          ))}
        </div>

        <div>
          <h2>Latest IPL News</h2>
          {news.map((article) => (
            <div key={article.id} style={{ marginBottom: "16px" }}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}