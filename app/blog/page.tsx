import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "The Trail",
  description: "Every quest so far, finished or not.",
};

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
