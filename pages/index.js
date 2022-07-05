import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <ul className="transition-all flex flex-col gap-4 bg-stone-100">
          {allPostsData
            .filter((p) => p.published)
            .map(({ id, date, title, tags }) => (
              <li key={id} className="rounded p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-3">
                    <h3>{title}</h3>
                    <small className="text-sm">
                      <Date dateString={date} />
                    </small>
                    <Link href={`/posts/${id}`}>
                      <a className="hover:underline-offset-2 hover:underline">
                        Read more...
                      </a>
                    </Link>
                  </div>
                  <div>
                    {tags.map((tag, index) => {
                      return (
                        <span className="rounded text-xs mr-0 p-1" key={index}>
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
