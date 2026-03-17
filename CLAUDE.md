# Blog (Hugo)

## Setup

1. Clone the repo and initialize theme submodules:
   ```sh
   git clone <repo-url>
   cd blog
   git submodule update --init --recursive
   ```

2. Install Hugo (v0.131.0 or compatible):
   ```sh
   # macOS
   brew install hugo

   # Linux (download binary)
   curl -sL https://github.com/gohugoio/hugo/releases/download/v0.131.0/hugo_extended_0.131.0_linux-amd64.tar.gz | tar xz -C /usr/local/bin hugo
   ```

## Development

```sh
hugo server -D    # Start dev server with drafts enabled
hugo              # Build site to docs/blog/
```

## Build

The site is deployed via Netlify. The build command and Hugo version are configured in `netlify.toml`. The publish directory is `docs/` (Netlify config) which contains `docs/blog/` (Hugo's publishDir from `config.toml`).

## Custom Shortcodes

Custom shortcodes in `layouts/shortcodes/` override Hugo's built-in versions:

- **instagram.html** — Client-side Instagram embed (replaces broken oEmbed API shortcode)
- **tweet.html** — Client-side Twitter/X embed (replaces broken oEmbed API shortcode)

These exist because Hugo's built-in `instagram` and `tweet` shortcodes call oEmbed APIs that now require authentication, causing build failures.

## Theme

The theme (`cactus-plus`) is a git submodule at `themes/cactus-plus/`. Layout overrides in `layouts/` take precedence over theme templates. Several partials are overridden to fix deprecated Hugo functions (`.Hugo.Generator`, `.Site.RSSLink`, `.Site.Pages`).
