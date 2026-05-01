# TIHLO — Visual Refresh Directive
**This directive SUPERSEDES all previous colour and layout specs.**
If any earlier directive (`TIHLO-BUILD-BRIEF.md`, `TIHLO-UX-UPGRADE-DIRECTIVE.md`, `TIHLO-OPERATIONAL-SPATIAL.md`) conflicts with this document, **this document wins.**

---

## 1. What changed and why

Three shifts, all client-directed:

1. **Background shifts from warm cream (#F4F1EA) to clean white (#FFFFFF).** The cream palette looked intentional in design files but reads as dingy grey on most screens and phones. White breathes.

2. **Red discipline tightens.** Red was being used in 63 places (buttons, eyebrows, hover states, numbers, chrome, borders). It overpowered the site. The logo uses red exactly *once* — the dot after the O. The site should follow that restraint. Red now lives in: the logo, the line illustrations, hover states (sparingly), and one graphic accent per section. Never as a dominant UI colour.

3. **Hero becomes clean and minimal.** Headline left-aligned, one photograph or graphic element on the right, generous negative space. No floating overlapping cards. No spatial compositions in the hero. Clean.

---

## 2. New colour system

Replace the `:root` variables in `app/globals.css` entirely:

```css
:root {
  /* Backgrounds */
  --white:      #FFFFFF;
  --white-2:    #F8F8F8;   /* barely-there section alternation */
  --white-3:    #F2F2F2;   /* used for card fills or input fields */

  /* Ink */
  --ink:        #0E1014;
  --ink-2:      #1A1D22;
  --ink-3:      #2A2F38;

  /* Text opacity scale */
  --muted:      rgba(14, 16, 20, 0.55);   /* body copy */
  --dim:        rgba(14, 16, 20, 0.32);   /* captions, rules */
  --faint:      rgba(14, 16, 20, 0.12);   /* borders, dividers */
  --ghost:      rgba(14, 16, 20, 0.06);   /* subtle grid, watermarks */

  /* Accent — the logo dot colour */
  --red:        #B42318;
  --red-hover:  #911A11;   /* darker red for hover states */
  --red-tint:   rgba(180, 35, 24, 0.08);  /* background tint behind red elements */

  /* Status — used only in operational indicators */
  --green:      #1A6B3D;
  --green-tint: rgba(26, 107, 61, 0.08);
  --amber:      #B5841F;
}
```

### What was removed

- `--paper` (#F4F1EA) — gone entirely
- `--paper-2` (#ECE7DC) — gone
- `--paper-3` (#E2DCCB) — gone
- `--paper-4` (#D8D2C0) — gone
- `--rule`, `--rule-2`, `--rule-3` — replaced by `--faint` and `--dim`
- `--red-glow` — gone (no more glowing red elements)

### Migration pattern

Every file that references `var(--paper)` needs updating:

| Old token | New token |
|---|---|
| `var(--paper)` | `var(--white)` |
| `var(--paper-2)` | `var(--white-2)` |
| `var(--paper-3)` | `var(--white-3)` |
| `var(--paper-4)` | `var(--white-3)` |
| `var(--rule)` | `var(--faint)` |
| `var(--rule-2)` | `var(--faint)` or `var(--dim)` depending on weight |
| `var(--rule-3)` | `var(--dim)` |

Run this to find every reference:
```bash
grep -rn "var(--paper\|var(--rule" --include="*.tsx" --include="*.ts" --include="*.css" .
```

Update each occurrence. This is the largest mechanical change in the directive — ~80 find-and-replace edits.

### Selection colour

```css
::selection {
  background: var(--ink);
  color: var(--white);
}
```

Changed from red selection to ink selection. Red selection was distinctive but fatiguing on a white background. Ink selection is clean and universal.

---

## 3. Red discipline — the logo rule

**Look at the TIHLO logo.** It uses red exactly once: the dot. The site follows the same rule.

### Where red IS allowed

1. **The logo dot** — always.
2. **Line illustrations** — red accent strokes on specific elements (a fuel gauge needle, a deviation path, a flagged vehicle outline). Red is *part of the drawing*, not applied to the whole drawing.
3. **The radar/eye graphic** — the scan line and centre dot in any radar-mark usage.
4. **Hover states** — links and interactive elements shift to `var(--red)` on hover. This is subtle and disappears when the cursor moves.
5. **One graphic accent per section** — a single number, a single data point, a single status indicator. Never two. Never three.
6. **Status indicators** — the operational LIVE dot, exception markers.

### Where red is NOT allowed

- **Buttons.** Primary buttons are `bg-[var(--ink)]` with `text-white`. On hover, they shift to `bg-[var(--red-hover)]`. Red only appears on hover, not at rest.
- **Headlines or body text.** No red words, no red emphasis spans, no red italic accent words.
- **Eyebrow labels.** Eyebrows use `text-[var(--muted)]` with a `var(--ink)` rule line, not red.
- **Section borders or dividers.** All borders use `var(--faint)` or `var(--dim)`.
- **Number text.** Big stat numbers are `var(--ink)`, not red. The label beside them can have a small red dot or accent, but the number itself stays ink.
- **The nav.** No red in the navigation at all, except the logo dot.

### Implementation

**Audit every `text-[var(--red)]` in the codebase.** For each occurrence, decide:
- Is this in a line illustration or graphic? → Keep.
- Is this a hover state? → Keep if it's a `hover:` or `group-hover:` class.
- Is this a UI element (button, label, heading, border)? → Change to `var(--ink)` or `var(--muted)`.
- Is this the one allowed graphic accent for the section? → Keep if it's the only one. Remove if there are multiples.

```bash
grep -rn "var(--red)" --include="*.tsx" --include="*.ts" --include="*.css" . | wc -l
# Target: reduce from ~63 to ~15-20 occurrences
```

---

## 4. Button system (revised)

```typescript
const variants = {
  primary:
    'bg-[var(--ink)] text-white border border-[var(--ink)] hover:bg-[var(--red-hover)] hover:border-[var(--red-hover)] transition-all duration-200',
  ghost:
    'bg-transparent text-[var(--ink)] border border-[var(--dim)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all duration-200',
  white:
    'bg-white text-[var(--ink)] border border-white hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all duration-200',
};
```

On white backgrounds, primary buttons are dark anchors with ink fill. On dark backgrounds (if any), use the `white` variant.

The red-on-hover of the primary button is the site's most visible red moment — and it's transient. It only appears when you're about to click. That's exactly the restraint the logo demonstrates.

---

## 5. Eyebrow component (revised)

The eyebrow currently uses a red rule line and red text. Change both:

```tsx
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] font-medium text-[var(--muted)] ${className ?? ''}`}>
      <span className="block h-px w-5 bg-[var(--ink)]" />
      {children}
    </span>
  );
}
```

Rule line: ink (not red).
Text: muted (not red).

The eyebrow becomes a quiet structural marker rather than a colour accent. Headlines do the visual work.

---

## 6. Homepage hero (the definitive version)

### Layout

Two columns on desktop. Single column on mobile.

```
LEFT (55%)                              RIGHT (45%)
─────────────────────────              ─────────────────────
Eyebrow                                 [photograph or
                                         graphic element,
Headline                                 large, cropped,
"The eye that                            with registration
 never misses."                          corner marks]

Lede paragraph

[Primary CTA]  [Ghost CTA]

Three stats in a horizontal row
─────────────────────────              ─────────────────────
```

### Left column

```tsx
<div className="flex flex-col justify-center py-24 lg:py-40">

  <Eyebrow>Active monitoring · 24/7</Eyebrow>

  <h1 className="mt-8 font-display text-[clamp(48px,6.5vw,96px)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--ink)]">
    <MaskHeading delay={0.1}>The eye that</MaskHeading>
    <MaskHeading delay={0.25}>never misses<span className="text-[var(--red)]">.</span></MaskHeading>
  </h1>

  <p className="mt-8 max-w-[48ch] text-[17px] leading-[1.6] text-[var(--muted)]">
    TIHLO operates the active monitoring layer for fleets, plant, and
    weighbridges — across mines, factories, depots, and municipal services.
    We watch what your operation does, catch what shouldn't happen, and log
    the consequence.
  </p>

  <div className="mt-10 flex flex-wrap items-center gap-3">
    <Button variant="primary" size="lg">Request a briefing →</Button>
    <Button variant="ghost" size="lg">How we operate</Button>
  </div>

  {/* Stats strip */}
  <div className="mt-14 flex gap-10 border-t border-[var(--faint)] pt-8">
    <Stat label="Diesel reclaimed" value="up to 18%" />
    <Stat label="Controller response" value="38s" />
    <Stat label="Loads monitored · 24h" value="3,047" />
  </div>

</div>
```

### Right column — photograph

A single, large mining photograph. Not full-bleed. Contained within the right column with generous padding. Registration marks at corners.

```tsx
<div className="relative hidden lg:flex lg:items-center lg:justify-end">
  <div className="relative aspect-[3/4] w-full max-w-[520px] overflow-hidden">

    {/* Registration corners */}
    <RegMarks color="var(--dim)" size={14} />

    {/* The photograph */}
    <Image
      src="https://images.unsplash.com/photo-1711028842317-31fbb9be4b25?auto=format&fit=crop&w=1200&q=85"
      alt="Mining haul truck on active corridor"
      fill
      className="object-cover"
      priority
    />

    {/* Bottom caption bar */}
    <div className="absolute bottom-0 left-0 right-0 bg-[var(--ink)]/80 backdrop-blur-sm px-5 py-3.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/70">
          Active corridor · Mpumalanga
        </span>
        <div className="flex items-center gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--green)]">
            On-record
          </span>
        </div>
      </div>
    </div>

  </div>
</div>
```

### What this hero does NOT have

- No floating spatial cards
- No overlapping elements
- No cursor parallax in the hero
- No background gradient mesh
- No ken-burns animation
- No welcome modal
- No scanner lines
- No operational chrome rail

Clean. Minimal. Headline left. Photo right. Breathe.

### On mobile

Single column. Photo sits above the headline at 16:9 aspect ratio. Headline below. Stats stack vertically.

---

## 7. The `<Stat>` component

Used in the hero and on other pages. Clean, minimal:

```tsx
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[28px] font-medium leading-none tracking-[-0.03em] text-[var(--ink)]">
        {value}
      </span>
      <span className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--dim)]">
        {label}
      </span>
    </div>
  );
}
```

Note: the value is ink (black), not red. The stat label is dim grey. This is clean and restrained.

---

## 8. Nav (revised for white backgrounds)

The floating pill nav on a white background needs enough contrast to be visible but still feel light.

```tsx
<div className="border border-[var(--faint)] bg-white/90 backdrop-blur-xl shadow-[0_2px_16px_rgba(14,16,20,0.06)]">
```

This gives the nav a hairline border + paper-white fill + ultra-subtle shadow. On scroll, the shadow deepens slightly:

```tsx
className={`transition-shadow duration-300 ${
  scrolled
    ? 'shadow-[0_4px_24px_rgba(14,16,20,0.10)]'
    : 'shadow-[0_2px_16px_rgba(14,16,20,0.06)]'
}`}
```

### Nav link active state

Active link gets a subtle underline in `var(--ink)` (not red):

```tsx
<Link
  href={link.href}
  className={`px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
    isActive
      ? 'text-[var(--ink)]'
      : 'text-[var(--muted)] hover:text-[var(--ink)]'
  }`}
