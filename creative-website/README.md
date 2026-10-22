# Santa Barbara Aeronautics

A custom coastal flight-workshop website built with React, TypeScript, and Vite. Content and original assets come from `../grace-website`; that reference project is preserved.

```sh
npm install
npm run dev
```

`npm run build` type-checks and produces `dist/`. `npm run preview` serves that production build.

The design plan is in `DESIGN.md`. The Condor SVG is an illustrative concept, not an engineering drawing. Aircraft descriptions, available specifications, 2026–27 team members, sponsors, interest form, calendar, and contact address come from the reference content. The site does not collect form data; membership links to the club's existing Google Form.

The fleet selector supports arrow keys, Home, and End. The crew directory uses a native modal dialog. Mobile navigation supports Escape, and reduced-motion preferences are honored. All fonts and imagery are hosted locally.

Browser verification is in `tests/browser_check.py`. With Vite running, activate a Python environment containing `playwright` and run `npm run test:browser`. The script uses installed Google Chrome, checks the interactive controls and seven responsive widths, and writes screenshots to `/private/tmp/sb-aero-preview` by default. Set `SB_AERO_TEST_URL` or `SB_AERO_SCREENSHOTS` to override the preview URL or screenshot directory.
