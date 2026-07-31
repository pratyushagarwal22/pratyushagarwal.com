# pratyushagarwal.com v1 — Implementation Plan

> **For agentic workers:** Implement task-by-task against `docs/design.md`. Do not expand scope. User commits themselves — leave the repo in a working, buildable state at the end of each task; do not run `git commit` unless asked.

**Goal:** Ship a static single-page Next.js site that shows Pratyush Agarwal becoming a software engineer in public, with a changelog-style shipping log as the signature.

**Architecture:** Next.js App Router + TypeScript + Tailwind. All content in typed `data/*.ts` files. Client components only where expand/filter/show-more state is needed. No backend, no CMS, no client data fetching.

**Tech stack:** Next.js 14+ App Router, TypeScript, Tailwind CSS, React state + CSS transitions, `next/font`, `next/image`, Vercel.

**Spec:** `docs/design.md` (approved). If this plan and the design disagree, **design.md wins** — update the plan, don’t freestyle.

## Global constraints

- Accent: ink blue `#1E4E8C` / hover `#163A6B` only. Terminal green reserved for future dark theme — do not use in v1.
- Mono (IBM Plex Mono) only on log dates, decorative markers, and chips.
- Display: Newsreader. Body: Source Sans 3.
- No Framer Motion. No dark mode. No analytics. No GitHub API.
- Fully static; images via `next/image`. Nothing heavier without a design.md change.
- Mobile single-column ships in v1 (desktop-first polish OK).
- Pseudo-hash markers are decorative only (muted, no copy affordance).

## File map (target)

```
app/layout.tsx
app/page.tsx
app/globals.css
app/favicon.ico (or icon.svg)
components/…          # as in design.md §7
data/…                # as in design.md §8
public/profile.png
public/pratyush-agarwal-resume.pdf
public/og.png
```

## Needs from you (content / assets)

| Item | When | Notes |
|------|------|-------|
| Exact hero one-liner + About paragraph | Task 4 | Or approve drafted copy in that PR/session |
| Shipping log entries (≥5, preferably 6–10) | Task 4 | Dates, titles, summaries, expand bodies |
| Project blurbs + problem/approach/outcome + GitHub/demo URLs | Task 4 | Especially Mnemo, TickerSense |
| Experience bullets (engineering-forward) | Task 4 | Three roles from design.md |
| Writing list (title, venue, date, URL, topics) | Task 4 / 11 | Real post links only when published; else empty array → Task 11 profile fallback |
| Publications list (title, venue, date, summary, href; optional abstract) | Task 4 | Authored in Task 4; UI wired in Task 10 |
| Profile photo + resume | Task 3 | Already in `assets/` — copy into `public/` |
| OG card approval | Task 13 | Name + one-liner on static `og.png`; confirm wording |
| Favicon preference | Task 13 | Optional — default simple “PA” or mark if you don’t provide one |
| Vercel + DNS | Task 16 | You own domain `pratyushagarwal.com` |

---

### Task 1: Scaffold + fonts + design tokens

**Goal:** Next.js App Router project boots with TypeScript, Tailwind, fonts, and CSS variables from design.md. Empty page shows correct background and type samples.

