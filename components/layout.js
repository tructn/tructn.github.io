import Head from "next/head"
import Link from "next/link"
import { FiArrowLeftCircle } from "react-icons/fi"

const name = "Truc's Notebook"
export const siteTitle = "Truc's Notebook"

export default function Layout({ children, home }) {
  return (
    <div className="w-screen h-screen bg-stone-200">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="h-full flex flex-col px-2 md:w-1/2 mx-auto">
        <header className="my-10">
          {home ? (
            <nav className="flex items-center h-16 justify-between">
              <h1 className="text-3xl">{name}</h1>
              <div className="flex items-center gap-5 text-lg">
                <Link href="/">Posts</Link>
                <Link href="/about">About</Link>
              </div>
            </nav>
          ) : (
            <div className="relative mb-5">
              <Link href="/">
                <a className="absolute left-0 hover:underline hover:underline-offset-2">
                  <button className="flex gap-2 transition-all text-lg">
                    <FiArrowLeftCircle size={20} />
                    <span className="text-lg">Go back</span>
                  </button>
                </a>
              </Link>
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
