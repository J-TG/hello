# EMBER & BRINE Menu Landing Page

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Implementation Notes

### Architecture
- `App.jsx` orchestrates sections and global scroll motion setup.
- `components/` contains reusable UI units (`Hero`, `CategoryNav`, `MenuGrid`, `MenuCard`, `FeaturedSpotlight`, `FooterCTA`).
- `data/menuData.js` stores all sample categories, menu items, and featured content.
- `styles.css` centralizes visual language, fluid type, container queries, and responsive layout.

### Animation system
- GSAP is initialized with `gsap/react` `useGSAP()` API for proper scoping and cleanup.
- Hero intro uses timeline-driven reveals and `SplitText` line masking.
- Section entrances and parallax accents are powered by `ScrollTrigger`.
- Card micro-interactions use GSAP transforms for subtle depth on pointer movement.

### Category transition behavior
- `MenuGrid` uses GSAP `Flip` to animate between filtered category states.
- On category switch, the previous card state is captured with `Flip.getState()`, then animated into the new layout with enter/leave refinements.
- The result is a smooth, editorial transition rather than abrupt re-rendering.

### Reduced motion handling
- The app checks `prefers-reduced-motion` and bypasses timeline-heavy or scroll-linked animation when enabled.
- CSS adds a reduced-motion safety net by minimizing transition/animation duration.
- Content remains fully readable and keyboard-accessible without depending on motion.
