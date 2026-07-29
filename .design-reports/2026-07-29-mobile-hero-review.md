# Mobile Hero Design Review

- URL: `https://wallscaler.github.io/ctk-website/`
- Date: 2026-07-29
- Design system: Custom Christ The King church site
- Scope: Homepage hero at 390 x 844 and desktop regression check

## Result

| Category | Before | After | Finding |
| --- | --- | --- | --- |
| Visual hierarchy | C | A- | Mission cards overwhelmed the phone's opening screen; the revised phone hero leads with the church, mission, and actions. |
| Spacing and layout | D | A- | Three desktop cards stacked into an excessively tall image overlay; they are now limited to tablet and desktop. |
| Responsive design | D | A | The hero now fits below the mobile header with no horizontal overflow, and both 48px-or-larger actions appear above the fold. |
| Content quality | A | A | The mission and visit actions remain intact. |
| Cross-page consistency | A- | A- | Desktop presentation is unchanged. |

**Design score:** B- to A-

**AI slop score:** C to B+ — the repetitive icon-card grid no longer dominates the phone experience.

## Verified Fix

- Shifted the mobile image crop toward the arriving family.
- Reduced mobile heading and section spacing.
- Hid the redundant three-card grid below the medium breakpoint.
- Stacked the two calls to action with full-width, touch-friendly controls.
- Verified at an exact 390 x 844 viewport:
  - document width: 390px
  - hero height: 756px
  - horizontal overflow: none
  - first action: 48px high
  - second action: 50px high
  - visible mission cards: 0
- Verified the desktop photo, mission cards, and layout remain intact.
