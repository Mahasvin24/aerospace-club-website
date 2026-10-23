# Santa Barbara Aeronautics

A single-page website for the UC Santa Barbara aerospace club, built with React 19, TypeScript, Vite, and plain CSS. Fonts and images are served locally from `public/assets/`; club links, aircraft details, and the team roster live in `src/data.ts`.

Use Node.js 22.12 or newer and npm. From `creative-website`, run:

```sh
npm ci
npm run dev
```

Run `npm run build` to type-check and generate `dist/`, then `npm run preview` to serve the production build locally. `npm run typecheck` runs the TypeScript checks separately.

The site includes an interactive Condor illustration, keyboard-controlled fleet tabs with URL selection, a team directory dialog, mobile navigation, and expandable FAQs. It supports reduced motion and links to the club’s existing interest form rather than collecting submissions itself.

Browser checks use `npm run test:browser` with Vite running, Python Playwright available, and Google Chrome installed. See [DESIGN.md](DESIGN.md) for the visual direction and `public/assets/ASSETS*.md` for asset provenance.
