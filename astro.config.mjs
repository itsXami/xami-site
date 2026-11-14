// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://xami.pages.dev',
  output: 'static',
  build: {
    // CSP: style-src 'self' — no inline <style> blocks.
    inlineStylesheets: 'never',
  },
});
