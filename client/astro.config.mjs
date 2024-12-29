// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }), 
    react()
  ],
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "pt-br",
  }
});