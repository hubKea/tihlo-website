# TIHLO — UX Upgrade Directive
**Reference:** Diagnoses the specific visual issues identified by the client.
**Scope:** Visual polish, contrast fixes, red-presence increase, spacing refinement.
**Priority:** After STEP 1–8 of TIHLO-FIXES-DIRECTIVE.md are complete. This is round two.

---

## What's actually wrong (precise diagnosis)

### 1. Red is referenced but never *visible*
Red appears in 63 places across 26 files, but always at micro-scale:
- 1px underlines (`after:h-px after:w-full`)
- 6px dots (`h-1.5 w-1.5`)
- Eyebrow accent lines (22px × 1px)
- Hover states only (primary button is `bg-[var(--ink)]`, becomes red only on hover)

The brand colour is doing none of the work it should be doing. A first-time visitor experiences the site as paper + ink, with red as occasional decoration. The brand reads as monochromatic, which is why it feels muted.

### 2. Nav contrast fails on every inner page
The nav is `bg-[var(--paper)]/90` — paper at 90% opacity. The homepage hero has dark photography, so the cream pill stands out. Every other page (`/about`, `/services`, `/sectors`, `/how-we-operate`, `/field-notes`, `/contact` form section) uses `bg-[var(--paper)]` for the page hero. **Cream nav on cream background = invisible.**

Specifically failing pages:
- `/about` — paper hero
- `/services` — paper hero
- `/sectors` — paper hero
- `/how-we-operate` — paper hero
- `/field-notes` (index) — paper hero
- `/contact` — has dark hero strip, then paper section where nav floats invisibly

### 3. Spacing is conservative and even
The site uses safe, even spacing throughout — `py-24 lg:py-32` everywhere. There are no compositional moments where one section is dramatically taller, one is denser, one breathes. The result is a rhythmically flat scroll.

Compare to sites the client referenced (Linear, Vercel): they alternate dense/airy/dense, use unconventional margins, push elements off-grid for emphasis. The current TIHLO scroll feels like a competent template.

### 4. No "hero moment" beyond page 1
The homepage hero has full-bleed photography with an eye composition. Every other page opens with: eyebrow → headline → lede → buttons, on paper. They all look identical structurally. Inner pages have no visual hierarchy of their own.

### 5. UX micro-issues
- Nav links use `pathname === link.href` for active state but the styling is ambiguous (active = ink, inactive = muted, both have hover underline)
- `LIVE` indicator is hidden on mobile but is one of the most distinctive brand elements
- Footer is text-only; no visual signature
- Form inputs use border-bottom only — no fill, no contrast against paper background, fields visually merge
- `h2` and `h3` weight (`font-medium`) is the same as `h1` — type hierarchy is muted
- No section dividers with visual weight; sections separate via paper-2 alternation only

---

## STEP 1 — Fix nav contrast on inner pages

This is the most jarring issue and the easiest to fix. Three options, in order of preference:

### Option A — Smart contrast nav (recommended)

The nav reads its own backdrop and adjusts. When the page behind it is paper-toned, the nav becomes ink (dark). When the page is dark (homepage hero), the nav stays paper.

**Implementation in `components/layout/Nav.tsx`:**

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// ... existing imports

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const pathname = usePathname();

  // Determine if the current page has a dark hero
  // Homepage and pages with dark hero sections set this true.
  const darkHeroRoutes = ['/'];  // add more if you create dark heroes elsewhere

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);

      // If route has a dark hero AND we're still over it, nav is light-on-dark
      if (darkHeroRoutes.includes(pathname)) {
        const heroEnd = window.innerHeight * 0.85;
        setOverDark(window.scrollY < heroEnd);
      } else {
        setOverDark(false);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // ...
}
```

**Then in the nav JSX, conditionally style:**

```tsx
<nav
  className={`mx-4 flex w-full max-w-site items-center gap-8 border px-6 py-3.5 backdrop-blur-md lg:mx-8 transition-all duration-300 ${
    overDark
      ? 'border-white/15 bg-[var(--ink)]/70 text-[var(--paper)]'
      : 'border-[var(--rule-2)] bg-[var(--paper)]/85 text-[var(--ink)]'
  }`}
  style={{ boxShadow: overDark ? '0 2px 24px rgba(0,0,0,0.4)' : '0 2px 24px rgba(14,16,20,0.08)' }}
