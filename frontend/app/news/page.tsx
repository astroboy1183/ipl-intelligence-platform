"use client";

import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

type Article = {
  id: number;
  headline: string;
  summary: string;
  source_name: string;
  published_at: string;
  team_tags: string[];
};

export default function NewsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [articles, setArticles] = useState<Article[]>([]);
  const [source, setSource] = useState("unknown");

  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/news/ipl/latest`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setSource(data.source || "unknown");
      })
      .catch((error) => console.error("Error loading news:", error));
  }, [apiUrl]);

  return (
    <main>
      <h1 className="page-title">IPL News</h1>
      <p className="page-subtitle">
        Latest IPL headlines and summaries{" "}
        <span className="badge">source: {source}</span>
      </p>

      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: "16px" }}>
          <NewsCard article={article} />
        </div>
      ))}
    </main>
  );
}