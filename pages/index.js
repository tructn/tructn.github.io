import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import { getSortedArticlesData } from "../utils"
import Articles from "../components/articles"

export default function Home({ articles }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Articles articles={articles} />
    </Layout>
  )
}

export async function getStaticProps() {
  const articles = getSortedArticlesData()
  return {
    props: {
      articles,
    },
  }
}
