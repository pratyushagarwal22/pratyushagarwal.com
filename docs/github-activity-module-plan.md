# GitHub Activity Module — Implementation Plan

> **For agentic workers:** Implement task-by-task against `docs/github-activity-module-design.md`. Do not expand scope. User commits and branches themselves — leave the repo in a working, buildable state at the end of each task; do not run `git commit` / `git checkout` / `git push` unless asked.

**Goal:** Ship a live, self-updating GitHub contribution grid + latest 2–3 public commits inside the Now section, replacing `GitHubSlot`, with server-only fetch and ISR.

**Architecture:** One server data module (`lib/github.ts`) fetches GraphQL calendar + REST public events in parallel. `ShippingLog` becomes a server shell; show-more moves to a client child. Presentational `ContributionGrid` + `RecentCommits` compose under `GitHubActivity`, which replaces `GitHubSlot` in place.

**Tech stack:** Next.js App Router server components, TypeScript, Tailwind, existing design tokens + new `--color-contrib-*` ramp, `fetch` + `revalidate`, Vercel env `GITHUB_TOKEN`.

**Spec:** `docs/github-activity-module-design.md` (approved). If this plan and the design disagree, **the design doc wins** — update the plan, don’t freestyle.

## Global constraints

- Accent ramp only: `--color-contrib-0`…`4` from chip-bg → `#1E4E8C`. Never GitHub green / GraphQL `color`.
- No card chrome / hover-raise on the module. Hairline shell like current `GitHubSlot` (`min-h-24`, `border-b border-border`, `pb-6`).
- Server-only GitHub calls. No client-side `fetch` to `api.github.com` / GraphQL.
- `GITHUB_TOKEN` only in env (local `.env.local` + Vercel project). Never commit secrets.
- `revalidate: 3600` until Task 11; then `21600` before merge.
- Out of scope: log interleaving (`data/log.ts` `source` / `sha`), tooltips, dark theme, language stats, stars, streaks, per-repo breakdowns, third-party embeds.
- Username from `site.socials` GitHub href (`pratyushagarwal22`), not a third hard-coded copy.

## File map (target)

```
.env.local                 # local only; gitignored (user-created)
lib/github.ts              # typed parallel fetch + mapping
app/globals.css            # --color-contrib-0…4 (+ @theme if needed)
components/ShippingLog.tsx           # SERVER shell
components/ShippingLogList.tsx       # CLIENT show-more + LogEntry list
components/GitHubActivity.tsx        # SERVER: fetch + compose + fallback
components/ContributionGrid.tsx      # presentational grid + scroll wrapper
components/RecentCommits.tsx         # presentational 2–3 rows
components/GitHubSlot.tsx            # delete after cutover (or remove exports)
```

## Needs from you (manual / outside Cursor)

| Item | When | Notes |
|------|------|-------|
| Classic GitHub PAT (no scopes) + `.env.local` | Task 1 | Steps marked **MANUAL STEP (user)** |
| Same `GITHUB_TOKEN` in Vercel project env | Before deploy / Task 10 | Dashboard, not only local |
| Confirm fallback with a bad token | Task 10 | Temporarily break token, restore after |
| Network-tab check (no client GitHub calls) | Task 10 | DevTools on homepage |
| Own all git branching / commits | All tasks | Agents do not run git unless asked |

---

### Task 1: Local env setup for `GITHUB_TOKEN`

**Goal:** Local Next.js can authenticate to GitHub GraphQL/REST. Token never enters git.

**Files:**
- Create (user): `.env.local` (must remain untracked)
- Read only: `.gitignore` (already contains `.env` and `.env*.local`)

**Steps:**
- [ ] **MANUAL STEP (user):** Confirm `.env.local` is gitignored before adding a token.
  1. Open `.gitignore` and confirm these lines exist (they already do in this repo):
     - `.env`
     - `.env*.local`
  2. Optional check from repo root: `git check-ignore -v .env.local` — should report a matching ignore rule (even if the file does not exist yet).
- [ ] **MANUAL STEP (user):** Generate a classic personal access token on GitHub:
  1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
  2. **Generate new token** (classic)
  3. Note/name it (e.g. `pratyushagarwal.com local`)
  4. **Do not enable any scopes** — public contribution data + public events only
  5. Generate and copy the token once
- [ ] **MANUAL STEP (user):** Create `.env.local` at the repo root with exactly:
  ```bash
  GITHUB_TOKEN=ghp_your_token_here
  ```
  Restart `npm run dev` after creating or changing this file so Next.js picks up the env var.
