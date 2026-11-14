// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://xami-sound.pages.dev',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // CSP: style-src 'self' — no inline <style> blocks.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // CSP: script-src 'self', font-src 'self' — never inline scripts or data: URIs.
      assetsInlineLimit: 0,
    },
  },
});
