# Animation Audit - Ally & Dalton Wedding Website

Audit date: June 30, 2026  
Scope: `styles.css`, `script.js`, and animation-related behavior across the static pages.

## Summary

The site already has an elegant animation foundation: the homepage hero fades in softly, scroll reveals use opacity and transform, hover states are restrained, and `prefers-reduced-motion` is respected. The biggest opportunities are refinement rather than reinvention: make the mobile menu open smoothly, reduce repetitive reveal delays on long pages, avoid hover motion on touch devices, and standardize easing so the movement feels more like luxury stationery and less like default web animation.

## Findings By Area

### Scroll Reveal Animations

- **Current behavior:** `script.js` adds `.reveal-on-scroll` to many sections and cards, then reveals them through `IntersectionObserver`.
- **What works:** Uses opacity and transform, unobserves elements after reveal, and falls back safely if `IntersectionObserver` is unavailable.
- **Issue:** Delay is based on the full page-wide index, so long pages can feel mechanically staggered rather than composed by section.
- **Issue:** The default `translateY(42px)` is a little large for refined editorial motion, especially on mobile.
- **Recommended improvement:** Use a smaller rise distance, a softer easing curve, and a shorter repeating stagger cycle.

### Hero Page-Load Animation

- **Current behavior:** Names, date, location, and countdown fade in with staggered delays.
- **What works:** Feels appropriate for the invitation-style homepage and does not animate layout-affecting properties.
- **Issue:** Timing uses plain `ease`; a custom cubic-bezier curve would feel more deliberate.
- **Recommended improvement:** Use shared motion variables for duration and easing, and slightly soften the vertical movement.

### Card Hover Animations

- **Current behavior:** Cards and buttons lift on hover with box-shadow changes.
- **What works:** The movement is subtle and mostly uses transform.
- **Issue:** Hover states are active globally, including on touch devices where hover behavior can feel sticky or odd.
- **Issue:** Several hover timings use short default `ease` values, making cards feel a bit quick compared with the site tone.
- **Recommended improvement:** Limit lift animations to hover-capable fine pointers and use a slower, softer shared easing curve.

### Button and Text Link Hover Animations

- **Current behavior:** Buttons lift and text/map links animate underlines.
- **What works:** Underline animations are polished and appropriate for the reference direction.
- **Issue:** Button lift is slightly more assertive than the rest of the design.
- **Recommended improvement:** Reduce button lift slightly and standardize transition timing.

### Mobile Menu Animation

- **Current behavior:** The mobile menu toggles between `display: none` and `display: grid`.
- **Issue:** `display` cannot animate, so the menu appears abruptly.
- **Why it matters:** The menu is a frequent mobile interaction and should feel as smooth as the rest of the site.
- **Recommended improvement:** Keep the menu in the layout layer with `opacity`, `visibility`, `transform`, and `max-height` transitions.

### Timeline Animations

- **Current behavior:** Schedule events reveal from alternating horizontal directions on desktop and from below on mobile.
- **What works:** The reveal direction reinforces the staggered editorial layout.
- **Issue:** Horizontal motion can feel slightly busy on a page with large decorative schedule cards.
- **Recommended improvement:** Reduce horizontal travel and use a softer reveal distance.

### FAQ Behavior

- **Current behavior:** The live FAQ page is not an accordion; it uses static editorial question/answer rows.
- **What works:** No collapse animation is needed, so there is no hidden content or janky accordion transition.
- **Issue:** The old style-guide sample still demonstrates an accordion, but that is a style-guide consistency issue rather than a live FAQ animation issue.
- **Recommended improvement:** Keep the live FAQ static and let each Q&A row reveal gently on scroll.

### Parallax and Floating Decorative Elements

- **Current behavior:** Floral/floating keyframes exist in CSS, but the `.hero-floral` elements are currently hidden by default.
- **What works:** There is no distracting parallax currently affecting guests.
- **Issue:** Unused floating animation code could confuse future design work.
- **Recommended improvement:** Keep decorative movement subtle if re-enabled, and ensure it remains disabled under `prefers-reduced-motion`.

### Reduced Motion

- **Current behavior:** `@media (prefers-reduced-motion: reduce)` effectively disables transitions, animations, smooth scrolling, and reveal transforms.
- **What works:** This is a strong accessibility foundation.
- **Recommended improvement:** Keep this behavior and make sure any new animation variables still route through the same reduced-motion block.

## Improvements Made

- Added shared motion variables for easing and timing.
- Smoothed hero page-load animation with a more refined easing curve.
- Reduced scroll reveal travel distance and made reveal timing more consistent.
- Changed reveal staggering in `script.js` to repeat in a shorter, softer rhythm.
- Smoothed the mobile menu open/close behavior using opacity, visibility, transform, and max-height instead of abrupt display toggling.
- Limited hover lift animations to hover-capable devices.
- Reduced card and button lift distances slightly.
- Reduced schedule reveal side motion to make the timeline feel calmer.

