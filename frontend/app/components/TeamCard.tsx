import Link from "next/link";

type Team = {
  id: number;
  name: string;
  short_name: string;
  city: string;
};

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.short_name.toLowerCase()}`}>
      <div
        className="card"
        style={{
          cursor: "pointer",
          transition: "transform 0.2s ease, border-color 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <h2 style={{ margin: 0 }}>{team.short_name}</h2>
          <span className="badge">Team Page</span>
        </div>

        <p style={{ fontSize: "18px", marginBottom: "8px" }}>{team.name}</p>
        <p style={{ color: "#94a3b8", marginBottom: "14px" }}>City: {team.city}</p>

        <div style={{ color: "#60a5fa", fontWeight: 600 }}>
          View Team Intelligence →
        </div>
      </div>
    </Link>
  );
}