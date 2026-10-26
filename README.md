# Santa Barbara Aeronautics

A six-page website for the club, based on its Framer design. Built with React 19, TypeScript, Vite, React Router, and plain CSS. Fonts and images are served locally from `public/assets/`.

Use Node.js 22.12 or newer and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and generates `dist/`. `npm run preview` serves that build locally. Run `npm run typecheck` for TypeScript checks and `npm test` for the Vitest navigation regression tests.

The routes cover Home, About, Our Fleet, Team, Join, and Sponsors. Features include the aircraft blueprint, animated marquee with a reduced-motion version, keyboard navigation, and external membership and calendar links. Layouts follow the Framer ranges: desktop at 1200px+, tablet at 810–1199px, and phone below 810px.

Production hosting needs an `index.html` fallback for client-side routes.
