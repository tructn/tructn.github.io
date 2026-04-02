import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "TN Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="py-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-amber-200/60" />
        <span className="text-stone-500 text-sm italic">my notes</span>
        <div className="h-px flex-1 bg-amber-200/60" />
      </div>
      <BlogPosts />
    </section>
  );
}
