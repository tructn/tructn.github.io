import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main>This is about</main>
    </Layout>
  )
}
