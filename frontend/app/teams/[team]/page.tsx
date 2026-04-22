"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Team = {
  id: number;
  name: string;
  short_name: string;
  city: string;
};

type TeamStats = {
  team: string;
  full_name: string;
  captain: string;
  home_ground: string;
  titles: number;
  fan_rating: number;
};

type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

type TeamIntelligence = {
  team: Team;
  stats: TeamStats;
  recent_matches: Match[];
  insight: string;
};

export default function TeamDetailPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const teamParam = params?.team as string;

  const [data, setData] = useState<TeamIntelligence | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!apiUrl || !teamParam) return;

    const fetchTeamIntelligence = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/ipl/teams/${teamParam.toUpperCase()}/intelligence`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch team intelligence: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error loading team intelligence:", err);
        setError("Could not load team intelligence.");
      }
    };

    fetchTeamIntelligence();
  }, [apiUrl, teamParam]);

  if (error) {
    return (
      <main>
        <h1 className="page-title">Team page error</h1>
        <p className="page-subtitle">{error}</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <h1 className="page-title">Loading team page...</h1>
      </main>
    );
  }

  return (
    <main>
      <h1 className="page-title">{data.stats.full_name}</h1>
      <p className="page-subtitle">
        Dedicated IPL team intelligence page for {data.team.short_name}
      </p>

      <div className="grid-2 section-space">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Team Profile</h2>
          <p><strong>Short Name:</strong> {data.team.short_name}</p>
          <p><strong>City:</strong> {data.team.city}</p>
          <p><strong>Captain:</strong> {data.stats.captain}</p>
          <p><strong>Home Ground:</strong> {data.stats.home_ground}</p>
          <p><strong>Titles:</strong> {data.stats.titles}</p>
          <p><strong>Fan Rating:</strong> {data.stats.fan_rating}</p>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Quick Insight</h2>
          <p style={{ lineHeight: 1.7 }}>{data.insight}</p>
          <div style={{ marginTop: "16px" }}>
            <span className="badge">{data.team.short_name}</span>
            <span className="badge">{data.stats.captain}</span>
            <span className="badge">{data.team.city}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Recent / Tracked Matches</h2>
        {data.recent_matches.length === 0 ? (
          <p>No matches available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Match</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_matches.map((match) => (
                <tr key={match.id}>
                  <td>{match.id}</td>
                  <td>
                    {match.team1} vs {match.team2}
                  </td>
                  <td>{match.venue}</td>
                  <td>{match.date}</td>
                  <td>{match.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}