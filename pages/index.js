import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className='flex flex-col gap-4'>
          {allPostsData.map(({ id, date, title, tags }) => (
            <li key={id} className='bg-slate-100 p-3 hover:border-green-500'>
              <div className='flex items-center justify-between'>
                <Link href={`/posts/${id}`}>
                  <a className='text-slate-800 hover:text-green-500'>{title}</a>
                </Link>
                <div>
                  {tags.map((tag, index) => {
                    return <span className='text-xs mr-1 bg-green-500 p-1 text-white' key={index}>{tag}</span>
                  })}
                </div>
              </div>
              <small className='text-sm text-blueGray-400'>
                <Date dateString={date} />
              </small>
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
