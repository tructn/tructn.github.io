import "./global.css";

import { Cormorant_Garamond, EB_Garamond, IM_Fell_English } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "./components/footer";
import { Hero } from "./components/hero";
import { Navbar } from "./components/nav";
import { baseUrl } from "./sitemap";

import type { Metadata } from "next";

// Cormorant and EB Garamond ship a Vietnamese subset; `subsets` only picks what
// to preload, and unicode-range still pulls Vietnamese glyphs in on pages that
// need them. IM Fell is Latin-only, so it is kept to short marginal notes.
const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  style: ["normal", "italic"],
});

const hand = IM_Fell_English({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: "400",
  style: "italic",
});

const SITE_NAME = "Side Quests";
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
      className={cx(display.variable, body.variable, hand.variable)}
    >
      <body className="antialiased max-w-3xl mx-4 mt-6 sm:mt-10 lg:mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-1 sm:px-0">
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
