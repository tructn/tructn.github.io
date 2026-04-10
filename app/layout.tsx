import "./global.css";

import { Elms_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { baseUrl } from "./sitemap";

import type { Metadata } from "next";

const sans = Elms_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "The Quick Notes",
    template: "%s | The Quick Notes",
  },
  description: "This is my personal notes.",
  openGraph: {
    title: "The Quick Notes",
    description: "This is my personal notes.",
    url: baseUrl,
    siteName: "The Quick Notes",
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
    <html lang="en" className={cx("text-black bg-white", sans.className)}>
      <body className="antialiased bg-white max-w-3xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <header className="mb-6 text-center border-b-2 border-black pb-4">
            <h1 className="font-serif text-4xl font-bold tracking-tight mb-2">
              <a
                href="/"
                className="hover:underline focus:underline outline-none underline-offset-4 decoration-black/30"
              >
                The Quick Notes
              </a>
            </h1>
            <p className="font-mono text-[11px] text-black/40 tracking-wide">
              Built with caffeine, curiosity, and a suspicious number of tabs
            </p>
          </header>
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
