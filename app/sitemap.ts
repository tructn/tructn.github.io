import { getBlogPosts } from 'app/blog/utils';
import { getCrafts } from 'app/crafts/utils';
export const dynamic = "force-static";
export const revalidate = 3600; // optional ISR
export const baseUrl = 'https://tructn.github.io';

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let crafts = getCrafts().map((craft) => ({
    url: `${baseUrl}/crafts/${craft.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  let routes = ['', '/blog', '/crafts', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...crafts];
}
