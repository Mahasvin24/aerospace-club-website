# Project Memory

## Constraints and invariants

- **Framer motion is the source of truth** — Do not invent entrance, scroll, parallax, loop, or page-transition effects. A full node-property scan of Framer project `VoAOa3GdzAB3zCm2BUxX` found none of those effects. The intentional runtime motion is the navigation component and the home ticker. Evidence: Framer component `ncHv6t0nb`, `src/components/Header.css`, and `src/pages/HomePage.tsx`. Last verified: 2026-10-26.

## Discoveries and gotchas

- **Navigation timing** — The Framer navigation variants use a spring with `duration: 0.62s`, `bounce: 0.28`, and no delay; the hamburger lines use the same spring. Navigation-link color uses a `0.2s` tween with cubic Bézier `[0.44, 0, 0.56, 1]`. Evidence: Framer component `ncHv6t0nb` and link preset `Z_jXteXU8`; implemented in `src/components/Header.css`. Last verified: 2026-10-26.
- **Home ticker timing** — The Framer ticker uses velocity `18`, default direction, no dragging, and a raw `hoverModifier` value of `50`. The clone measures the repeated-item distance and derives duration from `distance / 18` so its speed remains stable across responsive sizes. Evidence: Framer node `bPczYCHRA` and `src/pages/HomePage.tsx`. Last verified: 2026-10-26.
- **Breakpoint-frame transitions are not page effects** — The Home breakpoint frames carry spring physics `stiffness: 500`, `damping: 60`, `mass: 1`; the other five pages carry `duration: 0.4s`, `bounce: 0.2`. No `pageEffects` are configured. Do not reinterpret these as route-entry animations without observing a live Framer preview. Last verified: 2026-10-26.

## Open threads

- **Ticker hover modifier semantics remain unverified** — Framer exposes `hoverModifier: 50` but the connector documentation does not define whether it means 50% speed, a 50-unit velocity, or another interpolation. The clone intentionally does not add a hover speed change until that behavior can be observed or documented.