>
  {link.label}
  {isActive && (
    <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[var(--ink)]" />
  )}
</Link>
```

### CTA button in nav

The nav's primary CTA stays ink:

```tsx
<Button variant="primary" size="sm">Request a briefing →</Button>
```

---

## 9. Section composition (revised)

With white backgrounds, sections need clear rhythm without colour changes doing the work. Two tools:

### 9.1 — Alternating background

Odd sections: `bg-white`
Even sections: `bg-[var(--white-2)]` (#F8F8F8)

The difference is barely visible — and that's the point. It creates rhythm without colour.

### 9.2 — Section top borders

Each section opens with a thin border and an eyebrow:

```tsx
<section className="border-t border-[var(--faint)] bg-[var(--white-2)] py-28 lg:py-40">
  <div className="mx-auto max-w-[1400px] px-8">
    <Eyebrow>What we monitor</Eyebrow>
    <h2 className="mt-8 ...">...</h2>
  </div>
</section>
```

### 9.3 — The one red accent per section

Each section is allowed exactly one red moment. Examples:

- **Hero**: the red dot after "misses" in the headline (`.`)
- **What We Monitor**: one line illustration has a red accent stroke (the fuel gauge needle, the deviation path)
- **How It Works**: the radar/eye graphic in the assurance loop uses red for the scan line
- **By The Numbers**: one stat has a small red dot beside its label — not the number itself
- **Why TIHLO**: the registration-mark corners on one photograph use red
- **Final CTA**: the slogan dot (same as hero)

This is the discipline. Red punctuates, it does not dominate.

---

## 10. Line illustrations with red accents

The line drawing system is one of the site's strongest visual assets. On a white background with restrained red, these drawings become **the primary visual signature**.

### Updated specification

```
Primary stroke:   1.5px, var(--ink)
Accent stroke:    1.5px, var(--red)
Annotation text:  font-mono, 9px, var(--dim)
Leader lines:     0.75px, var(--dim), dashed

