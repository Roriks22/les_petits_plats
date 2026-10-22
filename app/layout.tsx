import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Les petits plats",
  description: "Trouvez facilement des recettes de cuisine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
