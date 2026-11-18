# Apps

Each folder here is one app. The folder name is the URL: `apps/framelet-app/` is served at `/framelet-app/`.

```
apps/<slug>/
  app.json      # required: the listing
  privacy.md    # optional: becomes /<slug>/privacy/
  support.md    # optional: becomes /<slug>/support/
public/apps/<slug>/
  icon.png, screenshots…
```

## Add an app

1. Put its icon and screenshots in `public/apps/<slug>/`. Window captures (⇧⌘5 → window, shadow on) look best: their transparent shadow sits on the page. Convert them to WebP, keeping the alpha and the colour profile:

   ```bash
   cwebp -metadata icc -q 80 -alpha_q 85 -resize 2000 0 capture.png -o public/apps/<slug>/01-name.webp
   ```

2. Copy `kui/app.json` to `<slug>/app.json` and fill it in.

`next build` fails with a clear message if a field or image is missing.

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| `name`, `subtitle`, `tagline`, `summary` | yes | Subtitle is the store line; summary shows on cards |
| `description` | yes | List of paragraphs |
| `icon` | yes | File in `public/apps/<slug>/` |
| `theme` | yes | `{ "from", "to", "accent" }` colours for the banners |
| `category`, `price`, `platform`, `requires` | yes | Short labels, e.g. `Photography`, `Free`, `Mac`, `macOS 15 or later` |
| `get` | yes | `{ "label", "url"? , "note"? }`. Without `url` it shows as a badge with the note |
| `screenshots` | yes | `[{ "file", "title", "subtitle"?, "alt" }]`; the first is the hero. Sizes are read from the files |
| `order` | no | Lower comes first; the first app is featured on the home page |
| `purchases`, `version`, `languages`, `age`, `repo` | no | |
| `features` | no | `[{ "title", "text" }]` |
| `pro` | no | `{ "name", "kind", "text", "features": [{ "title", "text" }] }` |
| `privacy` | no | `{ "label", "text" }`, the App Privacy card |
| `stack` | no | List of strings |

Markdown files take a front matter with `title` and, for policies, `updated`.
