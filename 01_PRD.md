# Loop — Website PRD
**Product Requirements Document · v1.0**

---

## 1. Project Snapshot

| | |
|---|---|
| **Client** | Loop — Rooftop Gastropub & Nightclub |
| **Category** | Gastropub / Rooftop Bar & Kitchen / Nightclub |
| **Location** | 8th Floor (Rooftop), Eastern Mall, Pantaloons Dangratoli Chowk, Lalpur, Ranchi, Jharkhand 834001 |
| **Rating** | 4.3★ · 1,355+ Google reviews |
| **Price band** | ₹400–1,600 per person |
| **Hours** | 12 PM – 12 AM daily (till 12 AM Sun–Sat) |
| **Positioning** | One of India's largest rooftop Bar & Kitchen with a pro audio/visual nightclub — 14,000 sq/ft of culinary and mixology experience |

**One-line brief:** Build a single-page, animation-forward website that sells the *vibe* of Loop before a visitor ever steps out the door, and makes reserving a table a 10-second decision.

---

## 2. Why this site exists

Loop is not a normal restaurant — it's a rooftop bar, a full-menu kitchen, and a nightclub with live DJs stacked into one 14,000 sq/ft floor. The current online presence (Google/Zomato listing) sells none of that. The website's job is to do what the listing can't:

- Make the rooftop-at-night visual the hero, not an afterthought
- Separate and sell the three experiences Loop actually offers: **dinner**, **rooftop lounge**, **nightclub**
- Convert browsing into a table reservation or a phone call
- Look like a premium nightlife brand — not a template restaurant site

---

## 3. Target audience

- **Primary:** 22–40 y/o professionals and groups in Ranchi planning a night out, birthday, date night, or celebration
- **Secondary:** Out-of-town visitors / tourists searching "rooftop bar Ranchi" or "nightclub Ranchi"
- **Behavior:** Mobile-first discovery via Instagram and Google → wants vibe confirmation in under 10 seconds → calls or taps directions

---

## 4. Goals & success criteria

**Primary conversion:** Table reservation (call, WhatsApp, or reservation form)
**Secondary conversions:** Directions click, Instagram follow, menu view

**The site succeeds if:**
- It looks and feels like a premium Bangkok/Bombay rooftop club — not a generic "restaurant template"
- It loads fast and animates smoothly on mid-range Android (this audience is mobile-heavy)
- A first-time visitor understands *what Loop is* (dinner + rooftop + nightclub, not just "a restaurant") within one scroll
- Reservation/contact is reachable from every section, not buried in a footer

---

## 5. Sitemap (single-page scroll, sticky anchor nav)

1. Hero
2. Marquee / accolades strip
3. About — The Loop Story
4. The Experience (feature grid)
5. Menu Highlights
6. Gallery
7. Nightlife & Events
8. Reviews / Social proof
9. Reserve a Table (CTA band)
10. Location & Hours
11. Footer

---

## 6. Section-by-section requirements

### 6.1 Hero
- **Content:** Wordmark "LOOP," tagline, one-line positioning statement, primary CTA ("Reserve a Table") + secondary CTA ("View Menu")
- **Visual:** Full-bleed night rooftop scene as backdrop; a 3D centerpiece built from Loop's own infinity (♾️) mark — see Design System §3
- **Functional:** Sticky nav appears after hero scroll-past; scroll-cue indicator; CTA always visible
- **Motion:** Entrance animation on load (staggered text reveal), subtle parallax on scroll and mouse move

### 6.2 Marquee strip
- **Content:** Looping ticker — "14,000 SQ/FT ROOFTOP · MULTI-CUISINE KITCHEN · LIVE MUSIC & DJ · FULL BAR · 4.3★ RATED · NIGHTCLUB · —"
- **Functional:** Infinite horizontal scroll (GSAP), pauses on hover (desktop only)

### 6.3 About — The Loop Story
- **Content:** Positioning paragraph, 3–4 stat callouts (sq/ft, cuisines, seating zones, rating), short brand narrative
- **Motion:** Numbers count up on scroll into view; text reveals line-by-line (GSAP ScrollTrigger)

### 6.4 The Experience (feature grid)
Six cards, each a distinct reason to visit:
1. Rooftop Lounge & Skyline Views
2. Nightclub — Pro Audio/Visual
3. Live Music & DJ Nights
4. Full Bar & Mixology
5. Karaoke & Bar Games
6. Insta-Worthy Spots

- **Functional:** Each card = icon badge (lucide-react, per design system §2 — never emoji) + title + one-line description
- **Layout:** Bento grid, not a uniform equal-size 3×2 — Rooftop Lounge and Nightclub get larger tiles as the two headline draws (see design system §6)
- **Motion:** 3D tilt-on-hover (desktop), staggered scroll-reveal, glass-morphism surface with accent glow on hover

