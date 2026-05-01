import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocoon — Stop applying. Start getting matched.",
  description:
    "Cocoon is an AI career platform that builds rich profiles, scores your fit against every role, and helps close the gap. Be first in.",
  metadataBase: new URL("https://cocoonai.co.uk"),
  openGraph: {
    title: "Cocoon — Stop applying. Start getting matched.",
    description: "The smarter way to get hired. Join the waitlist.",
    type: "website",
    url: "https://cocoonai.co.uk",
  },
  alternates: {
    canonical: "https://cocoonai.co.uk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