>
```

**And update child elements to inherit or explicitly switch:**
- Brand wordmark colour follows nav state
- Nav links: when `overDark`, use `text-white/70` for inactive, `text-white` for active and hover
- `LIVE` indicator: red dot stays red (it's the brand accent), but `LIVE` text colour follows nav state
- Buttons: see Step 2 below

This gives the nav genuine contrast on every page. On the homepage it's dark while you're over the photo, paper after you scroll past. On every inner page it stays paper because there's no dark hero.

### Option B — Always-dark nav (simpler)

Switch the nav permanently to `bg-[var(--ink)]/90` with paper-coloured links and brand. Now the nav is dark on every page, including the homepage hero where it sits over dark photography (still works — slightly less floaty, more grounded).

This is half a day's work vs. a day for Option A, and arguably looks more institutional. The trade-off: you lose the homepage's "floating cream pill over dark photo" moment, which is a current strength.

### Option C — Pin the nav with a solid bar (least pretty)

Make the nav a solid full-width strip across the top of every page (not a floating pill). Dark, full-width, no blur. Functional but kills the design ambition.

**Recommendation: Option A.** It's the most considered, and the codebase is already structured to support it.

---

## STEP 2 — Make red actually present

Red exists on the site but never at scale. Five specific changes increase its visible presence without breaking the discipline of "red is the accent, not the dominant colour."

### 2.1 — Primary button becomes red (not ink)

Currently primary buttons are ink → red on hover. Flip this. **Primary CTA is red by default; ink on hover.** The "Request a briefing" CTA is the most-clicked element on the site — making it red gives the brand colour a prominent role on every page.

**In `components/ui/Button.tsx`:**

```typescript
const variants = {
  primary:
    'bg-[var(--red)] text-[var(--paper)] hover:bg-[var(--ink)] border border-[var(--red)] hover:border-[var(--ink)]',
  ghost:
    'bg-transparent text-[var(--ink)] border border-[var(--rule-2)] hover:border-[var(--red)] hover:text-[var(--red)]',
  white:
    'bg-[var(--paper)] text-[var(--ink)] border border-[var(--paper)] hover:bg-[var(--red)] hover:text-[var(--paper)] hover:border-[var(--red)]',
};
```

Note the ghost button now also gets a red hover state — extends red presence to the secondary CTA without making it the resting colour.

### 2.2 — Section headers get red index numbers at scale

Currently section index numbers (`§ 01`, `§ 02`) are 9.5px–10.5px mono in muted colour. Bump the visible ones to:
- **48px display weight** mono numerals
- **Red** (`var(--red)`)
- **Top-aligned with section headline**, not above as eyebrow

**Example — for `WhatWeMonitor.tsx` section list items:**

Before:
```tsx
<span className="col-span-2 mono-id text-[var(--dim)] lg:col-span-1">
  § 0{i + 1}
</span>
```

After:
```tsx
<span className="col-span-2 font-mono text-[clamp(36px,4vw,56px)] font-medium leading-none text-[var(--red)] tabular-nums lg:col-span-1">
  0{i + 1}