Red usage in drawings:
- One accent element per drawing: a gauge needle, a route deviation, a flagged vehicle, a radar sweep line
- Rest of drawing is ink
- Annotations are dim grey
```

### Example — the fuel station drawing

The fuel station draws in ink. Everything — the tank, the dispenser, the hose, the meter panel — is `var(--ink)` 1.5px stroke. The **meter needle** is `var(--red)` — the single accent. One mono annotation floats beside it: `ANOMALY · +212L` in `var(--dim)`.

This is what "red in the graphics and line visual system" means. The illustration system carries the brand colour, not the UI.

---

## 11. Photography treatment on white

On a white background, photographs need more intentional framing. Two patterns:

### Pattern A — Bordered frame

```tsx
<div className="relative overflow-hidden border border-[var(--faint)]">
  <Image ... className="object-cover" />
  {/* Bottom caption bar */}
  <div className="border-t border-[var(--faint)] bg-[var(--white-2)] px-5 py-3">
    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[var(--dim)]">
      Mpumalanga corridor · May 2025
    </span>
  </div>
</div>
```

### Pattern B — Registration marks (no border)

```tsx
<div className="relative">
  <RegMarks color="var(--dim)" size={14} />
  <Image ... className="object-cover" />
</div>
```

Use Pattern A for smaller inline photos. Use Pattern B for larger hero-adjacent photos.

---

## 12. Utility bar (revised)

The utility bar at the very top of every page stays, but updates for the white palette:

```tsx
<div className="bg-[var(--ink)] text-white/72 font-mono text-[10px] tracking-[0.18em] uppercase px-8 py-2.5">
```

This dark strip is the only "dark mode" element on the entire site. It grounds the top edge and provides contrast for the nav below.

---

## 13. Footer (revised)

The footer on a white background:

```tsx
<footer className="border-t border-[var(--faint)] bg-[var(--white-2)] py-20">
```

### Closing slogan (large)

```tsx
<p className="font-display text-[clamp(48px,8vw,128px)] font-medium leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
  The eye that<br/>never misses<span className="text-[var(--red)]">.</span>
