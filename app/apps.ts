import fs from 'fs';
import path from 'path';
import type { CSSProperties } from 'react';

/**
 * Apps are loaded from apps/<slug>/app.json, with their images in
 * public/apps/<slug>/. The slug is the URL: apps/framelet-studio shows up at
 * /framelet-studio/. An optional privacy.md or support.md next to app.json
 * becomes /<slug>/privacy/ or /<slug>/support/. See apps/README.md.
 */

const APPS_DIR = path.join(process.cwd(), 'apps');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

type Item = { title: string; text: string };

/* Shape of an app's JSON file */
type AppFile = {
  name: string;
  subtitle: string;
  tagline: string;
  summary: string;
  description: string[];
  icon: string;
  theme: { from: string; to: string; accent: string };
  category: string;
  price: string;
  purchases?: string;
  platform: string;
  requires: string;
  version?: string;
  languages?: string;
  age?: string;
  repo?: string;
  // Without a url, the button shows the note instead of linking anywhere
  get: { label: string; url?: string; note?: string };
  order?: number;
  screenshots: { file: string; title: string; subtitle?: string; alt: string }[];
  features?: Item[];
  pro?: { name: string; kind: string; price?: string; icon?: string; text: string; features: Item[] };
  privacy?: { label: string; text: string };
  stack?: string[];
};

export type Screenshot = {
  src: string;
  title: string;
  subtitle?: string;
  alt: string;
  width: number;
  height: number;
};

export type DocKind = 'privacy' | 'support';

export type App = Omit<AppFile, 'icon' | 'screenshots' | 'pro'> & {
  pro?: Omit<NonNullable<AppFile['pro']>, 'icon'> & { icon?: string };
  slug: string;
  href: string;
  icon: string;
  features: Item[];
  stack: string[];
  shots: Screenshot[];
  docs: DocKind[];
};

export type Doc = { title: string; updated?: string; content: string };

export function getApps(): App[] {
  return fs
    .readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      let slug = entry.name;
      let data = JSON.parse(
        fs.readFileSync(path.join(APPS_DIR, slug, 'app.json'), 'utf-8')
      ) as AppFile;
      return { slug, data };
    })
    .sort(
      (a, b) =>
        (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
        a.slug.localeCompare(b.slug)
    )
    .map(({ slug, data }) => toApp(slug, data));
}

/* Hands an app's colours to everything inside it (see .banner in global.css) */
export function themeStyle(app: App) {
  return {
    '--from': app.theme.from,
    '--to': app.theme.to,
    '--accent': app.theme.accent,
  } as CSSProperties;
}

export function getApp(slug: string): App | undefined {
  return getApps().find((app) => app.slug === slug);
}

export function getDoc(slug: string, kind: DocKind): Doc {
  let raw = fs.readFileSync(path.join(APPS_DIR, slug, `${kind}.md`), 'utf-8');
  let match = /^---\s*([\s\S]*?)\s*---/.exec(raw);
  let meta: Record<string, string> = {};
  for (let line of match?.[1].split('\n') ?? []) {
    let [key, ...rest] = line.split(': ');
    meta[key.trim()] = rest.join(': ').trim();
  }
  return {
    title: meta.title ?? kind,
    updated: meta.updated,
    content: raw.replace(match?.[0] ?? '', '').trim(),
  };
}

function toApp(slug: string, data: AppFile): App {
  let fail = (msg: string): never => {
    throw new Error(`App "${slug}" (apps/${slug}/app.json): ${msg}`);
  };

  for (let key of [
    'name', 'subtitle', 'tagline', 'summary', 'icon', 'category', 'price', 'platform', 'requires',
  ] as const) {
    if (!data[key]) fail(`missing "${key}"`);
  }
  if (!data.description?.length) fail('"description" needs at least one paragraph');
  if (!data.theme?.from || !data.theme?.to || !data.theme?.accent) {
    fail('"theme" needs "from", "to" and "accent" colors');
  }
  if (!data.get?.label) fail('"get" needs a "label"');
  if (!data.screenshots?.length) fail('needs at least one screenshot');

  let asset = (file: string) => {
    let src = `/apps/${slug}/${file}`;
    if (!fs.existsSync(path.join(PUBLIC_DIR, src))) {
      fail(`image not found at public${src}`);
    }
    return src;
  };

  let docs = (['privacy', 'support'] as const).filter((kind) =>
    fs.existsSync(path.join(APPS_DIR, slug, `${kind}.md`))
  );

  return {
    ...data,
    slug,
    href: `/${slug}/`,
    icon: asset(data.icon),
    features: data.features ?? [],
    pro: data.pro && { ...data.pro, icon: data.pro.icon && asset(data.pro.icon) },
    stack: data.stack ?? [],
    docs,
    shots: data.screenshots.map((shot) => {
      let src = asset(shot.file);
      return { ...shot, src, ...imageSize(path.join(PUBLIC_DIR, src), fail) };
    }),
  };
}

/* Reads width/height from a PNG, WebP or JPEG header so the JSON doesn't have to */
function imageSize(file: string, fail: (msg: string) => never) {
  let buf = fs.readFileSync(file);

  // PNG: IHDR chunk
  if (buf.toString('ascii', 1, 4) === 'PNG') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    let chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === 'VP8L') {
      let bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') {
      return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    }
  }

  // JPEG: walk segments until a start-of-frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      let marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return fail(`can't read the size of ${path.relative(PUBLIC_DIR, file)}, use PNG, WebP or JPEG`);
}
