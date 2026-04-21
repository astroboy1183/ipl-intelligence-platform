"use client";

import { useEffect, useState } from "react";

type Team = {
  id: number;
  name: string;
  short_name: string;
  city: string;
};

type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

type PointsRow = {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  net_run_rate: number;
};

type Summary = {
  total_teams: number;
  total_matches: number;
  top_team: string;
  top_team_points: number;
  combined_titles: number;
};

type TeamStats = {
  team: string;
  full_name: string;
  captain: string;
  home_ground: string;
  titles: number;
  fan_rating: number;
};

export default function Home() {
  const [apiMessage, setApiMessage] = useState("Loading...");
  const [healthStatus, setHealthStatus] = useState("Checking...");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [pointsTable, setPointsTable] = useState<PointsRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  const [selectedTeam, setSelectedTeam] = useState("CSK");
  const [selectedTeamStats, setSelectedTeamStats] = useState<TeamStats | null>(null);
  const [selectedTeamMatches, setSelectedTeamMatches] = useState<Match[]>([]);

  const [error, setError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!apiUrl) {
      setError("NEXT_PUBLIC_API_URL is not set");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [
          rootRes,
          healthRes,
          teamsRes,
          matchesRes,
          upcomingRes,
          pointsRes,
          summaryRes,
        ] = await Promise.all([
          fetch(`${apiUrl}/`),
          fetch(`${apiUrl}/health`),
          fetch(`${apiUrl}/ipl/teams`),
          fetch(`${apiUrl}/ipl/matches`),
          fetch(`${apiUrl}/ipl/matches/upcoming`),
          fetch(`${apiUrl}/ipl/points-table`),
          fetch(`${apiUrl}/ipl/stats/summary`),
        ]);

        if (
          !rootRes.ok ||
          !healthRes.ok ||
          !teamsRes.ok ||
          !matchesRes.ok ||
          !upcomingRes.ok ||
          !pointsRes.ok ||
          !summaryRes.ok
        ) {
          throw new Error("One or more dashboard API requests failed");
        }

        const rootData = await rootRes.json();
        const healthData = await healthRes.json();
        const teamsData = await teamsRes.json();
        const matchesData = await matchesRes.json();
        const upcomingData = await upcomingRes.json();
        const pointsData = await pointsRes.json();
        const summaryData = await summaryRes.json();

        setApiMessage(rootData.message);
        setHealthStatus(healthData.status);
        setTeams(teamsData.teams);
        setMatches(matchesData.matches);
        setUpcomingMatches(upcomingData.matches);
        setPointsTable(pointsData.points_table);
        setSummary(summaryData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Backend connection failed");
      }
    };

    fetchDashboardData();
  }, [apiUrl]);

  useEffect(() => {
    if (!apiUrl || !selectedTeam) return;

    const fetchTeamData = async () => {
      try {
        const [statsRes, matchesRes] = await Promise.all([
          fetch(`${apiUrl}/ipl/teams/${selectedTeam}/stats`),
          fetch(`${apiUrl}/ipl/teams/${selectedTeam}/matches`),
        ]);

        if (!statsRes.ok || !matchesRes.ok) {
          throw new Error("Team API request failed");
        }

        const statsData = await statsRes.json();
        const matchesData = await matchesRes.json();

        setSelectedTeamStats(statsData);
        setSelectedTeamMatches(matchesData.matches);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTeamData();
  }, [apiUrl, selectedTeam]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020b24",
        color: "white",
        padding: "32px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <header style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "8px" }}>
            IPL Intelligence Platform
          </h1>
          <p style={{ fontSize: "18px", color: "#cbd5e1" }}>
            Phase 3: analytics layer + team details + points table
          </p>
        </header>

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

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <StatCard title="API Status" value={healthStatus} />
          <StatCard title="Message" value={apiMessage} />
          <StatCard title="Teams" value={summary?.total_teams ?? 0} />
          <StatCard title="Matches" value={summary?.total_matches ?? 0} />
          <StatCard title="Top Team" value={summary?.top_team ?? "-"} />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <Card title="Points Table">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "white",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Pos</th>
                  <th style={thStyle}>Team</th>
                  <th style={thStyle}>P</th>
                  <th style={thStyle}>W</th>
                  <th style={thStyle}>L</th>
                  <th style={thStyle}>Pts</th>
                  <th style={thStyle}>NRR</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((row) => (
                  <tr key={row.team}>
                    <td style={tdStyle}>{row.position}</td>
                    <td style={tdStyle}>{row.team}</td>
                    <td style={tdStyle}>{row.played}</td>
                    <td style={tdStyle}>{row.won}</td>
                    <td style={tdStyle}>{row.lost}</td>
                    <td style={tdStyle}>{row.points}</td>
                    <td style={tdStyle}>{row.net_run_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Upcoming Matches">
            {upcomingMatches.length === 0 ? (
              <p>Loading upcoming matches...</p>
            ) : (
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {upcomingMatches.map((match) => (
                  <li key={match.id} style={{ marginBottom: "14px" }}>
                    <strong>
                      {match.team1} vs {match.team2}
                    </strong>
                    <br />
                    Venue: {match.venue}
                    <br />
                    Date: {match.date}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <Card title="Team Intelligence">
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="team-select" style={{ marginRight: "12px" }}>
                Select Team:
              </label>
              <select
                id="team-select"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  backgroundColor: "#0b1220",
                  color: "white",
                }}
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.short_name}>
                    {team.short_name}
                  </option>
                ))}
              </select>
            </div>

            {selectedTeamStats ? (
              <div>
                <p><strong>Team:</strong> {selectedTeamStats.full_name}</p>
                <p><strong>Captain:</strong> {selectedTeamStats.captain}</p>
                <p><strong>Home Ground:</strong> {selectedTeamStats.home_ground}</p>
                <p><strong>Titles:</strong> {selectedTeamStats.titles}</p>
                <p><strong>Fan Rating:</strong> {selectedTeamStats.fan_rating}</p>
              </div>
            ) : (
              <p>Loading team stats...</p>
            )}
          </Card>

          <Card title={`${selectedTeam} Match List`}>
            {selectedTeamMatches.length === 0 ? (
              <p>Loading team matches...</p>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Match</th>
                    <th style={thStyle}>Venue</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTeamMatches.map((match) => (
                    <tr key={match.id}>
                      <td style={tdStyle}>{match.id}</td>
                      <td style={tdStyle}>
                        {match.team1} vs {match.team2}
                      </td>
                      <td style={tdStyle}>{match.venue}</td>
                      <td style={tdStyle}>{match.date}</td>
                      <td style={tdStyle}>{match.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </section>

        <section>
          <Card title="All Matches Overview">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "white",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Match</th>
                  <th style={thStyle}>Venue</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.id}>
                    <td style={tdStyle}>{match.id}</td>
                    <td style={tdStyle}>
                      {match.team1} vs {match.team2}
                    </td>
                    <td style={tdStyle}>{match.venue}</td>
                    <td style={tdStyle}>{match.date}</td>
                    <td style={tdStyle}>{match.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid #1e293b",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "16px" }}>{title}</h2>
      {children}
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "18px",
        borderRadius: "14px",
        border: "1px solid #1e293b",
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
        {title}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #334155",
};

const tdStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #1e293b",
};