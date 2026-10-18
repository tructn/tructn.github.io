# Crafts

Each file here is one project on the `/crafts` page. The file name is the slug: `kui.json` shows up at `/crafts#kui`.

## Add a project

1. Put its images in `public/crafts/<slug>/`. Screenshots work best as 1600px-wide WebP:

   ```bash
   cwebp -q 82 -resize 1600 0 screenshot.png -o public/crafts/<slug>/screenshot.webp
   ```

2. Copy `kui.json` to `<slug>.json` and fill it in.

That's it. `next build` fails with a clear message if a field or image is missing.

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| `name`, `tagline`, `description` | yes | |
| `repo` | yes | GitHub link |
| `download` | yes | `{ "label": "Download for macOS", "url": "…/releases/latest" }` |
| `screenshots` | yes | `[{ "file", "alt", "caption"? }]`. The first is the big one; the rest become numbered plates (Fig. I, II…). Sizes are read from the files. |
| `order` | no | Lower comes first. Projects without one go last, by slug. |
| `logo` | no | File name in the project's image folder |
| `color` | no | `coral` (red chalk), `sky` (lapis), `mint` (verdigris), `sun` (ochre), `lilac` (umber) or `peach` (sienna). Picked for you if left out. |
| `platform` | no | Short label, e.g. `macOS 14+` |
| `features`, `stack` | no | Lists of strings |
