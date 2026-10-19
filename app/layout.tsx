import "./global.css";

import { STIX_Two_Text, Source_Code_Pro } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/nav";
import { baseUrl } from "./sitemap";

import type { Metadata } from "next";

// STIX Two is the face many journals set their papers in. It ships a
// Vietnamese subset; `subsets` only picks what to preload, and unicode-range
// still pulls Vietnamese glyphs in on pages that need them.
const serif = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_NAME = "Truc's Notes";
const SITE_DESCRIPTION =
  "Code, life, and the side quests in between, written down so future me doesn't have to redo them.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(serif.variable, mono.variable)}
    >
      <body className="antialiased sm:py-10">
        <main className="sheet mx-auto max-w-[50rem] min-w-0 flex flex-col px-4 py-6 sm:px-14 sm:py-10">
          <Hero />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