- [ ] **MANUAL STEP (user) — deploy reminder:** Before this branch is deployed to production, add the same `GITHUB_TOKEN` as an environment variable in the **Vercel project dashboard** (Production + Preview as you prefer). Local `.env.local` does **not** ship to Vercel. Do this before or during Task 10; Task 11 assumes it will be present for the final deploy.

**Verify:**
```bash
# Token must NOT appear in git status as a tracked file
git status --short
```
Expected: `.env.local` absent from tracked changes (ignored). If it shows as untracked, **stop** and fix `.gitignore` before continuing.

**Done when:** `.env.local` exists locally with `GITHUB_TOKEN`, is ignored by git, and the Vercel reminder is acknowledged for later.

---

### Task 2: `lib/github.ts` — typed GraphQL + REST fetch

**Goal:** One server-only data module returns calendar + commits in parallel with `revalidate: 3600`, or `null` halves on failure.

**Files:**
- Create: `lib/github.ts`
- Read: `data/site.ts` (GitHub social href → login), `docs/github-activity-module-design.md` §8

**Interfaces (lock these names for later tasks):**

```ts
export type ContributionDay = {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { days: ContributionDay[] }[];
};

export type RecentCommit = {
  sha: string;
  message: string;
  repo: string;
  repoUrl: string;
  commitUrl: string;
  occurredAt: string;
};

export type GitHubActivityData = {
  calendar: ContributionCalendar | null;
  commits: RecentCommit[] | null;
};

/** Resolve login from site.socials GitHub href. */
export function getGitHubLogin(): string;

/** Parallel fetch; never throws to callers — failed halves are null. */
export function getGitHubActivity(): Promise<GitHubActivityData>;
```

**Steps:**
- [ ] Implement `getGitHubLogin()` by parsing the pathname of `site.socials` entry `id === "github"` (expect `pratyushagarwal22`).
- [ ] Map GraphQL `contributionLevel` → `level`:
  - `NONE` → 0
  - `FIRST_QUARTILE` → 1
  - `SECOND_QUARTILE` → 2
  - `THIRD_QUARTILE` → 3
  - `FOURTH_QUARTILE` → 4
- [ ] GraphQL: `POST https://api.github.com/graphql` with header `Authorization: Bearer ${process.env.GITHUB_TOKEN}` and query exactly as in design §8.2. Use `fetch(..., { next: { revalidate: 3600 } })`.
- [ ] REST: `GET https://api.github.com/users/${login}/events/public` with the same Bearer token and `revalidate: 3600`. Filter `PushEvent`, flatten `payload.commits` newest-first, take **3** max (UI may show 2–3; fetch up to 3). Build `repoUrl` / `commitUrl` from event repo + sha.
- [ ] `getGitHubActivity()` runs both via `Promise.all`. Each side try/catch independently → `null` on missing token, non-OK HTTP, GraphQL `errors`, or parse failure. Empty successful commit list is `[]`, not `null` (reserve `null` for fetch failure).
- [ ] Do not log the token. Do not import this module from any `"use client"` file.

**Verify:**
```bash
# Temporary smoke from a one-off server context, or call getGitHubActivity from a throwaway server page you delete before finishing the task.
# Prefer: npm run build after a minimal server-only import test, or run a short node/tsx script is NOT required if Next build later covers it.
npm run build
```
If the module is not yet imported by the app, add a temporary import in `GitHubSlot` or a comment-only compile check is insufficient — either leave the module unused until Task 8 (TypeScript still typechecks the file on build if referenced) **or** verify with:

```bash
npx tsc --noEmit
```

Expected: no type errors in `lib/github.ts`. With Task 1 token present, a quick manual check (temporary `console.log` of totals in a server component, removed before task end) should show non-null `calendar` and a short `commits` array.

**Done when:** Types + `getGitHubActivity` exist; `revalidate: 3600` on both fetches; failures return `null` halves without throwing.

**Implementation notes / deviations:** The recent-commits feed no longer reads inline `payload.commits` from public PushEvents. That array is absent from the current public events API (payloads expose `head`/`before` only). Instead, `fetchRecentCommits` takes up to 3 newest PushEvent `head` SHAs and fetches each message via `GET /repos/{owner}/{repo}/commits/{sha}` in parallel, keeping the same `RecentCommit` shape and null-vs-`[]` failure contract.

---

### Task 3: `ShippingLog` server shell + client list child

**Goal:** Now section can host a server-fetched GitHub module. Show-more stays client-only in a child.