</span>
```

Apply this pattern to:
- `WhatWeMonitor` — four numbered rows
- `WhyTihlo` — four numbered pillars
- `HowItWorks` — three numbered movements
- `ByTheNumbers` — three numbered stats
- `HOW_WE_OPERATE` page — six numbered stages
- `Sectors` page — four numbered sectors
- Contact engagement tiers — three numbered tiers

Suddenly red appears at scale on every page, doing actual visual work.

### 2.3 — One large red stat per page

Each page should have one moment where a key number renders in **red, at very large display weight** — 80px+. This creates a single visual focal point per page that's unmistakably brand-coloured.

Candidates per page:
- **Homepage** — In `ByTheNumbers`, render the **18%** in red at full size
- **Sectors** — A "**4**" or "**6**" sectors covered, large
- **About** — Years of experience or number of provinces operated in
- **How We Operate** — The "**6**" stages number
- **Field Notes** — Article count `No. 04` style

**Example pattern:**

```tsx
<div className="font-display text-[clamp(120px,18vw,240px)] font-medium leading-none tracking-[-0.05em] text-[var(--red)] tabular-nums">
  18<span className="text-[0.4em]">%</span>
</div>
<p className="mono-label mt-4 text-[var(--muted)]">
  Diesel reclaimed · first 90 days · pre-engagement baseline
</p>
```

This is the single biggest aesthetic move in this directive. One genuinely large red number per page changes the entire perception of the brand presence.

### 2.4 — Red rule lines as section separators

Currently sections separate via background-colour alternation only (paper / paper-2). Add a 1px red rule with the section's index number above the headline:

```tsx
<div className="mb-12 flex items-center gap-4">
  <span className="block h-px w-16 bg-[var(--red)]" />
  <span className="mono-label text-[var(--red)]">§ 02 · How TIHLO operates</span>
</div>
```

The `Eyebrow` component already does something like this; ensure it uses red consistently and the rule line is **16px** (visible), not the current 22px-but-1px (invisible).

### 2.5 — Red hover states on links

Currently nav links and inline links use mono-coloured hover. Switch all interactive text to use red on hover:

```css
/* Add to globals.css @layer components or use Tailwind hover: */
a:hover { color: var(--red); transition: color 200ms ease; }
```

But scope it carefully — this affects every link on the site. Preferable approach: define a `.link` utility class and apply it deliberately to body-text links, footer links, and field-notes navigation. Don't apply to all `a` globally.

---

## STEP 3 — Inner page heroes need their own moments

Every inner page currently opens with the same structure: floating nav → eyebrow → headline → lede → optional buttons. Identical. Boring.

Each inner page needs a distinct hero treatment so the site has visual range. Specific recommendations:

### 3.1 — `/sectors` hero
**Current:** Plain paper hero with text
**Upgrade:** Add a horizontal strip beneath the headline showing the four sectors as stacked horizontal bars with the line illustrations from the existing system. Hover any bar = it expands and the illustration animates. This previews the page below and gives the hero a visual element.

```tsx
<div className="mt-16 grid grid-cols-1 gap-px bg-[var(--rule)] lg:grid-cols-4">
  {SECTORS.map((sector, i) => (
    <Link key={sector.label} href={`#sector-${i}`} className="group bg-[var(--paper)] p-8 transition-all hover:bg-[var(--paper-2)]">
      <span className="font-mono text-4xl font-medium text-[var(--red)]">0{i+1}</span>
      <h3 className="mt-6 font-display text-2xl">{sector.label}</h3>
      <p className="mono-id mt-2 text-[var(--muted)]">{sector.contexts}</p>
      <div className="mt-6 h-20 text-[var(--ink)]/60 transition-colors group-hover:text-[var(--red)]">
        <LineIllustration variant="..." />
      </div>
    </Link>
  ))}
