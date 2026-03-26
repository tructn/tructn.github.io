import { getBlogPosts } from 'app/blog/utils';
export const dynamic = "force-static";
export const revalidate = 3600; // optional ISR
export const baseUrl = 'https://tructn.github.io';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