**Files:**
- Modify: `components/ShippingLog.tsx` (remove `"use client"`; keep section chrome)
- Create: `components/ShippingLogList.tsx` (`"use client"`)
- Unchanged behavior: `LogEntry`, `ShowMoreButton`, `DEFAULT_VISIBLE = 5`
- Still render: `<GitHubSlot />` (placeholder) until Task 8

**Steps:**
- [ ] Move the show-more state, sorted/visible slice, `<ol id="now-entries">`, `LogEntry` map, and `ShowMoreButton` into `ShippingLogList`.
- [ ] `ShippingLog` (server) keeps: `<section id="now">`, `SectionHeading`, intro paragraph, layout wrapper `mt-8 flex flex-col gap-8`, `<GitHubSlot />`, then `<ShippingLogList />`.
- [ ] Preserve exact copy, classes, and `aria-labelledby="now-heading"` from the current section.
- [ ] Confirm `LogEntry` remains a client component imported only from `ShippingLogList` (not from the server shell).

**Verify:**
```bash
npm run dev
```
Browser `#now`: placeholder “GitHub activity — coming soon” still above the log; Show more / Show less still works; expand/collapse on entries still works.
```bash
npm run build
```
Expected: success (no “client/server component” boundary errors).

**Done when:** Server shell + client list split is live; placeholder still in place; log UX unchanged.

---

### Task 4: `ContributionGrid` — desktop layout + 5-level ramp

**Goal:** Presentational year grid styled with site contrib tokens (desktop-first; scroll behavior in Task 5).

**Files:**
- Modify: `app/globals.css` — add `--color-contrib-0`…`4` in `:root` and `@theme inline` so Tailwind can use `bg-contrib-0` … `bg-contrib-4` (or equivalent CSS variables)
- Create: `components/ContributionGrid.tsx`
- Read: design §2 accent ramp

**Token values (locked):**

| Token | Hex |
|-------|-----|
| `--color-contrib-0` | `#F0F0EF` |
| `--color-contrib-1` | `#C5D4E8` |
| `--color-contrib-2` | `#7A9BC4` |
| `--color-contrib-3` | `#3A6BA3` |
| `--color-contrib-4` | `#1E4E8C` |

**Steps:**
- [ ] Add the five CSS variables alongside existing palette tokens.
- [ ] `ContributionGrid` props: `calendar: ContributionCalendar` (from Task 2 types).
- [ ] Render weeks as columns, days as rows, using returned weekday order. Cell size compact (e.g. `size-2.5` / `size-3` with `gap-0.5`) so ~53 weeks fit in the ~900px content column on desktop without page-level overflow.
- [ ] Map `day.level` → `bg-contrib-{level}` (or `style={{ background: var(--color-contrib-N) }}`).
- [ ] Optional quiet muted total line (`{totalContributions} contributions`…) — body/sm, not a hero stat.
- [ ] No hover-raise, no card border around the grid itself, no tooltips.
- [ ] Do not wire into the page yet unless useful for visual QA with mock data; wiring is Task 8. If unwired, export the component and typecheck via build.

**Verify:**
```bash
npm run build
```
Temporary visual check (optional): pass mock `ContributionCalendar` from a throwaway render — cells show five distinct ink-blue intensities, not green.

**Done when:** Tokens exist; grid component renders a full calendar from props on desktop width.

---

### Task 5: Mobile grid scroll behavior

**Goal:** Full 365-day grid on narrow viewports via horizontal scroll, most recent weeks visible first, without panning the whole page.

**Files:**
- Modify: `components/ContributionGrid.tsx`

**Steps:**
- [ ] Wrap the week columns in a scroller: `overflow-x-auto overscroll-x-contain` (and `-webkit-overflow-scrolling: touch` if needed).
- [ ] Pin initial view to the **most recent** weeks **without animated scroll** (respect reduced motion / design §5). Preferred approach: CSS `direction: rtl` on the scroll container + `direction: ltr` on the inner track (or equivalent flex technique) so the end of the year is visible first without client JS. Do **not** add a `"use client"` scroll effect unless the CSS approach fails verification.
- [ ] Ensure the page body itself does not gain horizontal overflow at ~375px width — only the grid wrapper scrolls.
- [ ] Keep full year (do not slice weeks for mobile).

**Verify:**
```bash
npm run dev
```
Browser DevTools → iPhone width (~390px): grid shows recent weeks; swipe/drag left reveals older weeks; document does not rubber-band sideways as a whole.

**Done when:** Mobile scroll + pin-to-recent works; full year preserved.

---

### Task 6: `RecentCommits` — 2–3 commit rows

**Goal:** Presentational list matching design typography (mono repo + relative time; body message).

