type Article = {
  id: number;
  headline: string;
  summary: string;
  source_name: string;
  published_at: string;
  team_tags: string[];
};

export default function NewsCard({ article }: { article: Article }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>{article.headline}</h3>
      <p>{article.summary}</p>
      <p style={{ color: "#94a3b8", fontSize: "14px" }}>
        {article.source_name} • {article.published_at}
      </p>
      <div style={{ marginTop: "10px" }}>
        {article.team_tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}