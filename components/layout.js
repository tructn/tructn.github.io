import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { HiArrowCircleLeft } from 'react-icons/hi'

const name = "t r u c n g u y e n n o t e s"
export const siteTitle = "Truc Nguyen"

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className='text-center mb-10'>
        {home ? (
          <>
            <h1 className='font-display text-violet-500 text-2xl'>{name}</h1>
          </>
        ) : (
          <>
            <h1 className='font-display text-violet-500 text-2xl'>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a className='text-black hover:text-blueGray-500 flex gap-1 items-center'><HiArrowCircleLeft /> Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
