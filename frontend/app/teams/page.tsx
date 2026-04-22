"use client";

import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";

type Team = {
  id: number;
  name: string;
  short_name: string;
  city: string;
};

export default function TeamsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/ipl/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []))
      .catch((error) => console.error("Error loading teams:", error));
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">Teams</h1>
      <p className="page-subtitle">
        Explore each IPL team through dedicated intelligence pages.
      </p>

      <div className="grid-2">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </main>
  );
}