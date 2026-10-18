import fs from 'fs';
import path from 'path';

/**
 * Crafts are loaded from app/crafts/projects/<slug>.json, with their images in
 * public/crafts/<slug>/. See app/crafts/projects/README.md for how to add one.
 */

const PROJECTS_DIR = path.join(process.cwd(), 'app', 'crafts', 'projects');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const PALETTE = ['coral', 'sky', 'mint', 'sun', 'lilac', 'peach'] as const;
type PaletteColor = (typeof PALETTE)[number];

/* Shape of a project's JSON file */
type CraftFile = {
  name: string;
  tagline: string;
  description: string;
  repo: string;
  download: { label: string; url: string };
  platform?: string;
  logo?: string;
  color?: PaletteColor;
  order?: number;
  features?: string[];
  stack?: string[];
  // The first screenshot is the big one under the project card
  screenshots: { file: string; alt: string; caption?: string }[];
};

export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  color: string;
};

export type Craft = Omit<CraftFile, 'logo' | 'color' | 'screenshots'> & {
  slug: string;
  logo?: string;
  color: string;
  accent: string;
  features: string[];
  stack: string[];
  hero: Screenshot;
  shots: Screenshot[];
};

export function getCrafts(): Craft[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => path.extname(file) === '.json')
    .map((file) => {
      let slug = path.basename(file, '.json');
      let data = JSON.parse(
        fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf-8')
      ) as CraftFile;
      return { slug, data };
    })
    .sort(
      (a, b) =>
        (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
        a.slug.localeCompare(b.slug)
    )
    .map(({ slug, data }, i) => toCraft(slug, data, i));
}

function toCraft(slug: string, data: CraftFile, index: number): Craft {
  let fail = (msg: string): never => {
    throw new Error(`Craft "${slug}" (app/crafts/projects/${slug}.json): ${msg}`);
  };

  for (let key of ['name', 'tagline', 'description', 'repo'] as const) {
    if (!data[key]) fail(`missing "${key}"`);
  }
  if (!data.download?.url || !data.download?.label) {
    fail('"download" needs both "label" and "url"');
  }
  if (!data.screenshots?.length) fail('needs at least one screenshot');
  if (data.color && !PALETTE.includes(data.color)) {
    fail(`"color" must be one of ${PALETTE.join(', ')}`);
  }

  let asset = (file: string) => {
    let src = `/crafts/${slug}/${file}`;
    if (!fs.existsSync(path.join(PUBLIC_DIR, src))) {
      fail(`image not found at public${src}`);
    }
    return src;
  };

  let color = data.color ?? PALETTE[index % PALETTE.length];
  // Shot backgrounds cycle through the palette, skipping the project's own color
  let shotColors = PALETTE.filter((c) => c !== color);

  let [hero, ...shots] = data.screenshots.map((shot, i) => {
    let src = asset(shot.file);
    let { width, height } = imageSize(path.join(PUBLIC_DIR, src), fail);
    return {
      src,
      alt: shot.alt,
      caption: shot.caption,
      width,
      height,
      color: `var(--${shotColors[i % shotColors.length]}-soft)`,
    };
  });

  return {
    ...data,
    slug,
    logo: data.logo ? asset(data.logo) : undefined,
    color: `var(--${color}-soft)`,
    accent: `var(--${color})`,
    features: data.features ?? [],
    stack: data.stack ?? [],
    hero,
    shots,
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
