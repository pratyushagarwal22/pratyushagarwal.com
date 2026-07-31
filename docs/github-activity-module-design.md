# Design: GitHub Activity Module (post-v1)

Live, self-updating proof of building in public inside the Now / Shipping Log section. Native contribution grid + recent public commits. No manual maintenance, no third-party embeds.

**Audience:** Same as the site — recruiters and hiring managers skim for “does he ship?”; eng managers get a year of contribution texture plus a few real commit messages.

**Visual direction (locked):** Extends the Changelog / Commit History language already on the page. Ink-blue intensity ramp (site accent), not GitHub green. Quiet hairline chrome — never card / hover-raise.

**Parent brief:** `github-activity-module-plan.md` (PORTFOLIO TODO). Decisions below lock the brainstorm; do not re-litigate in the implementation plan.

---

## 1. Goals & reading layers

### 30-second skim (no clicks required)

Answers: is he actively shipping on GitHub?

- Contribution grid visible above the manual shipping log (full year of intensity)
- Latest 2–3 public commit lines (repo, message, relative time) readable without expand

### 5-minute deep read

Answers: what did he just touch, and does the year look consistent?

- Scroll the grid on mobile to older weeks
- Follow a commit message’s repo context by scanning the Now section / Projects (no deep commit UI in this module)

### Tone

Proof, not dashboards. Quiet and factual. Same confident-honesty voice as the rest of the site — no streak celebration, no vanity counters.

---

## 2. Chosen visual direction

### Signature element

**Native 365-day contribution calendar + short recent-commits list**, sitting in the reserved slot currently held by `components/GitHubSlot.tsx` (above the manual log inside `#now`).

- Grid: ~53 weeks × 7 days; cells map to a 5-level site-accent intensity ramp
- Commits: 2–3 rows — repo name (mono), message (body), relative time (muted mono meta)
- Shell: hairline / spacing treatment consistent with `StatsStrip` and the current `GitHubSlot` (`border-b border-border`, reserved min-height). **No card chrome, no hover-raise**

### Guardrails

- One accent family only — derived shades of `--color-accent` (`#1E4E8C`); never GitHub’s green palette / returned GraphQL `color`
- Mono only where the site already allows it (repo names, short meta) — not on commit message prose
- No tooltips required for module v1 (optional later; keep first ship simple)
- Light theme only (inherits site v1)

### Accent ramp (locked)

| Level | Token (new) | Hex | Role |
|-------|-------------|-----|------|
| 0 | `--color-contrib-0` | `#F0F0EF` | Empty day (`--color-chip-bg`) |
| 1 | `--color-contrib-1` | `#C5D4E8` | Low activity |
| 2 | `--color-contrib-2` | `#7A9BC4` | Mid |
| 3 | `--color-contrib-3` | `#3A6BA3` | Strong |
| 4 | `--color-contrib-4` | `#1E4E8C` | Max (`--color-accent`) |

Map GraphQL `contributionLevel` (`NONE` … `FOURTH_QUARTILE`) → levels 0–4. Do not tint large backgrounds with accent — only the small cells.

---

## 3. Palette (named hex)

Inherits site palette from `docs/design.md` §3 / `app/globals.css`. This module **adds** the five `--color-contrib-*` tokens above; it does not introduce a second brand color.

| Existing token | Hex | Use in this module |
|----------------|-----|--------------------|
| `--color-bg` | `#FAFAF9` | Page (unchanged) |
| `--color-text` | `#141414` | Commit message |
| `--color-text-muted` | `#5C5C5C` | Relative time, fallback copy, supporting labels |
| `--color-border` | `#E4E4E4` | Hairline under module shell |
| `--color-accent` | `#1E4E8C` | Contrib level 4; focus rings if cells are focusable later |
| `--color-chip-bg` | `#F0F0EF` | Contrib level 0 |

No purple, glow, or GitHub-default greens.

---

## 4. Typography

Inherits site faces from `docs/design.md` §4.

| Role | Family | Use in this module |
|------|--------|--------------------|
| **Body** | Source Sans 3 | Commit messages, fallback one-liner, optional total label |
| **Mono** | IBM Plex Mono | Repo name, relative time (meta) — keep small (~0.75–0.875rem) |
| **Display** | Newsreader | Not used inside the module (section title stays on Now’s `SectionHeading`) |

---

## 5. Layout & interaction principles

- Lives inside `#now`, same content column (`max-w-[900px]` + horizontal padding)
- Vertical stack: contribution grid → recent commits list → manual shipping log
- **Mobile grid:** full 365-day grid preserved; container `overflow-x-auto` with scroll position pinned to the **right** (most recent weeks) on load. Do not condense to last-N weeks — cutting the year defeats the module’s job (a year of proof). Horizontal scroll here is an intentional exception to the site’s general “no horizontal overflow” rule; contain it to the grid wrapper (`overscroll-x-contain`) so the page itself does not pan sideways
- Touch: scrollable region must remain usable; commit rows are text, not tiny hit targets
- `prefers-reduced-motion`: no decorative motion on the grid; scroll-into-view for “pin right” should respect reduced motion (prefer CSS `direction` / flex order tricks or instant jump over animated scroll)