</div>
```

### 3.2 — `/how-we-operate` hero
**Current:** Headline + assurance loop SVG
**Upgrade:** Make the assurance loop **dominant** — full viewport height, centred, with the headline overlaid. The loop should be the moment, not an afterthought. Animate it drawing in on page load (1.4s, ease.cinematic). Once drawn, the six labels appear sequentially. Once all are visible, the headline fades in over the centre of the loop. This is a proper "hero moment" — different from the homepage but equally distinctive.

### 3.3 — `/about` hero
**Current:** Plain paper hero
**Upgrade:** Add a documentary photograph (Unsplash mining landscape) on the right side of the hero — half-bleed, framed by registration corners. The headline sits left, photo right. This mirrors the homepage's photographic register without copying it.

### 3.4 — `/field-notes` index hero
**Current:** Plain paper hero
**Upgrade:** Make it look like a publication masthead. "FIELD NOTES" set in **massive display weight** (300px+), tightly cropped at the top of the page. Below: "Volume 1 · 2026 · TIHLO" mono. Below that: a horizontal rule and the article grid. This references New York Times Magazine / The Atlantic mastheads.

### 3.5 — `/contact` hero (already good)
Currently the only inner page with a dark hero strip. Keep it but increase the headline size by 20% and add a subtle red registration-corner detail in the top-left that breaks across the boundary between hero strip and form area below. Small detail, big sense of intent.

---

## STEP 4 — Spacing rhythm

The site currently uses uniform `py-24 lg:py-32` everywhere. This is the mark of a competent template, not a designed site.

### 4.1 — Establish three section-height tiers

Define three vertical-rhythm options and use them deliberately:

```css
/* Add to tailwind.config.ts or globals.css @layer utilities */
.section-tight   { padding-top: 80px;  padding-bottom: 80px;  }   /* For dense, rapid sections */
.section-normal  { padding-top: 128px; padding-bottom: 128px; }   /* Default */
.section-breathe { padding-top: 192px; padding-bottom: 192px; }   /* For one or two key moments per page */

/* Responsive — these collapse on mobile */
@media (max-width: 1024px) {
  .section-tight   { padding-top: 56px;  padding-bottom: 56px;  }
  .section-normal  { padding-top: 80px;  padding-bottom: 80px;  }
  .section-breathe { padding-top: 112px; padding-bottom: 112px; }
}
```

### 4.2 — Apply rhythm intentionally

For each page, map sections to height tiers:

**Homepage:**
- Hero: 100vh (already)
- WhatWeMonitor: `section-normal`
- HowItWorks: `section-breathe` ← give the methodology room
- WhyTihlo: `section-tight` ← rapid, dense
- ByTheNumbers: `section-breathe` ← the big numbers need air around them
- FinalCTA: `section-normal`

**Sectors page:**
- Hero with sector preview strip: ~70vh
- Each sector detail block: `section-breathe` ← let each sector own its space
- (No more "five quick rows" feel — each sector is a destination)

**About:**
- Hero: ~75vh
- The firm: `section-normal`
- Operating principles: `section-tight` ← rapid four-statement list
- Where we operate (map): `section-breathe` ← the map deserves room
- Photography row: `section-tight`
- Governance: `section-tight`

This single change — varying section heights by intent rather than uniformity — makes the site feel composed rather than generated.

### 4.3 — Asymmetric grids on key sections

Currently most sections use `grid-cols-12` evenly or `grid-cols-2`. Introduce intentional asymmetry on the marquee sections:

**Example — `WhatWeMonitor` headline area:**

Before:
```tsx
<div className="col-span-12 lg:col-span-7">[headline]</div>
<div className="col-span-12 lg:col-span-4 lg:col-start-9">[lede]</div>
```

After:
```tsx
<div className="col-span-12 lg:col-span-8">[headline]</div>
<div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-32">[lede pushed down to align with headline baseline]</div>
```

The lede pushed down so it aligns to the *bottom* of the headline rather than the top. This is a Linear / Vercel signature move — visually it reads as composed, not evenly distributed.

---

## STEP 5 — Form fields need contrast

Currently form inputs use border-bottom only on a paper background. The fields visually disappear into the page until you focus them. Two fixes:

### 5.1 — Add fill to inputs

```tsx
// In ContactForm.tsx, update TextInput:
<input
  {...props}
  className={`w-full border-b bg-[var(--paper-2)] px-4 py-3 font-display text-[15px] text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-all focus:bg-[var(--paper)] focus:border-[var(--red)] ${
    error ? 'border-[var(--red)]' : 'border-[var(--rule-2)]'
  }`}