### 6.5 Menu Highlights
- **Content:** Curated highlight dishes (not a full menu): Non-Veg Platter, Paneer Tikka Masala, Chicken Kebabs, + cuisine chips (American, Asian, Chinese, Indian, Thai). Price band shown once, not per-dish (Loop doesn't expose per-item pricing publicly).
- **Functional:** "View Full Menu" CTA → PDF or menu page (Phase 2 if no menu asset yet)
- **Motion:** Horizontal drag/scroll gallery of dish cards, image tilt-on-hover

### 6.6 Gallery
- **Content:** Mixed photo/video grid — food, vibe/ambience, mixology, crowd/nightlife shots
- **Functional:** True masonry (varied tile sizes — 16:9, 4:5, square mixed), lightbox on click, video autoplay muted on hover/inview
- **Until real photography lands:** every unfilled tile uses the placeholder media spec (grain + accent glow + small corner label) from design system §5 — never a text-label-and-icon card pretending to be a photo
- **Motion:** Masonry reveal on scroll, subtle parallax depth between rows

### 6.7 Nightlife & Events
- **Content:** Recurring nights (Live Music, DJ Nights) + a themed-event card pattern (e.g., masquerade/theme nights) so the client can swap events without a rebuild
- **Functional:** Event cards with date/time, "RSVP" or "Details" CTA
- **Motion:** Card stack or carousel, scroll-pinned section (GSAP ScrollTrigger pin)

### 6.8 Reviews / Social proof
- **Content:** 4.3★ / 1,355 reviews headline stat, 3–5 short paraphrased guest quotes, attribution (first name + "Local Guide" where applicable)
- **Functional:** Auto-scrolling or swipeable review cards
- **Motion:** Fade/slide-in per card, rating counter animates up to 4.3

### 6.9 Reserve a Table (CTA band)
- **Content:** Short, direct copy + phone number (tap-to-call) + WhatsApp link + optional reservation form (name, date, time, party size, phone)
- **Functional:** This block should be reachable via sticky nav CTA at all times, not just here
- **Motion:** High-contrast band, subtle glow/pulse on the primary button

### 6.10 Location & Hours
- **Content:** Full address, embedded map, hours (12 PM–12 AM), "Directions" button, phone number
- **Functional:** Embedded Google Map (or static map image + "Open in Maps" link to keep the site lightweight)

### 6.11 Footer
- **Content:** Logo mark, quick nav, social links (Instagram @loopranchi), contact, hours, address, copyright
- **Functional:** Repeats primary CTA

---

## 7. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Scroll-triggered animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| 3D | React Three Fiber + drei |
| Micro-interactions / page transitions | Framer Motion |
| Fonts | Fraunces (display) + General Sans (UI/body) via next/font |
| Deployment | Vercel |

See `04_BUILD_PROMPT.md` for the full technical build spec and `02_DESIGN_SYSTEM.md` for visual direction.

---

## 8. Non-functional requirements

- **Performance:** Lighthouse mobile score 85+; hero interactive < 3s on 4G; lazy-load below-the-fold media
- **Responsive:** Mobile-first (this audience is mobile-heavy); 3D/tilt effects degrade gracefully or simplify on mobile
- **Accessibility:** Respect `prefers-reduced-motion`; alt text on all imagery; AA contrast on text over dark backgrounds despite the moody palette
- **SEO:** `Restaurant` schema.org markup, OpenGraph tags for social sharing (Instagram link previews matter here), title/meta targeting "rooftop bar Ranchi," "gastropub Ranchi," "nightclub Ranchi"
- **Analytics:** Track CTA clicks (reserve, call, directions, Instagram) as conversion events

---

## 9. Definition of done (v2 — added after first-build review)

The first build shipped with emoji used as icons, headlines clipping behind the sticky nav, and gallery/placeholder cards faking photos with text and icons instead of an intentional empty state. None of that ships again. Before any build is considered complete:

- [ ] Zero emoji anywhere on the page, including empty/placeholder states
- [ ] No headline clips or renders behind the sticky nav, checked at 1280×720 and 375×812
- [ ] Every card on the site shares one surface treatment (`<LoopCard>` per design system §4)
- [ ] Every icon comes from the lucide-react mapping table in design system §2 — none improvised
- [ ] No section is a flat uniform grid of identical boxes — Experience is bento, Gallery is masonry, About is asymmetric
- [ ] Every unfilled media slot uses the grain/glow/corner-label placeholder spec — none show a fake "photo" made of text and an icon
- [ ] `prefers-reduced-motion` respected site-wide
- [ ] `--accent-violet` appears only in Nightlife/Events and isolated hover-glow moments

Full technical detail for each of these lives in `02_DESIGN_SYSTEM.md` and `04_BUILD_PROMPT.md`.

## 10. Out of scope (Phase 1)

- Online ordering / payment
- Full CMS or admin dashboard (Phase 2 — event cards and menu highlights are hardcoded but structured for easy swap)
- Hindi-language version
- Blog / press section

---

## 11. Assets needed from client

- High-res rooftop/night photography (hero needs at least one strong wide shot)
- Logo files (vector, for the infinity/loop mark treatment)
- Confirmed phone number for reservations (multiple numbers appear across listings — confirm the primary one)
- Menu PDF or dish photography, if "View Full Menu" is in scope for launch