**Files:**
- Create: `components/RecentCommits.tsx`
- Optional tiny helper in same file or `lib/github.ts`: `formatRelativeTime(iso: string): string` (no new dependencies)

**Steps:**
- [ ] Props: `commits: RecentCommit[]` (length 0–3).
- [ ] Each row: repo (mono, muted/small) · message (body, `text-text`, truncate long first lines sensibly) · relative time (mono muted).
- [ ] Message may link to `commitUrl` via existing `ExternalLink` patterns if that matches nearby UI; otherwise plain text is acceptable for module v1 — prefer a quiet text link on the message or repo without card chrome.
- [ ] Render nothing (or null) when `commits.length === 0` — parent decides fallback copy (Task 7).
- [ ] Do not read `data/log.ts` or set `source: 'github'`.

**Verify:**
```bash
npm run build
```
Optional: render three mock commits — layout readable, mono only on meta.

**Done when:** Component displays up to three commits from props with repo, message, relative time.

---

### Task 7: Fallback UI — stale cache, muted one-liner, partial success

**Goal:** Encode design §6.4 in `GitHubActivity` rendering rules (fetch already returns null halves from Task 2; ISR stale cache is Next default).

**Files:**
- Create: `components/GitHubActivity.tsx` (server component)
- Read: `components/GitHubSlot.tsx` for shell classes to preserve

**Steps:**
- [ ] `GitHubActivity` calls `await getGitHubActivity()`.
- [ ] Shell classes match placeholder spacing: `min-h-24`, `border-b border-border`, `pb-6` (plus internal stack gap as needed).
- [ ] Render rules:
  | `calendar` | `commits` | UI |
  |------------|-----------|-----|
  | non-null | non-null (maybe `[]`) | Grid + commits list (omit commits block if `[]`) |
  | non-null | `null` | Grid only |
  | `null` | non-null with length > 0 | Commits only |
  | `null` | `null` or empty with no calendar | Quiet muted one-liner: `GitHub activity unavailable` inside the shell |
- [ ] Never throw; never render error objects / status codes / stack traces.
- [ ] Do not hide the module (always keep the shell).
- [ ] Stale-on-revalidate-failure is handled by Next fetch cache — no extra Redis/custom store. Document in a short code comment near `getGitHubActivity` that failed revalidations should keep prior successful payloads when present.

**Verify:**
Logic review + unit-less manual paths in Task 10. For now:
```bash
npm run build
```
Expected: component typechecks. Full fallback proof is Task 10 (bad token).

**Done when:** `GitHubActivity` implements partial + empty fallback rules with reserved-height shell.

---

### Task 8: Replace `GitHubSlot` in place

**Goal:** Live module sits where the placeholder was; placeholder removed.

**Files:**
- Modify: `components/ShippingLog.tsx` — render `<GitHubActivity />` instead of `<GitHubSlot />`
- Delete: `components/GitHubSlot.tsx` (or leave a one-line re-export of `GitHubActivity` only during a brief cutover, then delete — final tree must not show “coming soon”)
- Grep: ensure no remaining imports of `GitHubSlot`

**Steps:**
- [ ] Swap import/usage in `ShippingLog`.
- [ ] Remove placeholder component/file and any dead exports.
- [ ] Confirm stack order: GitHub module → manual log list.
- [ ] With Task 1 token set, load homepage and confirm real grid + commits above the shipping log.

**Verify:**
```bash
npm run dev
```
Browser `#now`: no “coming soon”; contribution squares use ink-blue ramp; 2–3 commit rows (if public pushes exist); log still below.
```bash
npm run build
```
Expected: success.

**Done when:** Placeholder gone; live module in the same position/spacing.

---

### Task 9: Accessibility pass

**Goal:** Meet design §9 for the module without adding interactive cell tooltips.

**Files:**
- Modify: `components/GitHubActivity.tsx`, `components/ContributionGrid.tsx` (and fallback markup as needed)

**Steps:**
- [ ] Module region: `aria-label="GitHub activity"` (or include total when known, e.g. `GitHub activity, N contributions in the last year`).
- [ ] Fallback one-liner wrapper: `role="status"` (same idea as old `GitHubSlot`).
- [ ] Grid scroller: ensure keyboard users can move past it; if the scroller is focusable (`tabIndex={0}`), use visible focus ring (`focus-visible:outline` accent). Prefer not requiring focus on every cell.
- [ ] Confirm pin-to-recent technique does not use animated `scrollTo` under `prefers-reduced-motion: reduce` (CSS approach from Task 5 satisfies this).
- [ ] No decorative motion on cells.

