import Head from 'next/head';
import Link from 'next/link';
import {HiArrowCircleLeft} from 'react-icons/hi';

const name = '🐣 Hi, I am Truc';
export const siteTitle = "Truc's Notebook";

const Back = () => {
    return (
        <Link href="/">
            <a className="text-slate-500 hover:text-emerald-500 flex items-center gap-2">
                <HiArrowCircleLeft size="30" />
                <span>Back to home</span>
            </a>
        </Link>
    );
};

export default function Layout({children, home}) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <div className="h-full flex flex-col px-2 md:w-1/2 mx-auto text-slate-600">
                <header className="my-10">
                    {home ? (
                        <>
                            <h1>{name}</h1>
                            <small>
                                This is my personal notes for things I have
                                learned in my daily works or I failed to do in
                                my life.
                            </small>
                        </>
                    ) : (
                        <Back />
                    )}
                </header>
                <main>{children}</main>
                {!home && (
                    <div className="py-10">
                        <Back />
                    </div>
                )}
            </div>
        </div>
    );
}
