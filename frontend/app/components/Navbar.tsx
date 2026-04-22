import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">IPL Intelligence</div>
      <Link href="/" className="navbar-link">
        Home
      </Link>
      <Link href="/matches" className="navbar-link">
        Matches
      </Link>
      <Link href="/teams" className="navbar-link">
        Teams
      </Link>
      <Link href="/points-table" className="navbar-link">
        Points Table
      </Link>
      <Link href="/news" className="navbar-link">
        News
      </Link>
      <Link href="/analytics" className="navbar-link">
        Analytics
      </Link>
    </nav>
  );
}