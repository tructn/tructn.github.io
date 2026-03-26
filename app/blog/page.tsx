import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "TN Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
