# Loop — Design System v2
**Rewritten after reviewing the first build. This version exists specifically to close the gaps that made v1 look unfinished — every rule below is a direct response to something visible in the v1 screenshots.**

---

## 0. What was wrong with v1, and the rule that fixes it

| Problem seen in the build | Root cause | Fix, enforced below |
|---|---|---|
| Feature/gallery cards used emoji (🏙️🎵🍸) as icons | No icon system was specified, so the agent grabbed the laziest option | Mandatory icon library, §2 |
| Headlines rendered clipped/overlapping under the sticky nav | No `scroll-margin-top` or guaranteed section top-padding | Layout safety rules, §3 |
| Gallery showed text-label-on-gradient boxes pretending to be photos | No spec for what an "empty" media slot should look like before real photography lands | Placeholder media spec, §5 |
| Experience / Gallery / Nightlife cards all had different paddings, radii, borders | No single shared card component was mandated | One `<LoopCard>` component, §4 |
| Everything reads as same-size gray boxes in a row | No asymmetry, no glow placement, no texture | Atmosphere & layout rhythm, §6 |

---

## 1. Color system (unchanged — this part worked)

| Token | Hex | Use |
|---|---|---|
| `--bg-void` | `#0B0B0D` | Primary background |
| `--bg-surface` | `#17161A` | Cards, panels |
| `--bg-surface-2` | `#201F24` | Hover/active surface |
| `--accent-copper` | `#D89B4A` | Primary accent — food/warmth/CTAs |
| `--accent-violet` | `#9B5DE5` | Nightlife-only accent |
| `--text-primary` | `#F5F1EA` | Headlines, primary text |
| `--text-muted` | `#9A969E` | Secondary text |
| `--border-hairline` | `#2A292E` | Dividers, card outlines |

Copper = restaurant. Violet = nightclub. Keep that split.

---

## 2. Iconography — hard rule

**No emoji, anywhere, ever — not as icons, not as bullet decoration, not as placeholder content.** This was the single biggest thing making v1 look like a prototype instead of a brand.

