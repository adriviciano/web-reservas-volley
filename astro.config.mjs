// @ts-check
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({ 
    site: 'http://127.0.0.1:8000',
    integrations: [react()],
});
