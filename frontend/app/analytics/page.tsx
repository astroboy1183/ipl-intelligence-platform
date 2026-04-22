"use client";

import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

type Overview = {
  total_teams: number;
  total_matches: number;
  live_matches: number;
  upcoming_matches: number;
  completed_matches: number;
};

export default function AnalyticsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/analytics/overview`)
      .then((res) => res.json())
      .then((data) => setOverview(data))
      .catch((error) => console.error("Error loading analytics:", error));
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">
        Basic analytics overview for the IPL intelligence platform.
      </p>

      <div className="grid-3">
        <StatCard title="Total Teams" value={overview?.total_teams ?? 0} />
        <StatCard title="Total Matches" value={overview?.total_matches ?? 0} />
        <StatCard title="Live Matches" value={overview?.live_matches ?? 0} />
        <StatCard
          title="Upcoming Matches"
          value={overview?.upcoming_matches ?? 0}
        />
        <StatCard
          title="Completed Matches"
          value={overview?.completed_matches ?? 0}
        />
      </div>
    </main>
  );
}