</p>
```

The red dot on "misses." is the footer's only red moment. Same discipline as the hero.

### Footer columns

Three columns below: Operations / Firm / Legal. All in `text-[var(--muted)]` with `hover:text-[var(--red)]` on links (the allowed hover-state red usage).

### Copyright bar

```tsx
<div className="mt-16 border-t border-[var(--faint)] pt-6 flex items-center justify-between">
  <span className="font-mono text-[9.5px] tracking-[0.18em] text-[var(--dim)]">
    © TIHLO · A Thinkers Afrika company
  </span>
  <span className="font-mono text-[9.5px] tracking-[0.18em] text-[var(--dim)]">
    Pretoria · South Africa
  </span>
</div>
```

---

## 14. What to keep from the operational spatial directive

Not everything in `TIHLO-OPERATIONAL-SPATIAL.md` is cancelled. These spatial behaviours still apply — they just live on a white canvas now:

### Keep
- **MaskHeading** component (line-by-line clip reveal on headlines)
- **Scroll-triggered section reveals** (opacity + translateY, IntersectionObserver)
- **Page transition scan line** (1px red line sweeps top-to-bottom on nav)
- **Photography parallax** (0.3× scroll speed, translate3d only, GPU-composite)
- **NumberRoll** component (numbers animate from 0 to target on viewport entry)
- **Line illustration draw-in animation** (stroke-dashoffset on scroll)

### Remove / do not implement
- **Operational chrome side-rail** — too heavy for the clean aesthetic
- **Floating spatial card compositions** — sections go back to clean grids
- **Welcome modal** — unnecessary complexity
- **Cursor dot** — too much
- **Section acquisition sweep lines** — too much red motion

### Revise
- **Nav** → stays floating pill, but with the white treatment described in §8
- **Utility bar** → stays dark strip, content unchanged
- **Cards** → no rotation, no overlap. Clean grid layouts with subtle hover lift only

---

## 15. Inner page heroes (revised for clean)

Every inner page hero follows the same clean pattern as the homepage: **headline left, supporting element right, generous negative space**.

### `/how-we-operate`
- Left: eyebrow + headline "How we operate." + lede
- Right: the assurance loop diagram (line-drawn, draws in on page load)

### `/about`
- Left: eyebrow + headline "We are TIHLO." + lede
- Right: mining landscape photograph with registration marks

### `/sectors`
- Left: eyebrow + headline "Where we operate." + lede
- Right: four small sector cards stacked (Mining / Factories / Logistics / Municipal) — text only, clean borders

### `/field-notes`
- Left: eyebrow + headline "Field Notes." + lede
- Right: nothing. Maximum negative space. The articles below are the visual content.

### `/contact`
- Left: eyebrow + headline "Initiate." + engagement tiers + address
- Right: the form (steps 1-3)

All inner-page heroes: white background, no photography bleed, no dark overlays.

---

## 16. Build order for this directive

```
Phase 1 — Colour migration (Day 1)
  - Replace all --paper tokens with --white equivalents in globals.css
  - Replace all --paper references in all .tsx/.ts files
  - Replace all --rule references with --faint/--dim
  - Update ::selection
  - Verify site renders on white without visual breaks

