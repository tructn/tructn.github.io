export const metadata = {
  title: "About me",
  description: "Learn more about TN.",
};

export default function Page() {
  return (
    <section className="w-full flex justify-center mt-4 sm:mt-8 antialiased">
      <div className="w-full">
        <h1 className="font-semibold text-2xl mb-4 tracking-tighter text-black">
          About me
        </h1>
        <p className="text-black/80 text-sm leading-relaxed mb-4">
          Hi, I'm Truc, a software engineer with a passion for building web
          applications. I have experience in various technologies and enjoy
          learning new things. This blog is where I share my thoughts,
          experiences, and knowledge about software development and other topics
          that interest me.
        </p>
        <p className="text-black/80 text-sm leading-relaxed mb-4">
          Feel free to explore my blog posts and reach out if you have any
          questions or just want to connect!
        </p>
      </div>
    </section>
  );
}
