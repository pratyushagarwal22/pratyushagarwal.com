# Certifications Section — Design Doc

## Overview

Add a **Certifications** section to the site, positioned between Experience and Writing. The section showcases professional certifications with skill chips, verify links, and one expandable card for an in-progress multi-course certification (LangChain). The visual language follows the existing Publications card style; the show-more behavior mirrors Experience.

---

## Section Basics

### Placement

The current page order in `app/page.tsx` is:

```
Hero → ShippingLog (Now) → StatsStrip → Projects → Publications → Experience → Writing → About
```

Insert the `<Certifications />` component between `<Experience />` and `<Writing />`, producing:

```
Hero → ShippingLog (Now) → StatsStrip → Projects → Publications → Experience → Certifications → Writing → About
```

### Navigation

Add a `{ href: "#certifications", label: "Certifications" }` entry to the `navItems` array in `components/SiteHeader.tsx`, placed between the existing Experience and Writing items. This covers both the desktop nav and the mobile hamburger menu (they render from the same array).

**Nav wrapping note:** Adding an 8th nav item ("Certifications") to the desktop navbar increases the risk of wrapping or crowding at common viewport widths. The implementation plan should include a verification step to check the desktop nav at 768px–1024px widths and confirm nothing wraps or overlaps. If it does, options include tightening `gap-x` or abbreviating labels; decide during the build, not here.

### Section Intro

The section heading is **"Certifications"** and the intro line is:

> Credentials I've earned, and one I'm still working toward.

### Show-More Behavior

Display the **top 4 certifications** by default. A `ShowMoreButton` reveals the remaining 3, identical to the Experience section's pattern:

- `DEFAULT_VISIBLE = 4`
- `useState(false)` for `showAll`
- Slice the certifications array; render `ShowMoreButton` when `total > DEFAULT_VISIBLE`
- `controlsId` targets the certifications `<ul>`

---

## Data Model

### File: `data/certifications.ts`

```typescript
export type CourseStatus = "Completed" | "In Progress" | "Not Started";

export type SubCourse = {
  title: string;
  status: CourseStatus;
  verifyUrl?: string;       // only present when status is "Completed"
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;             // human-readable; supports ranges ("Mar 2021, Expired Mar 2024") and "Present"
  skills: string[];
  verifyUrl: string;
  status?: string;          // e.g. "In Progress" — drives the accent chip; omit for completed certs
  expiry?: string;          // e.g. "Expired Mar 2024" — rendered inline with the date
  expandable?: boolean;     // true only for the LangChain card
  targetDate?: string;      // e.g. "Targeting Sept 2026" — shown on expandable cards
  subCourses?: SubCourse[]; // nested course list for expandable cards
};
```

Design notes:

- **No credential IDs.** Verification is link-only; IDs are deliberately omitted from both the type and the rendered UI.
- **`status` is optional.** Static (completed) certifications omit it. When present, it renders as an accent chip (see "In Progress" chip below).
- **`expiry` is a display string**, not a date. Rendered after the main date, e.g. "Mar 2021 · Expired Mar 2024".
- **`expandable`, `targetDate`, `subCourses`** are only populated on the LangChain entry. The component checks `expandable` to decide which card type to render.

### Ordering

The exported `certifications` array is in **reverse-chronological order** (newest first), matching Experience and Publications.

---

## The 7 Certifications (data entries)

| # | id | title | issuer | date | status | expiry | skills | verifyUrl |
|---|---|---|---|---|---|---|---|---|
| 1 | `lcae` | LangChain Certified Agent Engineer | LangChain Academy | Present | In Progress | — | LangChain, LangGraph, Retrieval-Augmented Generation (RAG), Multi-agent Systems, MCP | https://academy.langchain.com/pages/certifications-lcae |
| 2 | `power-bi` | Microsoft Power BI Desktop for Business Intelligence | Udemy | Apr 2025 | — | — | Microsoft Power BI, ETL, Data Visualization, Data Modeling | https://www.udemy.com/certificate/UC-6848d20c-128a-4867-9d5f-eda90e4a825c/ |
| 3 | `google-pm` | Google Project Management Specialization | Google | Jul 2022 | — | — | Project Management, Agile, Scrum, Stakeholder Management | https://www.credly.com/badges/d9b03e16-595a-498c-8d11-ad470b1834d9 |
| 4 | `ceh` | Certified Ethical Hacker | EC-Council | Mar 2021 | — | Expired Mar 2024 | Penetration Testing, Network Security, Vulnerability Assessment, Reconnaissance | https://aspen.eccouncil.org/VerifyBadge?type=certification&a=5dHmeEnKUrBnh7mt9oqBwfvv9l7AGGmu+QovpeMkQUM= |
| 5 | `gcp-networking` | Networking in Google Cloud | Coursera | Jun 2020 | — | — | Google Cloud Platform (GCP), Cloud Networking, Cloud Computing | https://www.coursera.org/account/accomplishments/specialization/NQAHX82H3L5A |
| 6 | `gke` | Architecting with Google Kubernetes Engine | Coursera | Jun 2020 | — | — | Google Cloud Platform (GCP), Kubernetes, Docker, DevOps, Cloud Computing | https://www.coursera.org/account/accomplishments/specialization/BT32K76FLVCA |
| 7 | `google-it` | Google IT Support | Coursera | Jul 2019 | — | — | IT Support, Troubleshooting, Networking, System Administration | https://www.coursera.org/account/accomplishments/specialization/KD6SWTXS3YUY |

