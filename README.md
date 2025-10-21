# SvelteKit Todo App (ready for GitHub Pages)

This is a minimal SvelteKit Todo application that:
- stores todos in `localStorage`
- displays items as `Text (not done)` / `Text (done)`
- is configured to output the static site into the `docs/` folder so you can publish to **GitHub Pages**.

## Quick start

```bash
npm install
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Commit and push this repository to GitHub (e.g. `main` branch).
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
4. Save. GitHub Pages will serve the `docs/` folder (output from `npm run build`).

## Notes

- If you prefer Deno Deploy instead of GitHub Pages, you can still use the `docs` output or adjust `svelte.config.js` adapter options.
