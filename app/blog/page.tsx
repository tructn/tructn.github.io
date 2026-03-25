import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "personal notes",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
