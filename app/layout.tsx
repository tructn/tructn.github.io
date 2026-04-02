import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { Elms_Sans } from "next/font/google";

const sans = Elms_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "the quick notes",
    template: "%s | the quick notes",
  },
  description: "this is my personal notes.",
  openGraph: {
    title: "the quick notes",
    description: "this is my personal notes.",
    url: baseUrl,
    siteName: "the quick notes",
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
    <html lang="en" className={cx("text-black bg-[#f7f6f3]", sans.className)}>
      <body className="antialiased max-w-3xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">
              <a
                href="/"
                className="hover:underline focus:underline outline-none"
              >
                the quick notes
              </a>
            </h1>
            <p className="text-base text-gray-600 italic">
              fast, quirky, and occasionally buggy: where tech meets sticky
              notes!
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
