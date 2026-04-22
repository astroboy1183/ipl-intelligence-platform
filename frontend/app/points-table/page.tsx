"use client";

import { useEffect, useState } from "react";
import TableCard from "../components/TableCard";

type PointsRow = {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  net_run_rate: number;
};

export default function PointsTablePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [rows, setRows] = useState<PointsRow[]>([]);
  const [source, setSource] = useState("unknown");

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/ipl/live/points-table`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data.points_table || []);
        setSource(data.source || "unknown");
      })
      .catch((error) => console.error("Error loading points table:", error));
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">Points Table</h1>
      <p className="page-subtitle">
        Standings view <span className="badge">source: {source}</span>
      </p>

      <TableCard title="IPL Standings">
        <table className="table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>L</th>
              <th>Pts</th>
              <th>NRR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.team}>
                <td>{row.position}</td>
                <td>{row.team}</td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.lost}</td>
                <td>{row.points}</td>
                <td>{row.net_run_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </main>
  );
}