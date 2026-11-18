import "./global.css";

import { Inter } from "next/font/google";

import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { baseUrl } from "./sitemap";

import type { Metadata } from "next";

// Apple devices get San Francisco from the system stack; Inter stands in
// everywhere else, so it's only loaded where the stack falls through to it.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const SITE_NAME = "Truc Nguyen Apps";
const SITE_DESCRIPTION =
  "Small, careful apps for the Mac and the desktop, by Truc Nguyen.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-dvh flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
