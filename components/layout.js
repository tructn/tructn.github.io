import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const name = 'Hi, I am Truc';
export const siteTitle = "Truc's Notebook";

export default function Layout({ children, home }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="h-full flex flex-col px-2 md:w-1/2 mx-auto">
                <header className="my-10">
                    {home ? (
                        <>
                            <h1>{name}</h1>
                            <p>
                                This is my personal notes for things I have
                                learned in my daily works.
                            </p>
                        </>
                    ) : (
                        <div className='relative mb-5'>
                            <Link href="/">
                                <a className="flex items-center gap-2 absolute left-0">
                                    <button className='p-2 bg-slate-100 rounded-full hover:bg-slate-500 hover:text-white transition-all'>
                                        <FiArrowLeft size="30" />
                                    </button>
                                </a>
                            </Link>
                        </div>
                    )}
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