- **Library:** `lucide-react` (MIT-licensed, tree-shakeable — install it, don't hand-roll SVGs unless a specific brand moment calls for it)
- **Treatment:** every icon sits inside a fixed-size badge — 44×44px, `--bg-surface-2` fill, 1px `--border-hairline`, icon centered at 20px, stroke width 1.5, colored `--accent-copper` (or `--accent-violet` in the Nightlife section only)
- **Exact icon mapping**, so nothing is left ambiguous:

| Card | Icon (lucide-react) |
|---|---|
| Rooftop Lounge | `Building2` |
| Nightclub, Pro Audio/Visual | `Speaker` |
| Live Music & DJ Nights | `Music` |
| Full Bar & Mixology | `Martini` |
| Karaoke & Bar Games | `Mic2` |
| Insta-Worthy Corners | `Camera` |
| Address | `MapPin` |
| Hours | `Clock` |
| Phone | `Phone` |
| Directions | `Navigation` |

No other icons appear anywhere on the site outside this table without a specific reason.

---

## 3. Layout safety rules — hard rule

The v1 headline-clipping bug happens when large display type sits closer to the viewport/nav than its own line-height needs. Fix with hard constraints, not "make it look nice":

- Define `--nav-height: 80px` as a CSS variable (72px on mobile).
- **Every anchor-targeted section** gets `scroll-margin-top: var(--nav-height)` — no exceptions.
- **Every section** gets a minimum `padding-top: calc(var(--nav-height) + 64px)` on desktop, `calc(var(--nav-height) + 32px)` on mobile.
- Display headline sizing uses `clamp()` with an explicit upper bound tied to viewport height, not just width — e.g. `clamp(2.5rem, 6vw, 6rem)` and additionally capped so a 2-line headline never exceeds ~50vh. Test every headline at 1280×720 (small laptop) — this is where clipping actually happened.
- Line-height on display type: `0.95–1.05` for short headlines, `1.05–1.15` for multi-line — never default browser line-height on Fraunces at display sizes.
- Sticky nav has a solid `--bg-void` background with a subtle bottom hairline once scrolled — never transparent-over-text after the hero.

**Acceptance check:** scroll to every anchor section at 1280×720 and at 375×812 (iPhone-size). If any headline touches, hides behind, or clips against the nav, it fails review — full stop.

---

## 4. Unified card system — hard rule

One component, `<LoopCard>`, used everywhere a card appears (Experience grid, Menu highlights, Gallery, Nightlife/Events, Reviews). Variants are allowed (size, aspect ratio) but the *treatment* never changes:

- Background: `rgba(23,22,26,0.6)`, `backdrop-filter: blur(16px)`
- Border: 1px `--border-hairline`, with a subtle top-edge highlight (`inset 0 1px 0 rgba(255,255,255,0.04)`)
- Corner radius: `16px` — same value everywhere on the site, no mixing 8px/12px/16px across sections
- Padding: `28px` desktop / `20px` mobile
- Hover: border shifts to accent color at 40% opacity + subtle `translateY(-4px)` — same hover physics everywhere, don't reinvent per-section

If a section needs a visually different card (e.g., Reviews cards shorter/wider than Experience cards), change the **dimensions**, never the **surface treatment**.

---

## 5. Placeholder media spec — hard rule

Real photography isn't ready yet. v1's answer was a gradient box with an emoji and a caption pretending to be a photo — that reads as broken, not "in progress." Use this instead for every unfilled media slot:

- Layered background: a radial gradient glow in the section's accent color (copper or violet) at low opacity (`8–14%`), positioned off-center, over `--bg-surface`
- A fine grain/noise texture overlay (SVG turbulence filter or repeating noise PNG at ~4% opacity) across the whole slot — this alone reads as "designed," not "empty"
- A small mono-font label in the **corner**, not centered — e.g. `IMG — ROOFTOP, NIGHT` in `--text-muted`, `11px`, uppercase, wide tracking. This is a production note, not a headline; it should be easy to miss on purpose.
- **No emoji, no icon, no centered caption pretending to be content.** The slot should look like a moody, empty dark surface with a whisper of a label — not a card faking a photograph.
- Once real photography drops in, this whole layer is simply replaced by an `<Image>` — the grain/label layer never appears alongside a real photo.

---

## 6. Atmosphere & layout rhythm

v1 was too uniform — every section was a same-size grid of same-size boxes. Fix with asymmetry and depth:

- **Experience section:** not a flat 3×2 equal grid. Use a bento layout — one or two cards larger (Nightclub and Rooftop Lounge, the two headline draws) with the remaining four smaller, in a mixed grid (`grid-template-areas`, not uniform `repeat()`).
- **Gallery:** true masonry with varied tile heights, not a uniform grid — mix a few wide tiles (16:9) with tall ones (4:5) and square ones.
- **About section:** asymmetric split, ~60/40 — narrative text on one side, stat block on the other, not stacked centered text.
- **Section backgrounds:** every section gets one soft radial glow positioned at a screen edge (top-right or bottom-left, alternating section to section) — copper in food/about/menu sections, violet only in Nightlife/Events. This is what creates depth against pure `--bg-void` instead of flat black.
- **Global grain:** a very subtle (2–3% opacity) noise texture over the entire page, fixed position, blend-mode overlay — this single layer does more to kill the "flat AI-generated" look than almost anything else.
- **Dividers between sections:** a 1px hairline with a soft gradient fade at both ends, never a hard-edged full-width line.

---

## 7. Typography (unchanged, still correct)

- Display: **Fraunces** (variable) — see §3 for sizing safety rules
- Body/UI: **General Sans**
- Labels/stats: **Space Mono** or **JetBrains Mono**, uppercase, wide tracking

---

## 8. Motion principles (unchanged, still correct)

1. Smooth scroll via Lenis, synced to GSAP ScrollTrigger's ticker
2. Scroll-triggered reveals, not autoplay-on-load
3. Stagger entrances 60–120ms apart, never simultaneous
4. 3D/tilt reserved for the hero centerpiece + feature-grid hover — not applied everywhere
5. Respect `prefers-reduced-motion` — fades only, no parallax/3D, as a baseline, not an afterthought
6. Stat numbers count up on scroll-into-view (4.3★, 1,355 reviews, 14,000 sq/ft)
