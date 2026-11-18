# Truc Nguyen Apps

The storefront for my apps at <https://tructn.github.io>. Each app gets a product page, and a privacy policy and support page when it needs them, e.g. Framelet Studio:

- <https://tructn.github.io/framelet-studio/>
- <https://tructn.github.io/framelet-studio/privacy/>
- <https://tructn.github.io/framelet-studio/support/>

The privacy and support URLs above are the ones in App Store Connect. The older [framelet-app](https://github.com/tructn/framelet-app) repo's Pages site still takes over `/framelet-app/` here, so don't use that slug for an app folder.

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # static site in out/
```

See [apps/README.md](apps/README.md) to add an app.
