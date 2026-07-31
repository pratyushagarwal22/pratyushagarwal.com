# Design: pratyushagarwal.com (v1)

Single-page personal site. Job: show Pratyush Agarwal becoming a software engineer in public, with proof. Forward-looking, not a rearview resume.

**Audience:** Recruiters and hiring managers first (30–60s skim), with a full deep-read layer for eng managers and founders.

**Visual direction (locked):** Changelog / Commit History — shipping log as the signature. Editorial page chrome; monospace only on log dates, hash markers, and chips.

---

## 1. Goals & reading layers

### 30-second skim (no clicks required)

Answers: who is this, and what has he shipped?

- Hero: name, one-liner (build in public + pivot), “currently building Mnemo”
- Primary CTAs visible: View resume → See what I’m building → Email
- Stats strip: five concrete metrics
- Project titles (and flagship cue on Mnemo) visible collapsed

### 5-minute deep read (expand / follow links)

Answers: can he build software, how does he think, does he ship?

- Expanded shipping-log entries
- Expanded project cards (problem, approach, outcome, tech, GitHub)
- Expanded experience bullets (pipelines, APIs, automation, production)
- Writing links + About (confident pivot framing)

### Tone

Confident honesty. Not years of traditional SWE title experience; 3+ years shipping in production; learns fast; proof in the open. No apologetic voice.

---

## 2. Chosen visual direction

### Signature element

**Shipping log as a changelog / commit history.**

- Left rail: monospace date + short hash-style marker (decorative in v1; real SHAs when GitHub module lands in v2)
- Pseudo-hash markers are **visibly decorative styling only**, not fake commit SHAs: muted mono treatment, no copy affordance, no tooltip implying a real git object
- Entry type chips: `shipped` | `wrote` | `built` | `milestone` (monospace)
- Title + one-line summary always visible; body expands on click
- Quiet vertical timeline rule connecting markers
- Layout reserves a **v2 slot** above or beside the manual feed for: GitHub contribution grid (365 days) + 2–3 latest real commits. v1 renders an empty reserved region (same max-width / spacing) so v2 drops in without redesign. Manual log entries and future API commits share one visual language so they can interleave.

### Guardrails

- Mono **only** on: log dates, hash markers, chips (log + project tech + filter tags)
- Everything else: display + body faces (editorial)
- One accent color only: log markers + CTAs (links inherit accent or underline; not a second brand color)
- Flat cards at rest; hover raise only; no decorative texture, no gradients as primary identity
- Light theme only in v1

### Accent (locked)

| Token | Hex | Role |
|-------|-----|------|
| `--color-accent` | `#1E4E8C` | Ink blue — markers + CTAs |
| `--color-accent-hover` | `#163A6B` | Button / link hover |

Accent usage: primary buttons, log markers / timeline dots, focus rings, text links on hover. Do not tint large backgrounds with accent.

**Reserved for v2+ dark theme:** terminal green `#0F7A4F` (hover `#0B5C3B`) — not used in v1 light theme.

---

## 3. Palette (named hex)

| Token | Hex | Role |
|-------|-----|------|
| `--color-bg` | `#FAFAF9` | Page background (cool off-white, not cream) |
| `--color-surface` | `#FFFFFF` | Cards, expanded panels |
| `--color-text` | `#141414` | Primary text |
| `--color-text-muted` | `#5C5C5C` | Supporting copy, meta |
| `--color-border` | `#E4E4E4` | Hairlines, card borders at rest |
| `--color-border-strong` | `#CFCFCF` | Hover / expanded edge |
| `--color-accent` | `#1E4E8C` | Markers + CTAs (ink blue, locked) |
| `--color-accent-hover` | `#163A6B` | Button / link hover |
| `--color-chip-bg` | `#F0F0EF` | Chip fill |
| `--color-chip-text` | `#3D3D3D` | Chip label |

No purple gradients, no glow, no warm cream + terracotta pairing.

---

## 4. Typography