### LangChain Sub-Courses (entry #1, `subCourses` field)

| Order | title | status | verifyUrl |
|---|---|---|---|
| 1 | Foundation: Introduction to LangChain - Python | Completed | https://academy.langchain.com/certificates/2qsahnhbj6 |
| 2 | Foundation: Introduction to Deep Agents | In Progress | — |
| 3 | Foundation: Building Reliable Agents | Not Started | — |
| 4 | Foundation: Monitoring Production Agents | Not Started | — |
| 5 | Foundation: Introduction to LangSmith Deployment | Not Started | — |

The LangChain entry also carries `expandable: true` and `targetDate: "Targeting Sept 2026"`.

---

## Two Card Types

### 1. Static Certification Card (6 of 7)

A non-expandable card that visually matches the Publications card style. Structure:

```
┌──────────────────────────────────────────────────────┐
│  Title                                    Date       │
│  Issuer                        (· Expired Mar 2024)  │
│                                                      │
│  [skill] [skill] [skill] [skill]                     │
│                                                      │
│  Verify credential ↗                                 │
└──────────────────────────────────────────────────────┘
```

- **Card chrome:** Same `rounded-sm border border-border bg-surface hover-raise` classes as `PublicationCard`.
- **Title row:** Uses `EntryHeader` with the certification title as `title` and the date as `meta`. If `expiry` is present, append it after the date with a ` · ` separator.
- **Issuer:** Rendered below the title in `text-text-muted`, same position as `publication.summary` in Publications or `item.role` in Experience.
- **Skill chips:** `<Chip label={skill} />` (default variant, sm size), rendered in a flex-wrap `<ul>` exactly as Experience does it.
- **Verify link:** An `<ExternalLink>` with label **"Verify credential"**, styled identically to the "Read paper" link in Publications: `text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline`. Analytics event: `eventName="certification_verify"`.

This card is **not** a `<button>` — it has no expand/collapse behavior. The entire card is a static `<article>` with internal link.

### 2. Expandable LangChain Card (1 of 7)

The LangChain card is the only expandable card. Its collapsed state looks like a static card with these additions:

```
┌──────────────────────────────────────────────────────────┐
│  LangChain Certified Agent Engineer  [In Progress]       │
│  LangChain Academy                              Present  │
│                                       Targeting Sept 2026│
│                                                          │
│  [LangChain] [LangGraph] [RAG] [Multi-agent] [MCP]      │
│                                                          │
│  Verify credential ↗                                     │
└──────────────────────────────────────────────────────────┘
```

#### "In Progress" Chip

Styled like the Mnemo "Flagship" chip: `<Chip label="In Progress" variant="flagship" />`. This reuses the existing `flagship` variant from `Chip.tsx` which applies `border-accent/30 bg-accent/5 text-accent`. The chip sits inline next to the title, same as Flagship sits next to "Mnemo" in `ProjectCard`.

#### Right-Aligned Meta Column (Date + Target Date)

The right side of the `EntryHeader` row shows `"Present"` as the primary meta value. Below the issuer line, the target date `"Targeting Sept 2026"` is rendered right-aligned in `text-sm text-text-muted`, stacking underneath the date on the right side of the card. Layout:

- **Top row (via `EntryHeader`):** Title + In Progress chip on the left, `"Present"` on the right.
- **Second row:** Issuer on the left, `"Targeting Sept 2026"` right-aligned on the right. The target date uses the same muted styling as the date above it.

This keeps the right column consistent with how dates sit in Publications and Experience cards, while surfacing the target date without cluttering the left side.

#### `EntryHeader` Reuse (Confirmed)

`EntryHeader` needs **no modification**. Its `title` prop is `ReactNode`, so the LangChain card passes a wrapper `<div>` containing the `<h3>` + `<Chip label="In Progress" variant="flagship" />` into the `title` slot, with `"Present"` as the `meta` prop. The same `EntryHeader` is used for static cards (just an `<h3>` in `title`, date string in `meta`).

**Visual caveat to verify during the build:** `EntryHeader` uses `sm:items-baseline` on its outer flex container. The chip's `py-0.5` padding and border should baseline-align fine with the meta text, but if the chip looks vertically misaligned, switch to `sm:items-center` on the LangChain card's title wrapper `<div>` only — not on `EntryHeader` itself.

#### Expand Affordance

The LangChain card uses the **same implicit expand affordance** as every other expandable card on the site (Projects, Publications, Experience):

