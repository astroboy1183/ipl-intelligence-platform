export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="card">
      <div style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "10px" }}>
        {title}
      </div>
      <div style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}