| Role | Family | Weight / size notes |
|------|--------|---------------------|
| **Display** | [Newsreader](https://fonts.google.com/specimen/Newsreader) | Name, section titles. Hero name ~clamp(2.5rem–4rem); section H2 ~1.75–2rem |
| **Body** | [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) | One-liners, prose, bullets. 1rem / 1.625 line-height |
| **Mono** | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Log dates, hash markers, chips only. ~0.75–0.875rem |

Loaded via `next/font`. No Inter / Roboto / Arial / system UI as primary faces.

---

## 5. Layout & interaction principles

- Max content width ~680–720px for text-heavy sections; projects/stats may use ~900px
- Generous vertical whitespace between sections (~4–6rem)
- Cards: 1px border, no shadow at rest; on hover: translateY(-2px) + light shadow; `@media (prefers-reduced-motion: reduce)` → no translate, instant expand
- Expand/collapse: CSS max-height / grid-template-rows transition + `aria-expanded`; keyboard: Enter/Space on header button
- **Mobile is in v1 scope (not deferred):** desktop-first polish is fine, but clean single-column mobile rendering ships with v1 — sticky nav collapses to essential links / compact overflow; touch targets ≥44px; no horizontal overflow
- “Show more / less” for long lists (log, projects) after a fixed visible count (see sections)

### Performance (v1)

v1 is fully static: no client-side data fetching, no runtime APIs. Images via `next/image`. Nothing heavier (analytics SDKs, live GitHub fetch, motion libraries, CMS clients) enters without a `design.md` change.

### Skim vs deep

| Always visible (skim) | Behind expand / link (deep) |
|-----------------------|-----------------------------|
| Hero identity + CTAs | Full log bodies |
| Stats numbers + labels | Project long description, outcomes |
| Project titles + short blurb + tags | Experience bullet detail |
| Publication titles + venue + date | Optional longer abstract |
| Writing titles | — |
| About thesis (short) | Optional longer About if needed |

### Navigation

Quiet sticky top bar: name (scroll top) + anchors: Now, Projects, Publications, Experience, Writing, About. Resume as accent text button in nav. No hamburger theater on desktop; mobile: compact row or overflow menu with same anchors.

---

## 6. Section-by-section layout

Order is fixed: Hero → Now → Stats → Projects → Publications → Experience → Writing → About → Footer.

### 6.1 Hero

- Display name: **Pratyush Agarwal**
- One-liner: building software in public + active pivot to SWE / AI / product engineering
- Status line: Currently building **Mnemo** (text link scrolls to Mnemo in Projects or highlights log)
- No profile photo in hero (keeps skim focused on name, one-liner, CTAs). Photo lives in About only.
- CTA group (priority order):
  1. **View resume** → PDF in `public/` (sourced from `assets/pratyush-agarwal-resume.pdf`)
  2. **See what I’m building** → scroll to `#now` (shipping log)
  3. **Email** → `mailto:hi@pratyushagarwal.com`
- Secondary text links (muted): GitHub (`pratyushagarwal22`), LinkedIn (`agarwal-pratyush`), Substack (`@agarwalpratyush`)
- No stats, no project cards, no log entries in the hero

### 6.2 Now / Shipping Log (`#now`) — signature

- Section label + one sentence: dated feed of what shipped
- **v2 reserved block** (v1: structurally present, visually empty or a one-line “GitHub activity — coming soon” muted placeholder with fixed min-height so layout does not jump later): contribution grid + latest commits
- Manual feed (v1 content): newest first; each entry = date (mono) + marker + type chip + title + summary; click header to expand body (markdown-ish plain paragraphs / bullets in data)
- Default visible: **5** entries; **Show more** reveals the rest (button becomes **Show less** when expanded)
- Entry kinds map to chips; future GitHub commits use the same row component with `source: 'github' | 'manual'`

### 6.3 Stats strip

- Full-bleed-within-content horizontal strip; 5 stats in a responsive grid (2-col mobile, 5-col desktop if space; wrap ok)
- Each: large number/phrase + short label
  - ~20% fraud reduction (Apna)
  - ~$2,500/mo BigQuery savings
  - ~10 hrs/wk reporting saved (Kohler)
  - 2nd place — Claude Builder Club Hackathon (UIUC)
  - 3 published papers (Springer, IEEE, Elsevier)
- No expand; skim-only. Hairline top/bottom borders; no card chrome

### 6.4 Projects (`#projects`)

- Before Publications, then Experience (locked)
- Filter row: monospace chips from union of project tags (All + tags). Client state only
- Cards collapsed: title, one-line blurb, tech chips, optional live/demo badge; Mnemo visually flagged (label or accent marker — not a second color; use weight / “Flagship” chip)
- Expand: problem, approach, outcome, GitHub link, demo link if any
- Hover raise on card shell
- Default visible: **4** projects (Mnemo first via `featured` / `priority`); **Show more** reveals the rest (F1 pipeline, Chicago Crimes viz, Global Energy ETL, etc.)
- Listed projects (content in `data/projects.ts`): Mnemo, TickerSense, TripTok, JOBHUNT, F1 pipeline, Chicago Crimes viz, Global Energy ETL

### 6.5 Publications (`#publications`)

- Between Projects and Experience (locked). Rationale: 3 peer-reviewed papers are proof of technical depth and do not fit as built software.
- Simple list, newest first. No filters.
- Each item: title, venue, date, one-line summary, external link labeled **Read paper**
- Optional expand for a longer abstract (`abstract?: string[]`)
- Hover raise on item shell (same card hover pattern as other cards)

### 6.6 Experience (`#experience`)

- Expandable rows (company, role, dates always visible)
- Expand: engineering-forward bullets (pipelines, APIs, automation, production) + tech chips (`Chip`)
- Seven roles, newest first; default visible **3**, then **Show more / Show less** (`ShowMoreButton`)
- Order (newest first):
  - Kohler Co. — Data Engineer Intern (Jun 2025–May 2026)
  - The stu/dio at Illinois — Project Manager (Dec 2024–Jun 2025)
  - Apna — Data Engineer (Oct 2022–Aug 2024)
  - Google via Smollan — Strategy & Analytics Intern (Oct 2021–Apr 2022)
  - SPACENOS — Product Manager Intern (May 2021–Jul 2021)
  - OnePlus — Marketing Specialist Intern (Sep 2020–Feb 2021)
  - Haryana Police — Cybersecurity Intern, GPCSSI'20 (Jun 2020–Jul 2020)
- No logo farm; text-first

### 6.7 Writing (`#writing`)

- Simple cards: title, venue (Substack / LinkedIn), date, topic tags; click → external URL
- Topics focus: Mnemo build, DSA, system design, LLD
- Hover raise; no on-page article body in v1

### 6.8 About (`#about`)

- Short honest block: pivot framing (see tone); 3+ years production shipping; fast learner; proof in the open
- Profile photo here only (from `assets/IMG_0100.png` → `public/`), modest size beside or above copy — not a full-bleed portrait
- No long biography essay

### 6.9 Footer

- Email + socials (same set as hero)
- © year Pratyush Agarwal
- Quiet; no sitemap clutter

---

## 7. Component structure

```
app/
  layout.tsx          # fonts, metadata, skip link
  page.tsx            # composes sections
  globals.css         # tokens, reduced-motion, base
components/
  SiteHeader.tsx      # sticky nav + resume CTA; anchors: Now, Projects, Publications, Experience, Writing, About
  Hero.tsx
  ShippingLog.tsx     # feed + Show more; includes GitHubSlot
  GitHubSlot.tsx      # v1 placeholder shell for grid + commits
  LogEntry.tsx        # expandable changelog row
  StatsStrip.tsx
  Projects.tsx        # filters + list + Show more
  ProjectCard.tsx     # expandable
  Publications.tsx
  PublicationCard.tsx # list item; optional abstract expand
  Experience.tsx
  ExperienceItem.tsx  # expandable
  Writing.tsx
  WritingCard.tsx
  About.tsx
  SiteFooter.tsx
  Chip.tsx            # mono chip
  SectionHeading.tsx
  ShowMoreButton.tsx
  ExternalLink.tsx
data/
  projects.ts
  publications.ts
  experience.ts
  writing.ts
  log.ts
  skills.ts           # tag vocabulary / filter source — not a page section
  site.ts             # name, links, one-liner, CTAs, socials
  stats.ts
```

**State:** React `useState` for expanded ids, active filter, show-more flags. No global store.

**Assets:** Copy or serve from `public/` (or Next static) — `profile.png` (from `assets/IMG_0100.png`), `pratyush-agarwal-resume.pdf`. Keep `assets/` as source; implementation plan decides public path.

---

## 8. Data file schemas (TypeScript)

```ts
// data/site.ts
export type SocialLink = {
  id: 'github' | 'linkedin' | 'substack' | 'email';
  label: string;
  href: string;
};

export type SiteContent = {
  name: string;
  shortName: string; // header mark
  title: string; // browser / OG
  oneLiner: string;
  currentlyBuilding: { name: string; href: string }; // in-page anchor
  resumeHref: string;
  profileImageSrc: string;
  socials: SocialLink[];
  about: string; // confident pivot copy
};
```

```ts
// data/log.ts
export type LogEntryType = 'shipped' | 'wrote' | 'built' | 'milestone';

export type LogEntry = {
  id: string;
  date: string; // ISO YYYY-MM-DD
  marker: string; // decorative pseudo-hash styling only in v1 — not a real SHA; no copy affordance
  type: LogEntryType;
  title: string;
  summary: string; // visible collapsed
  body: string[]; // paragraphs or bullet lines when expanded
  href?: string; // optional external (post, PR, demo)
  source: 'manual' | 'github'; // v1: always 'manual'; github reserved for v2
  repo?: string; // v2
  sha?: string; // v2
};
```

```ts
// data/stats.ts
export type Stat = {
  id: string;
  value: string; // "~20%", "~$2,500/mo", "2nd", "3", etc.
  label: string;
};
```

```ts
// data/skills.ts — vocabulary for filters / consistency, no Skills section
export type Skill = {
  id: string;
  label: string;
  group?: 'language' | 'framework' | 'infra' | 'data' | 'ai';
};

export const skills: Skill[];
```

```ts
// data/projects.ts
export type Project = {
  id: string;
  title: string;
  blurb: string; // one line, collapsed
  description: string[]; // expanded paragraphs
  problem?: string;
  approach?: string;
  outcome?: string;
  tech: string[]; // chip labels; prefer skills[].label
  tags: string[]; // filter tags
  links: { label: string; href: string }[]; // GitHub, demo, etc.
  featured?: boolean; // Mnemo
  priority: number; // sort
};
```

```ts
// data/publications.ts
export type Publication = {
  id: string;
  title: string;
  venue: 'Elsevier' | 'IEEE' | 'Springer';
  date: string;
  summary: string;
  abstract?: string[];
  href: string;
};
```

```ts
// data/experience.ts
export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string; // "Jun 2025"
  end: string; // "May 2026" | "Present"
  summary?: string; // one line collapsed optional
  tech: string[]; // chip labels (shared Chip)
  bullets: string[]; // engineering-forward
};
```

```ts
// data/writing.ts
export type WritingItem = {
  id: string;
  title: string;
  venue: 'Substack' | 'LinkedIn';
  date: string; // ISO
  href: string;
  topics: string[];
};
```

All content lives in these typed modules. No CMS, no MDX blog engine in v1.

---

## 9. Accessibility & motion

- Semantic landmarks: `header`, `main`, `footer`, section `aria-labelledby`
- Expandable controls are `<button>` with `aria-expanded` and `aria-controls`
- Focus visible rings using accent
- Skip to content link
- `prefers-reduced-motion: reduce`: disable hover translate and expand animations
- External links: clear labels; resume link announces PDF

---

## 10. Stack (fixed)

- Next.js 14+ App Router, TypeScript, Tailwind CSS
- React state + CSS transitions only (no Framer Motion in v1)
- Static export-friendly; deploy on Vercel; domain `pratyushagarwal.com`
- No backend, no CMS, no DB

### Metadata (v1 scope)

Required for LinkedIn and general sharing:

| Field | Guidance |
|-------|----------|
| Page `<title>` | From `site.title` (e.g. “Pratyush Agarwal — Building software in public”) |
| Meta description | One sentence from one-liner / about thesis (~150–160 chars) |
| Open Graph | `og:title`, `og:description`, `og:image`, `og:type` (website), `og:url` |
| Twitter card | `summary_large_image` aligned with OG |
| Favicon | Simple mark in `app/` or `public/` (SVG or PNG) |
| `og:image` | Static card image (name + one-liner); generate once as `public/og.png` (~1200×630). No dynamic OG in v1 |

Wire via Next.js App Router `metadata` / `openGraph` in `app/layout.tsx` (or `generateMetadata`).

---

## 11. Explicitly out of scope (v1)

- Dark mode (terminal green accent reserved for future dark theme — see §2)
- Framer Motion / animation libraries
- Blog engine / MDX / on-site post rendering
- CMS, database, auth
- Analytics (Plausible, GA, etc.) — defer
- Contact form (mailto only)
- Live GitHub contribution grid + latest commits API module (reserved layout only)
- Interleaving real GitHub commits into the log (`source: 'github'`)
- Client-side data fetching / runtime APIs of any kind
- Skills as a standalone page section (`skills.ts` is data vocabulary only)
- Multiple resumes / resume switcher
- i18n
- Comments, newsletter embed, calendar booking
- Dynamic OG image generation
- Purple / glow / heavy glassmorphism / decorative textures

---

## 12. Success criteria

- Recruiter can answer “who / what shipped / where’s the resume” in under 30s without expanding anything
- Eng manager can expand Mnemo + 2 log entries + one experience role and judge build ability
- Shipping log is recognizably the signature; rest of page stays quiet
- Section order on page and in nav: Now → Projects → Publications → Experience → Writing → About (Publications after Projects)
- Lighthouse-accessible patterns for keyboard + reduced motion
- Clean single-column mobile layout ships in v1
- LinkedIn share shows correct title, description, and OG image
- Content edits = data file edits only