/>
```

Fields now have a visible cream tint that distinguishes them from the page background, focus brightens to paper + red border.

### 5.2 — Step indicator with red active state

Whatever the current "Step 01 — 02 — 03" indicator looks like, ensure:
- Active step number renders in red display weight
- Completed step renders in ink with a red checkmark or red rule line
- Future step renders in muted

This makes the multi-step nature of the form feel like progress, not navigation.

---

## STEP 6 — Footer earns a moment

Currently the footer is text-only. For a site this aesthetically considered, the footer is dropping the ball on visual closing. Three additions:

### 6.1 — Big closing slogan in footer

Above the columns, add a full-width slogan moment:

```tsx
<div className="mb-20 border-b border-[var(--rule-2)] pb-20">
  <p className="font-display text-[clamp(48px,8vw,128px)] font-medium leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
    The eye that<br />never misses<span className="text-[var(--red)]">.</span>
  </p>
</div>
```

This is the slogan finally getting *a real moment*, at the bottom of every page, in size.

### 6.2 — Operating status panel

Below the slogan, on the left side of the footer column row, add a live status panel that shows:

```
SYSTEM ON
ALL CORRIDORS NOMINAL
PRETORIA · 14:32 SAST  ← live
3,047 LOADS · 24H      ← live
```

Mono-styled, small, with a green pip pulsing next to "SYSTEM ON". This connects to the brand promise (active monitoring) and gives the footer a unique element no other site in the category has.

### 6.3 — Subtle red horizontal accent

A 1px full-width red line at the very bottom of the footer (below the copyright). Tiny detail, but it's the last visual the user sees on every page — and it's red.

---

## STEP 7 — Type hierarchy gets bolder

Currently `h1`, `h2`, `h3` are all `font-medium` (500 weight). This creates muted hierarchy. Two-step fix:

### 7.1 — Differentiate by weight, not just size

```css
h1, .h1 { font-weight: 500; letter-spacing: -0.05em; }
h2, .h2 { font-weight: 500; letter-spacing: -0.04em; }
h3, .h3 { font-weight: 500; letter-spacing: -0.03em; }
```

Wait — these are already differentiated by tracking (-0.05 vs -0.04 vs -0.03em). Good. The actual fix is:

### 7.2 — Increase contrast between body and headline

Body text is currently `text-[var(--muted)]` (62% black). Headlines are `text-[var(--ink)]` (100% black). The contrast is fine, but the body could go *more muted* (50%) to make the headline pop harder by comparison. Try `text-[var(--dim)]` for body in some sections — particularly intro paragraphs that sit beside large headlines.

---

## STEP 8 — Add micro-detail throughout

Beyond average sites are full of small intentional details that don't shout but accumulate. Some suggestions:

### 8.1 — Cursor-tracking dot on hero
On the homepage hero only, a 4px red dot follows the cursor with smooth lerp interpolation. Quiet, surveillance-coded, not invasive. Disabled on touch devices.

### 8.2 — Hover state on every photograph
Every photograph (act photos, field notes hero images) should have a subtle hover state: 1.02 scale + slight desaturation + red corner registration marks brightening. Tells the user the photos are part of an interactive system.

### 8.3 — Page transition treatment
When navigating between pages, the current page fades out + a thin red horizontal line sweeps across the screen + the new page fades in. ~400ms total. This is a direct surveillance-system metaphor: "scanning new sector." Implementable via Framer Motion `AnimatePresence` in `app/layout.tsx`.

### 8.4 — Section-enter scan line
When a section enters viewport, a 1px red line briefly sweeps across it (like the v2 sketch had). Make this subtle: 600ms duration, opacity peak 0.3, only on first entry.

### 8.5 — Interactive ID tags
The `id-tag` elements on photos (e.g. "TR-057 · ROUTE INTEGRITY") currently render as static text. Make them flicker/scramble briefly when their parent enters viewport (like a terminal connecting). Use the existing `ScrambleText` component (currently underused).

---

## STEP 9 — Specific page-level upgrades

### 9.1 — Homepage hero

Current hero is good but could push further. Two specific additions:

**A. Add a subtle red horizontal sweep behind the headline**
A radar-sweep-like horizontal glow that pulses very slowly across the headline area every 6 seconds. Not animated icons, not "active monitoring" theatre — just an ambient red glow that breathes. Sub-conscious brand presence.

**B. Stat strip below the lede**
Currently the hero has a "stats off to the side" treatment. Move three stats to a horizontal strip directly below the lede, before the buttons:

```
up to 18% / 38s / 3,047
diesel reclaimed / median response / loads under monitoring
```

In paper-on-dark contrast, with red dividers between stats. This gives the hero numerical credibility before the user even starts scrolling.

### 9.2 — Field Notes article page

The article body is currently fine but ends abruptly. Add at the end:

- A red horizontal rule
- "FILED UNDER" with sector tags styled as ink chips
- "WRITTEN BY" with a controller-name byline (anonymised: "TIHLO Field Operations · Mpumalanga")
- A red "§ END" marker mono-styled

This treats every article like an actual published document, not a blog post.

### 9.3 — Contact form receipt state

When a form is submitted, the brief specified a monospace "receipt" confirmation. Ensure this renders with proper visual weight:

```tsx
<div className="border border-[var(--ink)] p-12">
  <div className="font-mono text-sm text-[var(--red)] mb-6">§ TRANSMISSION RECEIVED</div>
  <div className="font-mono text-2xl text-[var(--ink)] mb-4">TICKET: TIH-{ticketId}</div>
  <div className="font-mono text-xs text-[var(--muted)] space-y-1">
    <div>RESPONSE TARGET: 1 BUSINESS DAY</div>
    <div>CONTROLLER: ASSIGNED</div>
    <div>INSTRUMENT: ACTIVE</div>
  </div>