### Performance & data fetching

- **Server-only** fetches. No client-side GitHub API calls
- One data module (e.g. `lib/github.ts`) loads calendar + commits in parallel (`Promise.all`)
- ISR / `fetch` `revalidate`:
  - **While building and verifying:** `3600` (hourly)
  - **Before final deploy:** switch to `21600` (6 hours)
  - This switch is intentional — document it in the implementation plan checklist so it is not forgotten
- Token: `GITHUB_TOKEN` in Vercel env only (classic PAT; no scopes required for public contribution data). Never commit the token. Use the same token on REST for authenticated rate limits

### Skim vs deep

| Always visible (skim) | Behind interaction |
|-----------------------|--------------------|
| Full-year grid (desktop) / recent weeks (mobile until scroll) | Older weeks via horizontal scroll |
| 2–3 latest commit lines | — (no expand UI in this module) |

---

## 6. Section-by-section layout

This module is **not** a new page section. It fills the reserved block inside **§6.2 Now / Shipping Log** of `docs/design.md`.

### 6.1 Placement (replaces `GitHubSlot`)

- Same position as today’s placeholder: first child in the Now body stack, above the manual log list
- Keep reserved spacing / min-height so the Now layout does not jump when falling back to the muted one-liner
- Replace `components/GitHubSlot.tsx` in place (rename or rewrite to the live module component — implementation plan chooses the final filename; behavior and position are fixed here)

### 6.2 Contribution grid

- Last ~365 days from GraphQL `contributionCalendar`
- 7 rows (Sun–Sat or GitHub’s weekday order as returned); ~53 week columns
- Cells: small squares using `--color-contrib-0`…`4`
- Optional quiet label (e.g. total contributions) — body/muted, not a big stat callout
- Accessibility: region labeled (e.g. `aria-label` summarizing the calendar / total); individual cells need not be interactive in module v1

### 6.3 Recent commits feed

- Latest **2–3** public commits derived from REST public events
- Each row: repo name · commit message · relative time (e.g. “3 hours ago”)
- Public pushes only; no private activity
- Not interleaved into `data/log.ts` entries

### 6.4 Fallback UI

| Situation | Render |
|-----------|--------|
| Revalidation fails but a previous successful payload exists | Prefer **stale cache** (Next.js ISR default) — show last good grid and/or commits |
| No successful cache ever (first deploy failure or prolonged outage) | Quiet muted one-liner in the same reserved-height shell, same voice as “GitHub activity — coming soon” (e.g. “GitHub activity unavailable”) |
| Grid fails, commits succeed (or vice versa) | Show the half that worked; omit the failed half without error chrome |
| Both fail, no cache | Muted one-liner only |

Never hide the module entirely. Never show raw errors, status codes, or stack traces.

### 6.5 ShippingLog structural change (required)

`ShippingLog.tsx` is currently a client component (show-more). A server-fetched GitHub module cannot be imported into it.

Required shape:

1. **`ShippingLog`** (or equivalent Now shell) becomes a **server** component: section chrome, heading, intro, GitHub module, then log list
2. **Client child** owns show-more (and continues to compose existing client `LogEntry` expand/collapse)
3. GitHub module remains a server component that calls `lib/github.ts`

---

## 7. Component structure

Delta relative to `docs/design.md` §7:

```
lib/
  github.ts              # server-only: GraphQL calendar + REST events; parallel fetch; typed results; revalidate
components/
  ShippingLog.tsx        # SERVER shell: #now chrome + GitHub module + client log list
  ShippingLogList.tsx    # CLIENT: show more/less + LogEntry list (name flexible in plan)
  GitHubActivity.tsx     # SERVER: replaces GitHubSlot — grid + commits + fallback shell
  ContributionGrid.tsx   # presentational (server-safe): ramp cells + scroll wrapper
  RecentCommits.tsx      # presentational (server-safe): 2–3 commit rows
  GitHubSlot.tsx         # removed or turned into thin re-export during cutover — no placeholder copy in final
```

**State:** Still no global store. Client state remains local to the log list (show-more / expand). GitHub data is fetch-cache only — no React state for API payloads.

**Username source:** Resolve `pratyushagarwal22` from `site.socials` (GitHub href), not a third hard-coded copy in multiple files.

---

## 8. Data schemas & API contracts

### 8.1 Internal result types (illustrative)

```ts
// lib/github.ts (conceptual — exact exports chosen in implementation plan)

export type ContributionDay = {
  date: string; // YYYY-MM-DD
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4; // mapped from contributionLevel
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { days: ContributionDay[] }[];
};

export type RecentCommit = {
  sha: string;
  message: string;
  repo: string; // owner/name or name
  repoUrl: string;
  commitUrl: string;
  occurredAt: string; // ISO from event
};

export type GitHubActivityData = {
  calendar: ContributionCalendar | null;
  commits: RecentCommit[] | null; // length 0–3; null = fetch failed
};
```

