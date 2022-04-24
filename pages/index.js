import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <ul className='transition-all flex flex-col gap-4'>
          {allPostsData
            .filter((p) => p.published)
            .map(({ id, date, title, tags }) => (
              <li
                key={id}
                className='border rounded p-2 flex flex-col bg-white'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-xl'>{title}</span>
                  <div>
                    {tags.map((tag, index) => {
                      return (
                        <span
                          className='rounded text-xs mr-0 bg-emerald-500 p-1 text-white'
                          key={index}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <small className='text-sm text-slate-500'>
                  <Date dateString={date} />
                </small>
                <Link href={`/posts/${id}`}>
                  <a className='transition-all text-md text-emerald-500 hover:text-emerald-600'>
                    Read more...
                  </a>
                </Link>
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
      allPostsData
    }
  }
}
