# Truc Nguyen Apps

The storefront for my apps at <https://tructn.github.io>. Each app gets a product page, and a privacy policy and support page when it needs them, e.g. Framelet Studio:

- <https://tructn.github.io/framelet-studio/>
- <https://tructn.github.io/framelet-studio/privacy/>
- <https://tructn.github.io/framelet-studio/support/>

Framelet Studio's App Store Connect URLs (`/framelet-app/privacy/` and `/framelet-app/support/`) are served by the [framelet-app](https://github.com/tructn/framelet-app) repo's own Pages site, which takes over `/framelet-app/` here. Don't use that slug for an app folder, and keep those pages in step with `apps/framelet-studio/`.

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # static site in out/
```

See [apps/README.md](apps/README.md) to add an app.