Do **not** write these into `data/log.ts`. Reserved `source: 'github' | 'manual'`, `repo`, and `sha` on log entries stay unused — interleaving is a separate future project.

### 8.2 GraphQL — contribution calendar (required)

Endpoint: `POST https://api.github.com/graphql`  
Header: `Authorization: Bearer ${process.env.GITHUB_TOKEN}`

```graphql
query ContributionCalendar($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
```

Variables: `{ "login": "<github username>" }`.

Notes:

- GitHub GraphQL requires authentication for all requests — token is unavoidable for real contribution-level data
- Unauthenticated REST cannot provide a 365-day contribution calendar; `/users/{user}/events/public` is recent events only
- Ignore any palette `color` field if requested later — map `contributionLevel` → site ramp only

### 8.3 REST — recent public commits

Endpoint:

`GET https://api.github.com/users/{login}/events/public`

- Filter `type === "PushEvent"`
- Flatten `payload.commits` across newest events; take the newest **2–3** commits (message + sha + repo from event)
- Prefer authenticated requests with `GITHUB_TOKEN` for rate limits (still public data only)

Relative time is formatted at render time from `created_at` / commit timestamps (implementation chooses a tiny formatter; no new dependency required unless the plan explicitly adds one).

---

## 9. Accessibility & motion

- Module wrapped in a labeled region (e.g. `aria-label="GitHub activity"`)
- Fallback copy uses `role="status"` (same idea as current `GitHubSlot`) when showing the muted unavailable line
- Focus rings remain site accent if any control is added later; module v1 has no required interactive controls beyond page scroll
- Horizontal scroller: keyboard users can tab past it; if the scroller itself is focusable, ensure a visible focus treatment
- `prefers-reduced-motion: reduce`: no animated scroll-to-end; jump or layout-based “recent first” without motion

---

## 10. Stack (fixed for this module)

- Next.js App Router server components + `fetch` caching / ISR (`revalidate`)
- TypeScript + Tailwind + existing CSS variables
- Vercel env: `GITHUB_TOKEN`
- No new UI libraries, no Framer Motion, no client GitHub SDK, no third-party contribution widgets

### Relationship to site stack notes

Site `docs/design.md` §10 still says “No backend, no CMS, no DB.” This module does **not** add a backend or DB; it adds **server-side outbound fetch** to GitHub at build/revalidate time. That is the intentional post-v1 exception.

---

## 11. Explicitly out of scope

Module v1 ships **only**:

1. Native 365-day contribution grid  
2. Latest 2–3 public commits  

**Not in scope:**

- Language stats, stars, streak counters, per-repo breakdowns, private contribution counts
- Third-party embeds (snk snake, ghchart, readme-stats cards, iframes)
- Client-side GitHub fetching / browser tokens
- Interleaving commits into the shipping log (`data/log.ts` `source: 'github'`, real SHAs on log markers)
- Tooltips / cell click → day detail (defer)
- Dark theme / terminal-green contrib ramp
- Changing Now section order, nav, or manual log content model

### Supersedes / amends `docs/design.md` (callouts)

When this module ships, these parent-doc lines are superseded **for this module only** (parent doc should be patched in a later housekeeping task, or noted in the implementation plan):

| Parent passage | How this design amends it |
|----------------|---------------------------|
| §5 Performance (v1): “fully static… no runtime APIs”; “live GitHub fetch… enters without a design.md change” | This document **is** that design change: server-side GitHub fetch + ISR is allowed for the Now slot |
| §11: “Live GitHub contribution grid + latest commits API module (reserved layout only)” | No longer out of scope — this module implements it |
| §11: “Client-side data fetching / runtime APIs of any kind” | Still banned **in the browser**. Server `fetch` + ISR is in scope here |
| §2 / §6.2: reserved slot for grid + latest commits | Slot filled in place of `GitHubSlot` |
| §2 / §6.2 / §8 `log.ts`: “real SHAs when GitHub module lands”; “interleave”; `source: 'github'` | **Not** delivered by this module. Interleaving remains a **separate future** design. Markers stay decorative; log entries stay `manual` |

---

## 12. Success criteria

- Grid shows last ~365 days in the 5-step site-accent ramp; legible on desktop; full year reachable on mobile via horizontal scroll pinned to recent weeks
- Feed shows latest 2–3 public commits with repo, message, and relative time
- Data refreshes via revalidate (`3600` during build/verify; **`21600` before final deploy**)
- With GitHub unreachable: site still renders; stale cache preferred; otherwise quiet muted one-liner in the reserved shell; partial success shows the working half
- `GITHUB_TOKEN` exists only in Vercel env vars (never in git)
- No client-side GitHub calls; no embeds; no log interleaving; no vanity stats
- `ShippingLog` server shell + client log-list split lands so the server module can fetch correctly
- Now section layout does not jump relative to the old placeholder spacing