- The card header area is a `<button>`, so the browser renders `cursor: pointer` automatically.
- The card has `hover-raise` + `hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[...]` for a lift-and-darken effect on hover.
- `aria-expanded` on the button announces expand state to screen readers.
- The section intro line ("Credentials I've earned, and one I'm still working toward.") provides the human-readable context.

No per-card "click to expand" text, no chevron, no triangle glyph. This matches the existing site convention exactly.

#### Expand/Collapse Mechanics

Identical to the pattern used in `PublicationCard` and `ExperienceItem`:

- The card header area is a `<button>` with `aria-expanded` and `aria-controls`.
- The nested panel uses `grid` + `gridTemplateRows: expanded ? "1fr" : "0fr"` for the CSS-only expand animation.
- The panel gets `inert` when collapsed.

#### Expanded Content: Sub-Course List

When expanded, a bordered panel drops down (matching the `border-t border-border` separator used in Experience and Publications). Inside:

```
┌─ (expanded panel) ────────────────────────────────────┐
│  Courses                                              │
│                                                       │
│  ✓  Foundation: Introduction to LangChain - Python    │
│     Completed · Verify ↗                              │
│                                                       │
│  ◑  Foundation: Introduction to Deep Agents           │
│     In Progress                                       │
│                                                       │
│  ○  Foundation: Building Reliable Agents              │
│     Not Started                                       │
│                                                       │
│  ○  Foundation: Monitoring Production Agents          │
│     Not Started                                       │
│                                                       │
│  ○  Foundation: Introduction to LangSmith Deployment  │
│     Not Started                                       │
└───────────────────────────────────────────────────────┘
```

- **Section label:** "Courses" in uppercase tracking-wide muted text, matching "Key responsibilities" in `ExperienceItem`.
- **Status glyphs:** Simple text glyphs — `✓` for Completed, `◑` for In Progress, `○` for Not Started. These are plain text, not SVGs or icon libraries. **Provisional:** These glyphs should be evaluated visually during the build. The `◑` half-circle in particular may render inconsistently across fonts and platforms; if it looks off, swap all three glyphs for text-only status labels (e.g. just the status string with no glyph prefix).
- **Status labels:** Rendered in `text-sm text-text-muted`. "Completed" courses get an inline "Verify" `ExternalLink` after the status.
- **Sub-courses are not individually expandable.** They are a flat list.
- **Ordering is fixed** as specified in the data (not sorted by status).

---

## Component Architecture

### Reused Existing Components

| Component | From | Usage |
|---|---|---|
| `Chip` | `components/Chip.tsx` | Skill chips (default variant) and "In Progress" chip (flagship variant) |
| `ShowMoreButton` | `components/ShowMoreButton.tsx` | Show/hide remaining certifications beyond the initial 4 |
| `ExternalLink` | `components/ExternalLink.tsx` | "Verify credential" links and sub-course verify links |
| `ContentContainer` / helpers | `components/ContentContainer.tsx` | `contentContainerClassName` + `sectionScrollMarginClassName` on the `<section>` |
| `SectionHeading` | `components/SectionHeading.tsx` | Section title "Certifications" |
| `EntryHeader` | `components/EntryHeader.tsx` | Title + date layout on each card (no modifications needed) |

### New Components

| Component | File | Purpose |
|---|---|---|
| `Certifications` | `components/Certifications.tsx` | Section wrapper — imports data, manages show-more state, renders card list. Follows the `Experience.tsx` pattern exactly. |
| `CertificationCard` | `components/CertificationCard.tsx` | Renders a single certification. Contains the branching logic: if `cert.expandable`, render the expandable variant; otherwise, render the static variant. Both variants live in this file as private sub-components. |

The expandable LangChain card is the one genuinely new/custom piece — the static card is a simpler remix of existing patterns (Publications card + Experience chips). The expandable card should be called out as its own build task during implementation planning.

---

## File Changes Summary

| File | Change |
|---|---|
| `data/certifications.ts` | **New.** Exports `Certification`, `SubCourse`, `CourseStatus` types and the `certifications` array. |
| `components/Certifications.tsx` | **New.** Section component. |
| `components/CertificationCard.tsx` | **New.** Static + expandable card rendering. |
| `components/SiteHeader.tsx` | **Edit.** Add `{ href: "#certifications", label: "Certifications" }` to `navItems` between Experience and Writing. |
| `app/page.tsx` | **Edit.** Import and render `<Certifications />` between `<Experience />` and `<Writing />`. |

No changes to existing shared components (`Chip`, `ShowMoreButton`, `ExternalLink`, `EntryHeader`, `SectionHeading`, `ContentContainer`).

---

## Out of Scope

- **No credential IDs displayed.** Verification is link-only by design.
- **No logos or icons.** No issuer logos, no certification badge images. Text and chips only.
- **No filtering or search.** Certifications render as a flat, ordered list.
- **No dark theme.** Match the existing site's light-only styling.
- **No separate page or routing.** Certifications is an inline section on the single-page site.
- **No animation beyond expand/collapse.** The card hover-raise and expand panel transitions are inherited from existing patterns.
