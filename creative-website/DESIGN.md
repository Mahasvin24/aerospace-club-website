# Santa Barbara Aeronautics — coastal flight workshop

## Intent

Make the club feel like a place where curious students make real things fly. The club's own motto, marine research work, aircraft, and people are the material. Preserve `../grace-website` as the content reference.

## Design tokens

- Pacific blue `#264bc8`: identity, primary actions, display type.
- Sky `#e5eff9`: hero and illustration field.
- Sailcloth `#fafbf7`: page ground.
- Signal yellow `#e7ee98`: restrained workshop and membership accents.
- Deep ocean `#172c48`: readable body copy.
- Cloud `#ffffff`: aircraft and surfaces.
- General Sans: locally hosted, medium weight for large, tightly spaced headings; regular for text. No dependency on external font services.
- Soft corners belong to large panels and actions; project specs and reading content use open layouts.

## Structure

```text
mark / club name                     story  fleet  crew  support  [join]
┌──────────────────────────────────────────────────────────────────┐
│ Student-built in Santa Barbara                                   │
│ Beyond                 sculptural Condor concept                  │
│ the shore.             with selectable aircraft components        │
│ intro + explore        concept caption / selected part             │
└──────────────────────────────────────────────────────────────────┘
       A place to turn curiosity into something that flies.
┌────────────────────── fleet workbench ────────────────────────────┐
│ [Skyscout] [Condor] [RC Galaga]                                    │
│ real project image                  project story / known specs   │
└──────────────────────────────────────────────────────────────────┘
club story / ways to contribute         2026–27 crew / full directory
supporters                             join / calendar / questions
contact / navigation
```

Keep reading content left aligned, around 55–65 characters per line. The main illustration is the expressive centerpiece; supporting sections stay quiet. Use original SVG geometry rather than a stock aircraft photograph. Label the Condor drawing as an illustrative concept, never an engineering model. Use source photos for completed hardware.

## Review before building

Rejected a dark aerospace dashboard, animated starfield, faux live telemetry, and generic feature-card grid: they obscure the club's coastal, hands-on identity. The hero instead uses daylight, a solid illustrated airframe, and interactive explanations of the documented four-rotor / one-propeller concept. No invented metrics, events, or specifications. Team data reflects the supplied 2026–27 roster.

## Function and validation

Aircraft component selection, keyboard-operable fleet tabs, accessible mobile navigation, crew directory dialog, join information and working source links. Honor reduced motion, visible focus and readable mobile layouts. Build with React/TypeScript/Vite; check the production build and inspect desktop and mobile in a real browser.
