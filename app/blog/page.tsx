import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "The Trail",
  description: "Every stop along the scenic route.",
};

export default function Page() {
  return (
    <section>
      <BlogPosts />
    </section>
  );
}