</div>
```

Make it look like a printed receipt or a logged transmission, not a "thanks for your submission!" confirmation.

---

## What NOT to do in this round

- **Do not change the colour palette.** The paper / ink / red system is correct. Don't add new colours, don't shift hues.
- **Do not add new sections or new pages.** Polish what exists.
- **Do not abandon the linework illustrations.** They're a strength.
- **Do not change Geist.** Don't experiment with different fonts.
- **Do not add new motion libraries.** Framer Motion + GSAP is sufficient.
- **Do not add hero videos or ambient backgrounds.** The site stays photographic + diagrammatic.

---

## Build order for this directive

```
DAY 1  STEP 1 (Nav contrast — Option A)
       STEP 5 (Form fields — quick fix)

DAY 2  STEP 2 (Red presence — buttons, big numbers, indices)
       STEP 7 (Type hierarchy — body text contrast)

DAY 3  STEP 3 (Inner page heroes — choose 2-3 to tackle in this round)
       STEP 6 (Footer slogan + status panel)

DAY 4  STEP 4 (Spacing rhythm — apply tier system)
       STEP 9.1 (Homepage hero stat strip)

DAY 5  STEP 8 (Micro-details — add 3-4, not all 5)
       STEP 9.2 + 9.3 (Field notes article + contact receipt)
```

5 days of focused work. After this pass, the site moves from "competent template" to "considered design".

---

## Definition of done for this round

- [ ] Nav has visible contrast on every page
- [ ] Primary buttons render in red, not ink
- [ ] Every page has at least one moment where red appears at scale (≥36px)
- [ ] At least one large red display number per page (homepage, sectors, about, how-we-operate, field-notes)
- [ ] Section heights vary across pages — not all `py-24` uniform
- [ ] Inner pages have distinct hero treatments — at least 3 of the 5 redesigned
- [ ] Form fields have visible fill, not border-only
- [ ] Footer has a slogan moment + live status panel
- [ ] At least 3 micro-details added (cursor dot, photo hover, page transition, scan line, scramble ID)

---

**End of directive.**

Hand this to Claude Code with: *"Read TIHLO-UX-UPGRADE-DIRECTIVE.md. Implement Step 1 first (nav contrast — Option A), test, deploy preview, confirm with client before proceeding to Step 2."*