**Files:**
- Create: Next.js app scaffold (`package.json`, `tsconfig.json`, `next.config.ts`/`js`, `tailwind.config.ts`, `postcss.config.*`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`)
- Modify: README only if needed for `npm run dev` / `npm run build`

**Needs from you:** None.

**Steps:**
- [ ] Scaffold Next.js 14+ (App Router, TS, Tailwind, `src/` **not** required — keep `app/` at repo root alongside existing `docs/` and `assets/`)
- [ ] Wire `next/font` for Newsreader, Source Sans 3, IBM Plex Mono; expose CSS variables
- [ ] Define color tokens in `globals.css` / Tailwind theme extension per design.md palette
- [ ] Temporary `page.tsx`: heading (display), body paragraph, mono sample chip — prove fonts

**Verify:**
```bash
npm install
npm run dev
```
Browser `http://localhost:3000`: off-white `#FAFAF9` background; display serif heading; sans body; mono chip sample. Accent `#1E4E8C` visible on a sample link/button.
```bash
npm run build
```
Expected: build succeeds with no type errors.

**Done when:** Dev server + production build both succeed; tokens/fonts match design.

---

### Task 2: Shell layout — header, main, footer

**Goal:** Sticky nav + footer chrome with anchors and resume CTA; page sections are empty placeholders with correct `id`s.

**Files:**
- Create: `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/SectionHeading.tsx`, `components/ExternalLink.tsx`
- Modify: `app/layout.tsx` (skip link), `app/page.tsx` (compose shell + placeholder sections)
- Optional stub: `data/site.ts` with name + socials + resume path (full content in Task 4 is OK; minimal stub here is fine)

**Needs from you:** None (use links from design.md).

**Steps:**
- [ ] Skip-to-content link targeting `#main`
- [ ] Sticky header: name → top; anchors Now, Projects, Publications, Experience, Writing, About; Resume accent control
- [ ] Footer: email, socials, copyright year
- [ ] `main` with placeholder `<section id="now|projects|publications|experience|writing|about">` and `SectionHeading`s
- [ ] Resume href points at `/pratyush-agarwal-resume.pdf` (file may 404 until Task 3 — acceptable; link present)

**Verify:**
```bash
npm run dev
```
Browser: sticky nav; click **Projects** → scrolls to `#projects`; footer socials visible; no horizontal overflow at ~1280px.
```bash
npm run build
```
Expected: success.

**Done when:** Shell navigates and builds; placeholders only below the fold.

---

### Task 3: Public assets (photo, resume)

**Goal:** Static assets available under `public/` for later About + resume CTAs.

**Files:**
- Create: `public/profile.png` (from `assets/IMG_0100.png`), `public/pratyush-agarwal-resume.pdf` (from `assets/…`)
- Keep: `assets/` as source originals

**Needs from you:** Confirm `assets/IMG_0100.png` and `assets/pratyush-agarwal-resume.pdf` are the finals to ship (already present).

**Steps:**
- [ ] Copy/optimize profile into `public/profile.png` (reasonable web size; `next/image` will handle display)
- [ ] Copy resume PDF to `public/pratyush-agarwal-resume.pdf`
- [ ] Hit both URLs in browser to confirm 200

**Verify:**
```bash
npm run dev
```
Open `http://localhost:3000/pratyush-agarwal-resume.pdf` → PDF loads.  
Open `http://localhost:3000/profile.png` → image loads.
```bash
npm run build
```
Expected: success; assets in output.

**Done when:** Resume + profile URLs work locally.

---

### Task 4: Typed data files with real content

**Goal:** All `data/*.ts` modules exist, typecheck, and hold real v1 content (no UI wiring required beyond optional compile check).

**Files:**
- Create: `data/site.ts`, `data/log.ts`, `data/stats.ts`, `data/skills.ts`, `data/projects.ts`, `data/publications.ts`, `data/experience.ts`, `data/writing.ts`
- Types exactly as design.md §8 (`source: 'manual' | 'github'` on log; v1 entries all `manual`)

**Needs from you:** **Required** — real copy and URLs (or explicit approval of agent-drafted copy in-session). Especially: one-liner, about, ≥5 log entries, 7 projects, 3 publications, 7 experiences, writing links, project GitHub/demo URLs.

**Steps:**
- [ ] Implement types + exports per design.md
- [ ] Stats: five metrics from design.md §6.3
- [ ] Projects: Mnemo `featured: true`, highest priority; include tech/tags for filters
- [ ] Publications: newest first; title, venue, date, summary, href; optional abstract arrays (content for Task 10 UI)
- [ ] Log: newest first; decorative `marker` strings (short hex-like); ≥5 entries
- [ ] `skills.ts`: vocabulary only (no UI section)
- [ ] Ensure `npx tsc --noEmit` / `npm run build` passes with data alone imported from a temporary import in `page.tsx` **or** leave unimported until Task 5 — prefer importing `site` into header/footer now to replace stubs

**Verify:**
```bash
npm run build
```
Expected: success. Spot-check files: Mnemo present; three publications; three experience roles; five stats; log length ≥5.

**Done when:** Data is complete and typed; build green. Content gaps blocked on you are listed in the PR/session notes — do not invent fake GitHub URLs.

---

### Task 5: Hero

**Goal:** First viewport answers who / pivot / Mnemo / CTAs without scrolling past hero.

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`, consume `data/site.ts`

**Needs from you:** Final one-liner if not locked in Task 4.

**Steps:**
- [ ] Name (display), one-liner, “Currently building Mnemo” → `#projects` (or Mnemo anchor id)
- [ ] CTA order: View resume → See what I’m building (`#now`) → Email
- [ ] Secondary muted social links
- [ ] No photo, no stats, no cards in hero

**Verify:**
```bash
npm run dev
```
Browser (desktop): hero shows name + one-liner + three CTAs in order; resume opens PDF; “See what I’m building” scrolls to `#now`; email opens mailto. No profile image in hero.
```bash
npm run build
```

**Done when:** Skim-layer hero matches design §6.1.

---

### Task 6: Shipping log + v2 GitHub slot

**Goal:** Signature changelog feed with expand, show more/less (5 default), decorative markers, and reserved GitHub placeholder.

**Files:**
- Create: `components/ShippingLog.tsx`, `components/GitHubSlot.tsx`, `components/LogEntry.tsx`, `components/Chip.tsx`, `components/ShowMoreButton.tsx` (Chip/ShowMore reusable later)
- Modify: `app/page.tsx`
- Read: `data/log.ts`

**Needs from you:** None beyond Task 4 content.

**Steps:**
- [ ] `GitHubSlot`: fixed min-height; muted “GitHub activity — coming soon” (or empty shell per design); no fetch
- [ ] `LogEntry`: date + marker (mono, muted, **not** selectable/copy-as-SHA) + type chip + title + summary; button expands body; `aria-expanded`
- [ ] Timeline rule + accent markers
- [ ] Show more/less after 5 entries
- [ ] Client state only; CSS transitions; respect reduced-motion later in Task 14 (basic transition OK now)

**Verify:**
```bash
npm run dev
```
Browser: `#now` shows placeholder slot + ≥5 entries; click entry → body expands; keyboard Enter/Space on header works; Show more reveals rest; markers look muted decorative (not like copyable SHAs).
```bash
npm run build
```

**Done when:** Log is the visual signature and matches design §6.2.

---

### Task 7: Stats strip

**Goal:** Five skim-visible metrics between log and projects.

**Files:**
- Create: `components/StatsStrip.tsx`
- Modify: `app/page.tsx`
- Read: `data/stats.ts`

**Needs from you:** None.

**Steps:**
- [ ] Hairline top/bottom; responsive grid (2-col mobile, up to 5-col desktop)
- [ ] Large value + label; no cards, no expand

**Verify:**
```bash
npm run dev
```
Browser: all five stats readable without click; wraps cleanly at ~375px width (DevTools).
```bash
npm run build
```

**Done when:** Stats match design §6.3.

---

### Task 8: Projects — cards, expand, filters, show more

**Goal:** Filterable expandable project list; Mnemo flagged; 4 visible by default.

**Files:**
- Create: `components/Projects.tsx`, `components/ProjectCard.tsx`
- Reuse (do not recreate): `components/Chip.tsx`, `components/ShowMoreButton.tsx` from Task 6
- Modify: `app/page.tsx`
- Read: `data/projects.ts`, `data/skills.ts` (optional for tag union)

**Needs from you:** None beyond Task 4 URLs.

**Reuse rule:** Filter tags, tech chips, Flagship chip, and show more/less **must** import and use the existing `Chip` and `ShowMoreButton` components. Do not create duplicate or parallel chip/show-more components.

**Steps:**
- [ ] Filter chips (All + union of tags) via `Chip`; mono chips; client state
- [ ] Sort by priority; Mnemo Flagship treatment (weight / `Chip` — not a second color)
- [ ] Collapsed: title, blurb, tech chips (`Chip`), links affordance
- [ ] Expanded: problem / approach / outcome / links
- [ ] Hover raise on card; show more/less after 4 via `ShowMoreButton`
- [ ] Filtering interacts sanely with show more (document chosen behavior: filter applies to full list, then visible slice — prefer this)

**Verify:**
```bash
npm run dev
```
Browser: Mnemo first + Flagship; expand Mnemo → substance + GitHub; click a filter → list narrows; Show more reveals remaining; hover raises card. Confirm only one `Chip.tsx` / `ShowMoreButton.tsx` exist in `components/`.
```bash
npm run build
```

**Done when:** Projects match design §6.4 and share Task 6 primitives.

---

### Task 9: Experience

**Goal:** Seven expandable roles (newest first), engineering-forward bullets + tech chips; show 3 by default with Show more / Show less.

**Files:**
- Create: `components/Experience.tsx`, `components/ExperienceItem.tsx`
- Modify: `app/page.tsx`
- Read: `data/experience.ts`

**Needs from you:** None beyond Task 4.

**Reuse rule:** Tech chips **must** use existing `Chip`; show more/less **must** use existing `ShowMoreButton`. Do not create duplicates.

**Steps:**
- [ ] Collapsed: company, role, dates
- [ ] Expand: bullets + tech chips (`Chip`); `aria-expanded`
- [ ] Newest first: Kohler → stu/dio → Apna → Google/Smollan → SPACENOS → OnePlus → Haryana Police
- [ ] Default visible: **3** roles; Show more / Show less reveals the rest

**Verify:**
```bash
npm run dev
```
Browser: three rows by default; Show more reveals 7; expand Kohler → bullets + tech chips; order correct.
```bash
npm run build
```

**Done when:** Experience matches design §6.6.

---

### Task 10: Publications section

**Goal:** Render `data/publications.ts` as a newest-first list with external “Read paper” links and optional abstract expand; reuse hover-raise and (if abstract used) the expand pattern from other cards.

**Ordering note:** Inserted after Experience (Task 9) and before Writing. Subsequent tasks renumbered 11–16 (formerly 10–15).

**Files:**
- Create: `components/Publications.tsx`, `components/PublicationCard.tsx`
- Modify: `app/page.tsx` (section between Projects and Experience)
- Read: `data/publications.ts` (content authored in Task 4)

**Needs from you:** None beyond Task 4 publication entries and real paper URLs.

**Steps:**
- [ ] List newest first; no filters
- [ ] Each item: title, venue, date, one-line summary, **Read paper** external link
- [ ] Optional abstract expand when `abstract` is present; reuse expand pattern (`aria-expanded`)
- [ ] Hover raise on item shell (same as other cards)

**Verify:**
```bash
npm run dev
```
Browser: `#publications` sits after Projects and before Experience; three papers; newest first; each **Read paper** opens the external URL; abstract expand works if data includes abstracts.
```bash
npm run build
```
Expected: success.

**Done when:** Publications match design §6.5; each paper links out; order correct; build passes.

---

### Task 11: Writing

**Goal:** Writing section with hover-raise cards. Prefer real post cards when `data/writing.ts` has published articles; otherwise fall back to profile-level venue cards.

**Files:**
- Create: `components/Writing.tsx`, `components/WritingCard.tsx`
- Modify: `app/page.tsx`
- Read: `data/writing.ts`, `data/site.ts` (profile URLs for fallback)

**Needs from you:** Real article URLs in Task 4 when posts exist. If none yet, leave `writing` empty (or omit post entries) — do not invent titles/URLs.

**Content fallback rule:**
- If `data/writing.ts` has **no published articles** when this task runs: render **profile-level cards** for Substack and LinkedIn (hrefs from `site.socials`), with framing that posts are coming (e.g. short muted line: “Writing in public — posts coming soon” plus venue profile links).
- Individual post cards are added later only via real edits to `data/writing.ts`.
- **Never invent placeholder article titles or URLs.**

**Steps:**
- [ ] If posts exist: title, venue, date, topic chips; card/title links external (`rel`/`target` sensible)
- [ ] If no posts: profile-level venue cards + coming-soon framing (no fake articles)
- [ ] Hover raise; no on-page article body

**Verify:**
```bash
npm run dev
```
Browser: If posts in data → post cards open real URLs. If empty → two profile cards (Substack / LinkedIn) + coming-soon framing; no invented article titles.
```bash
npm run build
```

**Done when:** Writing matches design §6.7 or the approved empty-state fallback; no fabricated posts.

---

### Task 12: About

**Goal:** Confident pivot copy + profile photo via `next/image`.

**Files:**
- Create: `components/About.tsx`
- Modify: `app/page.tsx`
- Read: `data/site.ts`, `public/profile.png`

**Needs from you:** Final About paragraph if not locked.

**Steps:**
- [ ] Photo modest size (not full-bleed) + about text
- [ ] Tone: confident honesty per design — no apology

**Verify:**
```bash
npm run dev
```
Browser: `#about` shows photo + copy; photo not in hero.
```bash
npm run build
```

**Done when:** About matches design §6.8.

---

### Task 13: Metadata, OG image, favicon

**Goal:** LinkedIn-ready sharing metadata and icons.

**Files:**
- Modify: `app/layout.tsx` (`metadata` / `openGraph` / `twitter`)
- Create: `public/og.png` (~1200×630, name + one-liner, light theme, ink accent sparingly)
- Create: `app/icon.svg` or `app/favicon.ico` / `public/favicon.ico`

**Needs from you:** **Approve** OG wording (name + one-liner) and favicon direction (or accept default “PA” mark).

**Steps:**
- [ ] Title + description from `site` content
- [ ] `og:image` absolute path note for production URL (`https://pratyushagarwal.com/og.png`)
- [ ] Twitter `summary_large_image`
- [ ] Favicon loads in browser tab

**Verify:**
```bash
npm run dev
```
View page source / Next metadata: title, description, og tags present.  
Open `http://localhost:3000/og.png` → card image loads. Tab shows favicon.
```bash
npm run build
```
Optional later: LinkedIn [Post Inspector](https://www.linkedin.com/post-inspector/) after deploy (Task 16).

**Done when:** Metadata matches design §10 Metadata subsection.

---

### Task 14: Accessibility + reduced motion pass

**Goal:** Keyboard and `prefers-reduced-motion` meet design §9.

**Files:**
- Modify: expandable components, `app/globals.css`, `SiteHeader`, focus styles

**Needs from you:** None.

**Steps:**
- [ ] All expands are `<button>` with `aria-expanded` / `aria-controls`
- [ ] Visible focus rings using accent
- [ ] Skip link works
- [ ] `@media (prefers-reduced-motion: reduce)`: no hover translate; expands instant (or minimal)
- [ ] Resume link clear (PDF); external links labeled

**Verify:**
```bash
npm run dev
```
Keyboard only: Tab through nav → hero CTAs → expand a log entry and a project with Enter/Space.  
DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → no raise animation.
```bash
npm run build
```

**Done when:** a11y checklist in design §9 satisfied.

---

### Task 15: Mobile pass

**Goal:** Clean single-column mobile ships (design §5 — in scope for v1).

**Files:**
- Modify: header/nav, section spacing, stats grid, project filters, hero CTA stacking as needed

**Needs from you:** None (quick visual QA on your phone optional).

**Steps:**
- [ ] 375px and 390px widths: no horizontal scroll
- [ ] Nav usable (compact row or simple overflow); touch targets ≥44px
- [ ] CTA group stacks cleanly; log rail readable; filters wrap; cards full width

**Verify:**
```bash
npm run dev
```
Chrome DevTools responsive: iPhone SE / 390 width — full page scroll through all sections; expand log + project; show more works; resume still reachable from nav or hero.
```bash
npm run build
```

**Done when:** Mobile is shippable, not “fix later.”

---

### Task 16: Deploy checklist (Vercel + domain)

**Goal:** Production on Vercel at `pratyushagarwal.com` with correct OG/PDF/assets.

**Files:**
- Modify: none required unless `metadata` base URL / `metadataBase` needs prod URL
- Optional: `README.md` deploy notes

**Needs from you:** **Required** — Vercel project link, DNS for `pratyushagarwal.com`, confirm HTTPS.

**Steps (you + agent guidance; agent does not need production credentials in chat):**
- [ ] Push repo; import to Vercel; framework preset Next.js
- [ ] Set production domain `pratyushagarwal.com` (+ `www` redirect preference)
- [ ] Confirm `metadataBase` / absolute OG URL
- [ ] Smoke: `/`, resume PDF, `/og.png`, `/profile.png`
- [ ] LinkedIn Post Inspector on homepage URL
- [ ] Quick mobile smoke on real device

**Verify (production):**
- Homepage loads over HTTPS
- Resume downloads
- Share preview shows title + description + OG image
- No console errors requiring a redesign

**Done when:** Live site matches v1 success criteria in design.md §12.

---

## Suggested commit cadence (you run git)

One commit per task is ideal, e.g. `feat: scaffold Next.js with fonts and tokens`, `feat: add shipping log section`, … You own all commits.

## Out of scope reminder

Do not implement in any task: dark mode, GitHub API grid/commits, analytics, blog/MDX, Framer Motion, contact forms, client fetching.

---

## Plan self-review

| Design requirement | Task(s) |
|--------------------|---------|
| Scaffold / fonts / tokens | 1 |
| Nav / footer / shell | 2 |
| Assets | 3 |
| Data schemas + content | 4 |
| Hero + CTA order | 5 |
| Shipping log + decorative markers + GitHub slot | 6 |
| Stats | 7 |
| Projects filter/expand/show more | 8 |
| Experience | 9 |
| Publications list + external links + optional abstract | 10 |
| Writing | 11 |
| About + photo | 12 |
| Metadata / OG / favicon | 13 |
| a11y + reduced motion | 14 |
| Mobile v1 | 15 |
| Vercel + domain | 16 |
| No client fetch / static performance | Global + Tasks 1–16 |
| Accent ink blue locked | Global + Task 1 |

No open accent decision remains. Content-heavy gate is **Task 4** and OG approval in **Task 13**.
