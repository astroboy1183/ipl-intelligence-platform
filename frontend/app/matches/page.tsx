"use client";

import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";

type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

export default function MatchesPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/ipl/live/matches`)
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch((error) => console.error("Error loading matches:", error));
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">Matches</h1>
      <p className="page-subtitle">
        Live, upcoming, and recently tracked IPL matches.
      </p>

      {matches.map((match) => (
        <div key={match.id} style={{ marginBottom: "16px" }}>
          <MatchCard match={match} />
        </div>
      ))}
    </main>
  );
}