Phase 2 — Red audit (Day 1-2)
  - Audit every var(--red) usage
  - Remove red from: buttons (rest state), eyebrows, headlines, borders
  - Keep red in: logo, line illustrations, hover states, one accent per section
  - Update Button component
  - Update Eyebrow component
  - Target: ~63 occurrences → ~15-20

Phase 3 — Hero rebuild (Day 2)
  - Build new clean two-column hero
  - Source photograph (Unsplash)
  - Wire MaskHeading, Stat strip
  - Delete old Hero.tsx

Phase 4 — Nav + footer refresh (Day 2-3)
  - Update nav for white background (border, shadow, contrast)
  - Update footer with closing slogan + red-dot discipline
  - Update copyright bar

Phase 5 — Section cleanup (Day 3-4)
  - Apply alternating white / white-2 backgrounds
  - Add section top borders
  - Enforce one-red-accent-per-section rule across all homepage sections
  - Ensure line illustrations use red accents correctly

Phase 6 — Inner page heroes (Day 4)
  - Apply clean two-column hero to all inner pages
  - Source photographs where needed

Phase 7 — Motion integration (Day 4-5)
  - Wire MaskHeading across all page headlines
  - Wire scroll-triggered section reveals
  - Wire page transition scan line
  - Wire line illustration draw-in animations
  - Ensure prefers-reduced-motion is respected

Phase 8 — QA (Day 5)
  - Mobile review every page
  - Lighthouse audit (target: Performance ≥ 95, A11y ≥ 95)
  - Red audit: confirm ≤ 20 occurrences site-wide
  - Cross-browser check (Chrome, Safari, Firefox, Edge)
  - Contrast check on white backgrounds
```

---

## 17. Definition of done

- [ ] Zero references to `--paper` anywhere in source
- [ ] Background is clean white (#FFFFFF) with #F8F8F8 alternation
- [ ] Red appears in ≤ 20 places site-wide (down from 63)
- [ ] Red never appears in button rest states, headlines, eyebrows, or borders
- [ ] Red appears in: logo dot, line illustration accents, hover states, one graphic accent per section
- [ ] Primary buttons are ink (black) at rest, red on hover only
- [ ] Hero is clean two-column: headline left, photograph right
- [ ] No floating spatial cards, no cursor dot, no operational chrome rail
- [ ] Nav has visible contrast on white background (hairline border + subtle shadow)
- [ ] All headlines reveal via MaskHeading on scroll/load
- [ ] Page transitions include scan-line sweep
- [ ] Lighthouse Performance ≥ 95, A11y ≥ 95
- [ ] prefers-reduced-motion fully respected
- [ ] § symbol appears zero times in rendered UI

---

**End of directive.**

Hand this to Claude Code with: *"Read TIHLO-VISUAL-REFRESH.md. This supersedes all previous colour and layout specs. Begin at Phase 1 (colour migration). After Phase 2 (red audit), push a preview for client review before continuing."*
