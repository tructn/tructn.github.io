import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey, compiling thoughts… please wait... 🧑‍💻
      </h1>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
