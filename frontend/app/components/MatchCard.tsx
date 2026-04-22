type Match = {
  id: number;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  status: string;
};

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>
        {match.team1} vs {match.team2}
        <span className="badge">{match.status}</span>
      </h3>
      <p>Venue: {match.venue}</p>
      <p>Date: {match.date}</p>
      <p>Match ID: {match.id}</p>
    </div>
  );
}