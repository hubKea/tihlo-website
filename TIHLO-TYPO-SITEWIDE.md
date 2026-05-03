# TIHLO — Site-Wide Typography Emphasis

**The pattern:** In every long-form descriptive paragraph, the **stance word** (the word that carries the firm's posture) renders in red, and the **claim phrase** (the words that carry the operational claim) render in bold ink. The rest stays muted.

**The discipline:** Maximum **one red word or short phrase per paragraph**. Never two red words on the same line. The pattern is a precision instrument, not a decoration. If a paragraph has nothing earning red, it stays muted entirely.

This directive lists every paragraph that gets the treatment, with the exact word(s) chosen and why.

---

## Pre-flight: review the picks before applying

Read through the ten paragraphs below. If any of my picks for the red word or bold phrase don't match how you want the firm to read, push back and I'll revise.

| # | Page / Section | Bold ink (claim) | Red (stance) |
|---|---|---|---|
| 1 | Hero lede | "fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions" | "before they become accepted cost" |
| 2 | WhatWeMonitor lede | "Mines, factories, depots, and municipal fleets all share the same five pressure points" | "independent record" |
| 3 | HowItWorks lede | "A six-stage methodology runs underneath" | "named, signed record" |
| 4 | WhyTihlo lede | "Each one is the precondition for evidence" | "non-negotiable" |
| 5 | ByTheNumbers lede | "Each figure carries the conditions under which it was observed" | "the numbers can be challenged" |
| 6 | FinalCTA body | "We hear your current process, identify the highest-risk control gaps" | "whether TIHLO is the right partner" |
| 7 | About lede | "An independent specialist firm operating active monitoring and verification" | "Loud about what we will not tolerate" |
| 8 | About firm[0] | "We have no commercial relationship with any system we monitor" | "by design, not by description" |
| 9 | About firm[1] | "Commodity loss lives in that gap" | "every record signed by a named controller" |
| 10 | HowWeOperate lede | "TIHLO operates a six-stage methodology across every commodity movement we monitor" | "by day as by night" |

If these picks land for you, the prompt below applies them. If you want to swap, replace, or remove any pick, tell me which row and what change.

---

## Implementation strategy

Rather than hardcoding emphasis spans into every consuming component (brittle, hard to refactor), introduce **structured copy** in `lib/constants.ts`. Each paragraph that gets emphasis becomes an array of segments tagged with their role. A small `<Lede />` component renders the array.

This keeps the copy as the source of truth, makes the pattern reviewable in one file, and means future copy edits don't require finding emphasis spans in random JSX.

---

## Prompt for Claude Code

```
Site-wide typography emphasis pattern. In every long-form descriptive paragraph, mark one short stance phrase in red and one claim phrase in bold ink. The rest stays muted.

STEP 1 — Create the Lede component.

Create components/ui/Lede.tsx:

import type { ReactNode } from 'react';

export type LedeSegment =
  | string
  | { kind: 'claim'; text: string }
  | { kind: 'stance'; text: string };

interface LedeProps {
  segments: LedeSegment[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: 'text-[14px] leading-[1.62]',
  md: 'text-[15px] leading-[1.65]',
  lg: 'text-[17px] leading-[1.65]',
};

export default function Lede({ segments, className = '', size = 'md' }: LedeProps) {
  return (
    <p className={`${SIZES[size]} text-[var(--muted)] ${className}`}>
      {segments.map((seg, i) => {
        if (typeof seg === 'string') {
          return <span key={i}>{seg}</span>;
        }
        if (seg.kind === 'claim') {
          return (
            <span key={i} className="font-medium text-[var(--ink)]">
              {seg.text}
            </span>
          );
        }
        if (seg.kind === 'stance') {
          return (
            <span key={i} className="text-[var(--red)]">
              {seg.text}
            </span>
          );
        }
        return null;
      })}
    </p>
  );
}

STEP 2 — Restructure copy in lib/constants.ts.

For each paragraph listed below, replace the plain `lede:` string with a `ledeSegments:` array. Keep the original `lede:` string unchanged for fallback consumers, and add the new `ledeSegments` field alongside it. (This way nothing breaks if a component hasn't been migrated yet.)

For example, replace:

  lede: 'TIHLO helps operations detect fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions before they become accepted cost.',

With:

  lede: 'TIHLO helps operations detect fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions before they become accepted cost.',
  ledeSegments: [
    'TIHLO helps operations detect ',
    { kind: 'claim', text: 'fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions' },
    ' ',
    { kind: 'stance', text: 'before they become accepted cost' },
    '.',
  ],

Apply this pattern to all ten paragraphs:

A) HERO.lede:
   ledeSegments: [
     'TIHLO helps operations detect ',
     { kind: 'claim', text: 'fuel loss, asset misuse, commodity leakage, contractor risk and movement exceptions' },
     ' ',
     { kind: 'stance', text: 'before they become accepted cost' },
     '.',
   ]

B) WHAT_WE_MONITOR.lede:
   ledeSegments: [
     'TIHLO is sector-agnostic. ',
     { kind: 'claim', text: 'Mines, factories, depots, and municipal fleets all share the same five pressure points' },
     ' — and the same need for an ',
     { kind: 'stance', text: 'independent record' },
     ' of what happened.',
   ]

C) HOW_IT_WORKS.lede:
   ledeSegments: [
     'Every engagement runs the same compact pattern. ',
     { kind: 'claim', text: 'A six-stage methodology runs underneath' },
     ', but at the operational level there are three movements — each ending in a ',
     { kind: 'stance', text: 'named, signed record' },
     '.',
   ]

D) WHY_TIHLO.lede:
   ledeSegments: [
     'These are ',
     { kind: 'stance', text: 'non-negotiable' },
     '. ',
     { kind: 'claim', text: 'Each one is the precondition for evidence' },
     ' that survives an audit, an insurance claim, or a forensic counsel review.',
   ]

E) BY_THE_NUMBERS.lede:
   ledeSegments: [
     { kind: 'claim', text: 'Each figure carries the conditions under which it was observed' },
     '. We publish the caveats so ',
     { kind: 'stance', text: 'the numbers can be challenged' },
     '.',
   ]

F) FINAL_CTA.body:
   bodySegments: [
     'Engagements begin with a 30-minute briefing. ',
     { kind: 'claim', text: 'We hear your current process, identify the highest-risk control gaps' },
     ', and tell you ',
     { kind: 'stance', text: 'whether TIHLO is the right partner' },
     ' for your operation.',
   ]

G) ABOUT.lede:
   ledeSegments: [
     { kind: 'claim', text: 'An independent specialist firm operating active monitoring and verification' },
     ' for mining commodity movement across South Africa. We are quiet about who we work with. ',
     { kind: 'stance', text: 'Loud about what we will not tolerate' },
     ' on a corridor.',
   ]

H) ABOUT.firm[0]:
   firmSegments: [
     [  // first paragraph
       'TIHLO is independent — ',
       { kind: 'stance', text: 'by design, not by description' },
       '. We are not a subsidiary of a logistics provider, a reseller of telematics hardware, or a spin-off of a fleet management platform. ',
       { kind: 'claim', text: 'We have no commercial relationship with any system we monitor' },
       '. That is the precondition for the work.',
     ],
     [  // second paragraph
       'The firm was built to close a single gap: the distance between what fleet systems report and what is actually happening on the ground. ',
       { kind: 'claim', text: 'Commodity loss lives in that gap' },
       '. So does dispute, so does insurance exposure, so does counsel risk. We close it — ',
       { kind: 'stance', text: 'every record signed by a named controller' },
       '.',
     ],
   ]

I) HOW_WE_OPERATE.lede:
   ledeSegments: [
     { kind: 'claim', text: 'TIHLO operates a six-stage methodology across every commodity movement we monitor' },
     '. The same procedure runs in Mpumalanga as in Limpopo, on yellow plant as on transport, ',
     { kind: 'stance', text: 'by day as by night' },
     '. This is what each stage does, and how the evidence accrues.',
   ]

(Note for paragraph F (FinalCTA): the field name is `body`, not `lede`, so the new field is `bodySegments`.)
(Note for paragraph H (About firm): the existing `firm` field is an array of two strings, so the new field `firmSegments` is an array of two segment-arrays.)

STEP 3 — Migrate consumer components to use the Lede component.

For each section, find where the lede paragraph is rendered and replace the <p> element with <Lede segments={...}>. The component's wrapper <p> already has the muted styling; no need for additional className unless you want to override sizing.

Migration list — exact files and changes:

a) Hero — components/sections/Hero.tsx
   Find: <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-[var(--muted)]">
           {HERO.lede}
         </p>
   Replace with:
         <Lede
           segments={HERO.ledeSegments}
           size="lg"
           className="mt-7 max-w-[54ch]"
         />
   Add at top: import Lede from '@/components/ui/Lede';

b) WhatWeMonitor — components/sections/WhatWeMonitor.tsx
   Find: <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.66] text-[var(--muted)]">
           {WHAT_WE_MONITOR.lede}
         </p>
   Replace with:
         <Lede
           segments={WHAT_WE_MONITOR.ledeSegments}
           className="mt-5 max-w-[58ch]"
         />

c) HowItWorks — components/sections/HowItWorks.tsx
   Find the lede paragraph rendering HOW_IT_WORKS.lede and replace with <Lede segments={HOW_IT_WORKS.ledeSegments} ... />

d) WhyTihlo — components/sections/WhyTihlo.tsx
   Same pattern: replace WHY_TIHLO.lede paragraph with <Lede segments={WHY_TIHLO.ledeSegments} ... />

e) ByTheNumbers — components/sections/ByTheNumbers.tsx
   Same pattern with BY_THE_NUMBERS.ledeSegments

f) FinalCTA — components/sections/FinalCTA.tsx
   The body paragraph here renders on a RED background, so the Lede component's default colours won't work. Override with className or use this rendering directly:

   Find the <p> rendering FINAL_CTA.body. Replace with:
   <p className="mx-auto mt-8 max-w-[48ch] text-[17px] leading-[1.65] text-white/75">
     {FINAL_CTA.bodySegments.map((seg, i) => {
       if (typeof seg === 'string') return <span key={i}>{seg}</span>;
       if (seg.kind === 'claim') return <span key={i} className="font-medium text-white">{seg.text}</span>;
       if (seg.kind === 'stance') return <span key={i} className="text-white font-medium underline decoration-white/40 underline-offset-4">{seg.text}</span>;
       return null;
     })}
   </p>

   On the red FinalCTA background, "claim" becomes white at full weight, and "stance" gets a subtle underline (red on red would be invisible). The pattern translates without breaking the discipline.

g) About lede — app/(marketing)/about/page.tsx
   Find the rendering of ABOUT.lede in the hero section and replace with <Lede segments={ABOUT.ledeSegments} size="lg" ... />

h) About firm paragraphs — app/(marketing)/about/page.tsx
   Find where ABOUT.firm.map renders the two strings as <p> elements. Replace the .map with iteration over ABOUT.firmSegments, each yielding a <Lede> with its own segments.

i) HowWeOperate lede — app/(marketing)/how-we-operate/page.tsx
   Replace the rendering of HOW_WE_OPERATE.lede with <Lede segments={HOW_WE_OPERATE.ledeSegments} ... />

STEP 4 — Verification.

After all edits:

1. Open / and verify the homepage hero, WhatWeMonitor, HowItWorks, WhyTihlo, ByTheNumbers, and FinalCTA each show ONE red stance phrase and ONE bold claim phrase per descriptive paragraph.

2. Open /about and verify the hero lede + the two firm paragraphs each show the pattern correctly.

3. Open /how-we-operate and verify the hero lede shows the pattern.

4. Verify NO paragraph has more than one red phrase. If any paragraph reads with two red moments, that's a bug — only one stance word per paragraph is allowed.

5. Run: grep -c "kind: 'stance'" lib/constants.ts
   Result should be 11 (one per paragraph, plus one extra for paragraph H which has two paragraphs).
   If higher, audit and remove the extra.

6. Run: npx tsc --noEmit --skipLibCheck

7. Visually scan every page for any descriptive paragraph that did NOT get the treatment but probably should. Flag those for a follow-up pass — don't add ad-hoc emphasis.
```

---

## What this is NOT doing

- NOT applying emphasis to short copy (eyebrows, captions, ID labels, button text — those stay as-is)
- NOT applying emphasis to UI-state copy (form labels, error messages, status indicators)
- NOT applying emphasis to lists or bullet items
- NOT applying emphasis to inner content paragraphs that are operational detail (e.g., the body paragraphs inside service detail blocks, sector detail blocks, methodology stage blocks). These are scoped detail, not stance — they stay muted.
- NOT applying emphasis to the Field Notes article body (that's editorial writing with its own voice)

The pattern is **reserved for the firm's stance copy** — the ledes, the closing CTA, and the about firm paragraphs. Roughly 10 paragraphs site-wide. That's the right scope.

---

## Why this is defensible discipline

After this lands, the count of red references on the site goes up by ~10 — from ~50 to ~60. But every new red reference is doing **specific semantic work**: marking the firm's stance in a paragraph that's making an argument. The reader's eye learns the pattern within the first three paragraphs they read, and from then on, when they see a red word, they know it's the position the firm is taking.

That's the most disciplined possible use of red across a long-form site. It's how serious editorial publications use coloured emphasis. It earns the colour rather than spending it.

---

**End of directive.**

Run after applying: `npx tsc --noEmit --skipLibCheck`

Commit message: `feat: site-wide typography emphasis pattern — claim phrases bold ink, stance words red`