**Verify:**
```bash
npm run dev
```
Keyboard: Tab from Now heading through module into log entries without trap. Fallback path (Task 10) exposes `role="status"`.
Screen reader smoke (VoiceOver optional): region announced as GitHub activity.

**Done when:** Labels/status/reduced-motion rules from the design are implemented.

---

### Task 10: Manual verification checklist

**Goal:** Prove real data, mobile scroll, fallback, no client GitHub calls, and full-page health before the revalidate switch.

**Files:**
- None required (verification only). Fix bugs in prior task files if checklist fails.

**Steps:**
- [ ] **Real data:** With valid `.env.local` token, hard-refresh homepage — grid matches recent GitHub activity texture; commits look like real public push messages.
- [ ] **Mobile scroll:** ~375–390px width — recent weeks visible; scroll reveals older weeks; page itself does not horizontally overflow.
- [ ] **MANUAL STEP (user) — bad token fallback:**
  1. Stop the dev server.
  2. In `.env.local`, set `GITHUB_TOKEN=invalid` (or temporarily rename the var).
  3. Delete Next cache if needed so you are not only seeing stale success: remove `.next` then `npm run dev`.
  4. Load homepage — expect muted `GitHub activity unavailable` (or partial UI only if one half somehow still works); site must not crash.
  5. Restore the real token; restart dev; confirm module recovers (after a successful fetch / with cache).
- [ ] **No client GitHub calls:** DevTools → Network → filter `github` — reload homepage. Expect **no** browser requests to `api.github.com` or `graphql`. (Server-side fetch will not appear as a document request from the browser.)
- [ ] **Rest of page:** Hero, Projects, Writing, etc. still render; `npm run build` succeeds.
- [ ] **MANUAL STEP (user) — Vercel env:** Confirm `GITHUB_TOKEN` is (or will be) set in the Vercel project dashboard before deploying this branch. Local-only env is not enough for production ISR.

**Verify:**
```bash
npm run build
npm run dev
```
All checklist bullets above pass.

**Done when:** Checklist complete; fallback and network constraints confirmed.

---

### Task 11: Switch `revalidate` from `3600` to `21600`

**Goal:** Intentional production interval (6 hours) before merge/deploy — not left at hourly forever.

**Files:**
- Modify: `lib/github.ts` — every GitHub `fetch` `next.revalidate` value `3600` → `21600`

**Steps:**
- [ ] Search the repo for `revalidate: 3600` (and string forms) under GitHub fetch helpers; update to `21600`.
- [ ] Do **not** change unrelated revalidate settings if any appear later elsewhere.
- [ ] Short comment near the constant: `// 6h — was 3600 during build/verify; see docs/github-activity-module-design.md §5`.

**Verify:**
```bash
rg "revalidate" lib/github.ts
```
Expected: `21600` only for these fetches (no remaining `3600` in this module).
```bash
npm run build
```
Expected: success.

**Done when:** Module revalidates every 6 hours; this is the last implementation task before merge.

---

## Suggested commit cadence (you run git)

One commit per task is ideal, e.g. `chore: add local GITHUB_TOKEN setup notes`, `feat: add lib/github activity fetch`, `refactor: ShippingLog server shell`, … You own all commits and branching.

## Out of scope reminder

Do not implement in any task: log interleaving / `source: 'github'` wiring, real SHAs on log markers, tooltips, dark-theme green ramp, language stats, stars, streaks, per-repo breakdowns, private counts, snk/ghchart/readme-stats embeds, client-side GitHub fetching.

Optional later housekeeping (not this plan): patch parent `docs/design.md` §§5/11 callouts listed in the module design §11.

---

## Plan self-review

| Design requirement | Task(s) |
|--------------------|---------|
| `GITHUB_TOKEN` local + never committed | 1 |
| Vercel env reminder | 1, 10 |
| `lib/github.ts` parallel GraphQL + REST, typed | 2 |
| `revalidate: 3600` while building | 2 |
| `ShippingLog` server shell + client show-more child | 3 |
| `--color-contrib-*` ramp + desktop grid | 4 |
| Mobile horizontal scroll, pin recent, `overscroll-x-contain` | 5 |
| Recent 2–3 commits UI | 6 |
| Stale cache / muted fallback / partial success | 7, 10 |
| Replace `GitHubSlot` in place | 8 |
| aria-label, `role="status"`, reduced-motion | 9 |
| Manual verification checklist | 10 |
| Switch to `revalidate: 21600` before merge | 11 |
| No log interleaving / vanity stats / embeds | Global + out-of-scope |

No open product decisions remain; design doc wins on conflicts.
