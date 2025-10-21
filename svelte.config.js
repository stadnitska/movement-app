import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      // build output configured for GitHub Pages: 'docs' folder
      pages: 'docs',
      assets: 'docs',
      fallback: null
    }),
    // leave other defaults
  }
};

export default config;
