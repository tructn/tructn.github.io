import { getBlogPosts } from "app/blog/utils";

export const dynamic = "force-static";

export function GET() {
    const posts = getBlogPosts().map(({ slug, metadata, content }) => ({
        slug,
        title: metadata.title,
        summary: metadata.summary ?? "",
        tags: metadata.tags ?? "",
        // Strip MDX syntax for plain-text indexing
        content: content
            .replace(/```[\s\S]*?```/g, "")
            .replace(/`[^`]+`/g, "")
            .replace(/#{1,6}\s/g, "")
            .replace(/[*_~>\[\]()!]/g, "")
            .replace(/\s+/g, " ")
            .trim(),
    }));

    return Response.json(posts);
}
