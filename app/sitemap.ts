import { getApps } from 'app/apps';
export const dynamic = "force-static";
export const baseUrl = 'https://tructn.github.io';

export default async function sitemap() {
  let today = new Date().toISOString().split('T')[0];

  let pages = getApps().flatMap((app) => [
    app.href,
    ...app.docs.map((kind) => `${app.href}${kind}/`),
  ]);

  return ['/', ...pages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: today,
  }));
}
