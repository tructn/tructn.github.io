import Layout from "../../components/layout"
import { getArticleIds, getArticle } from "../../utils"
import Head from "next/head"
import Date from "../../components/date"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "../../components/codeblock"

export default function Post({ article }) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article className="break-words">
        <div className="mb-5">
          <h1 className="text-2xl">{article.title}</h1>
          <div>
            <Date dateString={article.date} />
          </div>
        </div>
        <ReactMarkdown components={CodeBlock} remarkPlugins={[remarkGfm]}>
          {article.markdown}
        </ReactMarkdown>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getArticleIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const article = await getArticle(params.id)
  return {
    props: {
      article,
    },
  }
}
