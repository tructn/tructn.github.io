import { baseUrl } from 'app/sitemap';
export const dynamic = "force-static";
export const revalidate = 3600; // optional ISR
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
