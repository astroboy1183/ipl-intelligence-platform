"use client";

import { useEffect, useState } from "react";

type Team = {
  id: number;
  name: string;
  short_name: string;
};

type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

export default function Home() {
  const [apiMessage, setApiMessage] = useState("Loading...");
  const [healthStatus, setHealthStatus] = useState("Checking...");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("NEXT_PUBLIC_API_URL is not set");
      return;
    }

    const fetchData = async () => {
      try {
        const [rootRes, healthRes, teamsRes, matchesRes] = await Promise.all([
          fetch(`${apiUrl}/`),
          fetch(`${apiUrl}/health`),
          fetch(`${apiUrl}/ipl/teams`),
          fetch(`${apiUrl}/ipl/matches`),
        ]);

        if (!rootRes.ok || !healthRes.ok || !teamsRes.ok || !matchesRes.ok) {
          throw new Error("One or more API requests failed");
        }

        const rootData = await rootRes.json();
        const healthData = await healthRes.json();
        const teamsData = await teamsRes.json();
        const matchesData = await matchesRes.json();

        setApiMessage(rootData.message);
        setHealthStatus(healthData.status);
        setTeams(teamsData.teams);
        setMatches(matchesData.matches);
      } catch (err) {
        console.error("Error fetching backend data:", err);
        setError("Backend connection failed");
      }
    };

    fetchData();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020b24",
        color: "white",
        padding: "40px 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
          IPL Intelligence Platform
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "32px", color: "#cbd5e1" }}>
          Phase 1: API foundation + mini dashboard
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#3b0a0a",
              border: "1px solid #7f1d1d",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Backend Status</h2>
            <p>
              <strong>API Message:</strong> {apiMessage}
            </p>
            <p>
              <strong>Health:</strong> {healthStatus}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ marginTop: 0 }}>IPL Teams</h2>
            {teams.length === 0 ? (
              <p>Loading teams...</p>
            ) : (
              <ul style={{ paddingLeft: "20px" }}>
                {teams.map((team) => (
                  <li key={team.id} style={{ marginBottom: "8px" }}>
                    {team.short_name} - {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#0f172a",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Upcoming Matches</h2>
            {matches.length === 0 ? (
              <p>Loading matches...</p>
            ) : (
              <ul style={{ paddingLeft: "20px" }}>
                {matches.map((match) => (
                  <li key={match.id} style={{ marginBottom: "14px" }}>
                    <strong>
                      {match.team1} vs {match.team2}
                    </strong>
                    <br />
                    Venue: {match.venue}
                    <br />
                    Date: {match.date}
                    <br />
                    Status: {match.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}