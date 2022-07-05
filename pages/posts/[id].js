import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import Date from "../../components/date"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "../../components/codeblock"

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="break-words">
        <div className="mb-5">
          <h1>{postData.title}</h1>
          <div>
            <Date dateString={postData.date} />
          </div>
        </div>
        <ReactMarkdown components={CodeBlock} remarkPlugins={[remarkGfm]}>
          {postData.markdown}
        </ReactMarkdown>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
