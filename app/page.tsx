import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="text-4xl font-bold tracking-tight mb-10 mt-4">
        👋 hey, welcome to my notes
      </h1>
      {/* Posts */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-black/40 mb-6">
          Recent Posts
        </h2>
        <BlogPosts />
      </div>
    </section>
  );
}
