import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "IPL Intelligence Platform",
  description: "Comprehensive IPL intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-container">{children}</div>
      </body>
    </html>
  );
}