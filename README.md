# Truc Nguyen Apps

The storefront for my apps at <https://tructn.github.io>. Each app gets a product page, and a privacy policy and support page when it needs them, e.g. Framelet Studio:

- <https://tructn.github.io/framelet-app/>
- <https://tructn.github.io/framelet-app/privacy/>
- <https://tructn.github.io/framelet-app/support/>

The privacy and support URLs are given to App Store Connect, so don't rename an app's folder once it's listed.

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # static site in out/
```

See [apps/README.md](apps/README.md) to add an app.
