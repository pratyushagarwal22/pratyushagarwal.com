# Certifications Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Certifications section with 7 cards (6 static, 1 expandable), show-more behavior, and nav integration, matching the visual language of the existing Publications and Experience sections.

**Architecture:** A `data/certifications.ts` data layer feeds a `Certifications` section component (mirrors `Experience.tsx`), which renders `CertificationCard` components. Static cards are non-expandable articles with skill chips and a verify link. The single expandable card (LangChain) uses the same button/grid/inert expand pattern as `PublicationCard` and `ExperienceItem`, with a nested sub-course list.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS

**Design doc:** `docs/certifications-section-design.md` (source of truth for all decisions)

## Global Constraints

- Do not modify any existing shared component (`Chip`, `ShowMoreButton`, `ExternalLink`, `EntryHeader`, `SectionHeading`, `ContentContainer`).
- Reuse existing component APIs exactly — import and call them, never fork them.
- All card chrome classes must match the existing pattern: `hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]`.
- No credential IDs in the data or UI. No logos/icons. No filtering. No dark theme. No separate routing.
- The site must build and run cleanly (`npm run build` passes) after every task.
- Do not run git — the owner commits manually.

---

### Task 1: Data Layer

**What it builds:** The typed data file with all 7 certification entries and the LangChain sub-courses. No UI — this is the foundation that all later tasks import.

**Files:**
- Create: `data/certifications.ts`

**Interfaces:**
- Consumes: Nothing.
- Produces:
  - `CourseStatus` type: `"Completed" | "In Progress" | "Not Started"`
  - `SubCourse` type: `{ title: string; status: CourseStatus; verifyUrl?: string }`
  - `Certification` type: `{ id: string; title: string; issuer: string; date: string; skills: string[]; verifyUrl: string; status?: string; expiry?: string; expandable?: boolean; targetDate?: string; subCourses?: SubCourse[] }`
  - `certifications` array: `Certification[]` — 7 entries, reverse-chronological order

- [ ] **Step 1: Create `data/certifications.ts` with types and all 7 entries**

```typescript
export type CourseStatus = "Completed" | "In Progress" | "Not Started";

export type SubCourse = {
  title: string;
  status: CourseStatus;
  verifyUrl?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  verifyUrl: string;
  status?: string;
  expiry?: string;
  expandable?: boolean;
  targetDate?: string;
  subCourses?: SubCourse[];
};

export const certifications: Certification[] = [
  {
    id: "lcae",
    title: "LangChain Certified Agent Engineer",
    issuer: "LangChain Academy",
    date: "Present",
    skills: [
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-agent Systems",
      "MCP",
    ],
    verifyUrl: "https://academy.langchain.com/pages/certifications-lcae",
    status: "In Progress",
    expandable: true,
    targetDate: "Targeting Sept 2026",
    subCourses: [
      {
        title: "Foundation: Introduction to LangChain - Python",
        status: "Completed",
        verifyUrl: "https://academy.langchain.com/certificates/2qsahnhbj6",
      },
      {
        title: "Foundation: Introduction to Deep Agents",
        status: "In Progress",
      },
      {
        title: "Foundation: Building Reliable Agents",
        status: "Not Started",
      },
      {
        title: "Foundation: Monitoring Production Agents",
        status: "Not Started",
      },
      {
        title: "Foundation: Introduction to LangSmith Deployment",
        status: "Not Started",
      },
    ],
  },
  {
    id: "power-bi",
    title: "Microsoft Power BI Desktop for Business Intelligence",
    issuer: "Udemy",
    date: "Apr 2025",
    skills: ["Microsoft Power BI", "ETL", "Data Visualization", "Data Modeling"],
    verifyUrl:
      "https://www.udemy.com/certificate/UC-6848d20c-128a-4867-9d5f-eda90e4a825c/",
  },
  {
    id: "google-pm",
    title: "Google Project Management Specialization",
    issuer: "Google",
    date: "Jul 2022",
    skills: [
      "Project Management",
      "Agile",
      "Scrum",
      "Stakeholder Management",
    ],
    verifyUrl:
      "https://www.credly.com/badges/d9b03e16-595a-498c-8d11-ad470b1834d9",
  },
  {
    id: "ceh",
    title: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "Mar 2021",
    expiry: "Expired Mar 2024",
    skills: [
      "Penetration Testing",
      "Network Security",
      "Vulnerability Assessment",
      "Reconnaissance",
    ],
    verifyUrl:
      "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=5dHmeEnKUrBnh7mt9oqBwfvv9l7AGGmu+QovpeMkQUM=",
  },
  {
    id: "gcp-networking",
    title: "Networking in Google Cloud",
    issuer: "Coursera",
    date: "Jun 2020",
    skills: [
      "Google Cloud Platform (GCP)",
      "Cloud Networking",
      "Cloud Computing",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/NQAHX82H3L5A",
  },
  {
    id: "gke",
    title: "Architecting with Google Kubernetes Engine",
    issuer: "Coursera",
    date: "Jun 2020",
    skills: [
      "Google Cloud Platform (GCP)",
      "Kubernetes",
      "Docker",
      "DevOps",
      "Cloud Computing",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/BT32K76FLVCA",
  },
  {
    id: "google-it",
    title: "Google IT Support",
    issuer: "Coursera",
    date: "Jul 2019",
    skills: [
      "IT Support",
      "Troubleshooting",
      "Networking",
      "System Administration",
    ],
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/specialization/KD6SWTXS3YUY",
  },
];
```

- [ ] **Step 2: Verify the data file type-checks**

Run: `npx tsc --noEmit`

Expected: No errors. The file exports clean types and a well-typed array. If there are pre-existing type errors elsewhere in the project, confirm none originate from `data/certifications.ts`.

- [ ] **Step 3: Spot-check the data against the design doc**

Manually verify:
1. There are exactly 7 entries in the array.
2. The order is reverse-chronological (LangChain `"Present"` first, Google IT `"Jul 2019"` last).
3. The LangChain entry has `expandable: true`, `targetDate: "Targeting Sept 2026"`, `status: "In Progress"`, and 5 sub-courses.
4. The CEH entry has `expiry: "Expired Mar 2024"`.
5. Every entry has a non-empty `skills` array and a `verifyUrl`.
6. No entry contains a credential ID field.

---

### Task 2: Static Certification Card + Section Wrapper

**What it builds:** The `CertificationCard` component (static variant only — the expandable variant is Task 4) and the `Certifications` section wrapper. After this task, you can temporarily import `<Certifications />` to see 6 static cards rendering with show-more. The LangChain card will also render, but as a static card (its expandable behavior comes in Task 4).

**Files:**
- Create: `components/CertificationCard.tsx`
- Create: `components/Certifications.tsx`

**Interfaces:**
- Consumes:
  - `Certification` type and `certifications` array from `data/certifications.ts` (Task 1)
  - `Chip` from `components/Chip.tsx` — `<Chip label={string} />` (default variant) and `<Chip label={string} variant="flagship" />` (status chip)
  - `EntryHeader` from `components/EntryHeader.tsx` — `<EntryHeader title={ReactNode} meta={ReactNode} />`
  - `ExternalLink` from `components/ExternalLink.tsx` — `<ExternalLink href={string} eventName={string} eventData={object} className={string}>children</ExternalLink>`
  - `ShowMoreButton` from `components/ShowMoreButton.tsx` — `<ShowMoreButton expanded={boolean} count={number} controlsId={string} onClick={() => void} />`
  - `SectionHeading` from `components/SectionHeading.tsx` — `<SectionHeading id={string}>children</SectionHeading>`
  - `contentContainerClassName`, `sectionScrollMarginClassName` from `components/ContentContainer.tsx`
- Produces:
  - `CertificationCard` component: `({ certification: Certification }) => JSX.Element`
  - `Certifications` component: `() => JSX.Element`

- [ ] **Step 1: Create `components/CertificationCard.tsx` — static variant**

This file renders a single static certification card. For now, every card renders as static (non-expandable). Task 4 will add the expandable branch.

```tsx
"use client";

import type { Certification } from "@/data/certifications";
import { Chip } from "./Chip";
import { EntryHeader } from "./EntryHeader";
import { ExternalLink } from "./ExternalLink";

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  const dateMeta = certification.expiry
    ? `${certification.date} · ${certification.expiry}`
    : certification.date;

  return (
    <article className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <EntryHeader
          title={
            <h3 className="break-words font-body text-base font-medium text-text sm:text-[1.0625rem]">
              {certification.title}
            </h3>
          }
          meta={dateMeta}
        />

        <p className="mt-0.5 break-words font-body text-sm text-text-muted sm:text-base">
          {certification.issuer}
        </p>

        {certification.skills.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {certification.skills.map((skill) => (
              <li key={skill} className="max-w-full">
                <Chip label={skill} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <ExternalLink
          href={certification.verifyUrl}
          eventName="certification_verify"
          eventData={{
            issuer: certification.issuer,
            title: certification.title,
          }}
          className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Verify credential
        </ExternalLink>
      </div>
    </article>
  );
}
```

Key patterns being followed:
- Card chrome classes: identical to `PublicationCard` line 19.
- `EntryHeader` usage: same as `PublicationCard` lines 78–90 (title as `<h3>`, meta as string/node).
- Issuer line: same position as `item.role` in `ExperienceItem` line 37.
- Skill chips: same `<ul>` + `<Chip>` pattern as `ExperienceItem` lines 47–55.
- Verify link: same `ExternalLink` + className as "Read paper" in `PublicationCard` lines 37–47.
- The `p-4 pb-0 sm:p-5 sm:pb-0` / `px-4 pb-4 pt-3 sm:px-5 sm:pb-5` split matches `PublicationCard`'s header/link separation.

- [ ] **Step 2: Create `components/Certifications.tsx` — section wrapper**

```tsx
"use client";

import { useState } from "react";
import { certifications } from "@/data/certifications";
import { contentContainerClassName, sectionScrollMarginClassName } from "./ContentContainer";
import { CertificationCard } from "./CertificationCard";
import { SectionHeading } from "./SectionHeading";
import { ShowMoreButton } from "./ShowMoreButton";

const DEFAULT_VISIBLE = 4;

export function Certifications() {
  const [showAll, setShowAll] = useState(false);

  const total = certifications.length;
  const hiddenCount = Math.max(0, total - DEFAULT_VISIBLE);
  const visible = showAll
    ? certifications
    : certifications.slice(0, DEFAULT_VISIBLE);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className={`${contentContainerClassName} ${sectionScrollMarginClassName}`}
    >
      <SectionHeading id="certifications-heading">Certifications</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Credentials I've earned, and one I'm still working toward.
      </p>

      <ul id="certifications-list" className="mt-8 flex list-none flex-col gap-4 p-0">
        {visible.map((cert) => (
          <li key={cert.id}>
            <CertificationCard certification={cert} />
          </li>
        ))}
      </ul>

      {total > DEFAULT_VISIBLE ? (
        <ShowMoreButton
          expanded={showAll}
          count={hiddenCount}
          controlsId="certifications-list"
          onClick={() => setShowAll((v) => !v)}
        />
      ) : null}
    </section>
  );
}
```

This is a near-copy of `components/Experience.tsx`, with:
- `certifications` data import instead of `experience`.
- `CertificationCard` instead of `ExperienceItem`.
- Section id `"certifications"`, heading id `"certifications-heading"`, list id `"certifications-list"`.
- The exact intro line from the design doc.

- [ ] **Step 3: Verify the build passes**

Run: `npx tsc --noEmit`

Expected: No errors. Both new files import existing components without modification and the types align.

- [ ] **Step 4: Temporarily wire into the page for visual verification**

Temporarily add to `app/page.tsx` to see the cards. Add the import and the component between `<Experience />` and `<Writing />`:

```tsx
import { Certifications } from "@/components/Certifications";
```

```tsx
          <Experience />
          <Certifications />
          <Writing />
```

Run: `npm run dev`

Verify in the browser:
1. The Certifications section appears between Experience and Writing.
2. The section heading reads "Certifications" and the intro reads "Credentials I've earned, and one I'm still working toward."
3. 4 cards are visible initially. The "Show more" button reads "Show more" with a screen-reader suffix of ", reveal 3 more items".
4. Clicking "Show more" reveals the remaining 3 cards (7 total). The button text changes to "Show less".
5. Every card shows: title on the left, date on the right (via `EntryHeader`), issuer below the title, skill chips, and a "Verify credential" link.
6. The CEH card (entry #4, visible after "Show more") shows `"Mar 2021 · Expired Mar 2024"` as its date meta.
7. The LangChain card (#1, visible by default) renders as a static card for now — title, "Present" date, issuer, chips, verify link. It does NOT expand yet; that's Task 4.
8. Each "Verify credential" link opens the correct URL in a new tab.
9. Card hover shows the lift/border-darken effect.

**Then revert the temporary `app/page.tsx` changes** (remove the import and `<Certifications />`) so the page is back to its original state. This keeps the task independently committable — the real page wiring happens in Task 3.

---

### Task 3: Wire Into Page + Add Nav Item

**What it builds:** The permanent integration — `<Certifications />` in `app/page.tsx` and the nav item in `SiteHeader.tsx`. After this task, the Certifications section is live on the site with working nav scroll.

**Files:**
- Modify: `app/page.tsx` (add import at line 3, add component between lines 23–24)
- Modify: `components/SiteHeader.tsx` (add entry to `navItems` array between lines 11–12)

**Interfaces:**
- Consumes:
  - `Certifications` component from `components/Certifications.tsx` (Task 2)
- Produces: Nothing new. This task wires existing pieces together.

- [ ] **Step 1: Add the Certifications import and component to `app/page.tsx`**

Add the import (alphabetically, after the existing imports):

```tsx
import { Certifications } from "@/components/Certifications";
```

Add the component between `<Experience />` and `<Writing />` in the JSX:

```tsx
          <Experience />
          <Certifications />
          <Writing />
```

The full render order becomes: `Hero → ShippingLog → StatsStrip → Projects → Publications → Experience → Certifications → Writing → About`.

- [ ] **Step 2: Add the nav item to `components/SiteHeader.tsx`**

In the `navItems` array (currently lines 7–14), add a new entry between `{ href: "#experience", label: "Experience" }` and `{ href: "#writing", label: "Writing" }`:

The updated array:

```typescript
const navItems = [
  { href: "#now", label: "Now" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#writing", label: "Writing" },
  { href: "#about", label: "About" },
] as const;
```

This array is rendered by both the desktop nav (`<nav aria-label="Primary">`) and the mobile hamburger menu, so both get the new item automatically.

- [ ] **Step 3: Verify the build passes**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 4: Verify section placement and scroll**

Run: `npm run dev`

1. The page order is: Hero → Now → StatsStrip → Projects → Publications → Experience → **Certifications** → Writing → About.
2. Clicking "Certifications" in the desktop nav scrolls to the section with the correct scroll margin (header doesn't overlap the heading).
3. Clicking "Certifications" in the mobile hamburger menu scrolls to the section and closes the menu.

- [ ] **Step 5: Verify desktop nav wrapping at narrow widths**

Open browser dev tools. Resize the viewport through these widths while watching the desktop nav bar (visible at ≥768px):

- 768px (the `md:` breakpoint where the desktop nav appears)
- 800px
- 900px
- 1024px

**Check:** The 7 nav items + Resume link all fit on one row without wrapping or overlapping at every width. The items use `gap-x-5 sm:gap-x-6` spacing.

**If wrapping occurs:** Tighten `gap-x` from `gap-x-5 sm:gap-x-6` to `gap-x-4 sm:gap-x-5`, or abbreviate "Certifications" to "Certs" in the nav only (not the section heading). Decide based on what looks best. Document the change.

- [ ] **Step 6: Verify mobile hamburger menu layout**

At a viewport width <768px:
1. Open the hamburger menu.
2. The menu renders `navItems` in a `grid-cols-2` grid. With 7 items, the last row has 1 item (odd trailing item). Confirm this looks acceptable — the single item should right-align in its grid cell, consistent with the rest.
3. All 7 items are visible and tappable.
4. Tapping "Certifications" scrolls to the section and closes the menu.

---

### Task 4: Expandable LangChain Card

**What it builds:** The expandable card variant for the LangChain certification. This is the one genuinely new/custom piece. After this task, the LangChain card shows the "In Progress" chip, both "Present" and "Targeting Sept 2026" on the right, and expands to reveal 5 nested sub-courses with status glyphs and a verify link on the completed course.

**Files:**
- Modify: `components/CertificationCard.tsx` (add expandable branch, sub-course rendering)

**Interfaces:**
- Consumes:
  - `Certification`, `SubCourse`, `CourseStatus` types from `data/certifications.ts` (Task 1)
  - `Chip` from `components/Chip.tsx` — `<Chip label="In Progress" variant="flagship" />`
  - `EntryHeader` from `components/EntryHeader.tsx` — `<EntryHeader title={ReactNode} meta={ReactNode} />`
  - `ExternalLink` from `components/ExternalLink.tsx`
  - `useId`, `useState` from React
- Produces: Updated `CertificationCard` that renders expandable cards when `certification.expandable` is true.

- [ ] **Step 1: Refactor `CertificationCard` to branch on `expandable`**

Replace the contents of `components/CertificationCard.tsx` with the full component that handles both card types. The static card code from Task 2 is extracted into a private `StaticCard` sub-component. A new `ExpandableCard` sub-component handles the LangChain card.

```tsx
"use client";

import { useId, useState } from "react";
import type { Certification, SubCourse } from "@/data/certifications";
import { Chip } from "./Chip";
import { EntryHeader } from "./EntryHeader";
import { ExternalLink } from "./ExternalLink";

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  if (certification.expandable) {
    return <ExpandableCard certification={certification} />;
  }
  return <StaticCard certification={certification} />;
}

function StaticCard({ certification }: { certification: Certification }) {
  const dateMeta = certification.expiry
    ? `${certification.date} · ${certification.expiry}`
    : certification.date;

  return (
    <article className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <EntryHeader
          title={
            <h3 className="break-words font-body text-base font-medium text-text sm:text-[1.0625rem]">
              {certification.title}
            </h3>
          }
          meta={dateMeta}
        />

        <p className="mt-0.5 break-words font-body text-sm text-text-muted sm:text-base">
          {certification.issuer}
        </p>

        {certification.skills.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {certification.skills.map((skill) => (
              <li key={skill} className="max-w-full">
                <Chip label={skill} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <ExternalLink
          href={certification.verifyUrl}
          eventName="certification_verify"
          eventData={{
            issuer: certification.issuer,
            title: certification.title,
          }}
          className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Verify credential
        </ExternalLink>
      </div>
    </article>
  );
}

function ExpandableCard({ certification }: { certification: Certification }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <article className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="group w-full rounded-sm p-4 pb-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5 sm:pb-0"
      >
        <EntryHeader
          title={
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="min-w-0 break-words font-body text-base font-semibold text-text sm:text-[1.0625rem]">
                {certification.title}
              </h3>
              {certification.status ? (
                <Chip label={certification.status} variant="flagship" />
              ) : null}
            </div>
          }
          meta={certification.date}
        />

        <div className="flex flex-col gap-y-0.5 sm:flex-row sm:items-baseline sm:gap-x-3">
          <p className="mt-0.5 min-w-0 break-words font-body text-sm text-text-muted sm:flex-1 sm:text-base">
            {certification.issuer}
          </p>
          {certification.targetDate ? (
            <p className="font-body text-sm text-text-muted sm:shrink-0 sm:whitespace-nowrap">
              {certification.targetDate}
            </p>
          ) : null}
        </div>

        {certification.skills.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {certification.skills.map((skill) => (
              <li key={skill} className="max-w-full">
                <Chip label={skill} />
              </li>
            ))}
          </ul>
        ) : null}
      </button>

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <ExternalLink
          href={certification.verifyUrl}
          eventName="certification_verify"
          eventData={{
            issuer: certification.issuer,
            title: certification.title,
          }}
          className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Verify credential
        </ExternalLink>
      </div>

      <div
        id={panelId}
        inert={!expanded ? true : undefined}
        className="expand-panel grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
            <p className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
              Courses
            </p>
            {certification.subCourses && certification.subCourses.length > 0 ? (
              <ul className="mt-3 list-none space-y-3 p-0">
                {certification.subCourses.map((course) => (
                  <SubCourseItem key={course.title} course={course} />
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

const STATUS_GLYPH: Record<string, string> = {
  Completed: "✓",
  "In Progress": "◑",
  "Not Started": "○",
};

function SubCourseItem({ course }: { course: SubCourse }) {
  const glyph = STATUS_GLYPH[course.status] ?? "";

  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 w-4 shrink-0 text-center font-mono text-sm leading-relaxed text-text-muted" aria-hidden="true">
        {glyph}
      </span>
      <div className="min-w-0">
        <p className="break-words font-body text-sm leading-relaxed text-text sm:text-base">
          {course.title}
        </p>
        <p className="font-body text-sm text-text-muted">
          {course.status}
          {course.status === "Completed" && course.verifyUrl ? (
            <>
              {" · "}
              <ExternalLink
                href={course.verifyUrl}
                eventName="certification_subcourse_verify"
                eventData={{ title: course.title }}
                className="text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Verify
              </ExternalLink>
            </>
          ) : null}
        </p>
      </div>
    </li>
  );
}
```

Key design decisions in this code:

- **Title row:** The `<div className="flex flex-wrap items-center gap-2">` wrapping `<h3>` + `<Chip>` is passed into `EntryHeader`'s `title` prop. This is the same pattern `ProjectCard` uses for Mnemo's "Flagship" chip (lines 29–38). The title uses `font-semibold` (like the Flagship project) instead of `font-medium`.
- **Issuer + target date row:** A second `flex-col sm:flex-row` div mirrors `EntryHeader`'s own layout classes so the issuer sits left and "Targeting Sept 2026" sits right-aligned. This is NOT done via `EntryHeader` (which is only used for the title row) — it's a parallel flex layout using the same responsive classes.
- **Expand mechanics:** `button` + `aria-expanded` + `aria-controls` + `grid` + `gridTemplateRows` + `inert`. Identical to `PublicationCard` lines 21–26 and 50–69, and `ExperienceItem` lines 21–26 and 58–81.
- **Sub-course list:** "Courses" label in uppercase muted text matches "Key responsibilities" in `ExperienceItem` line 66. Status glyphs are provisional (see verification step).
- **Verify link inside the expand panel:** The top-level "Verify credential" link sits outside the button (not inside it), in its own `<div>` between the button and the expand panel — matching how `PublicationCard` places "Read paper" outside the button area.

- [ ] **Step 2: Verify the build passes**

Run: `npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Verify the expandable card collapsed state**

Run: `npm run dev`

Navigate to the Certifications section. The LangChain card (first card) should display:
1. Title "LangChain Certified Agent Engineer" with an "In Progress" chip inline to its right, using the accent color (same as Mnemo's "Flagship" chip).
2. "Present" right-aligned on the same row as the title (via `EntryHeader` meta).
3. "LangChain Academy" on the left below the title, "Targeting Sept 2026" right-aligned on the same row.
4. Five skill chips: LangChain, LangGraph, Retrieval-Augmented Generation (RAG), Multi-agent Systems, MCP.
5. A "Verify credential" link pointing to `https://academy.langchain.com/pages/certifications-lcae`.
6. The card shows `cursor: pointer` on hover and the hover-raise lift effect.
7. The expand panel is not visible (collapsed).

- [ ] **Step 4: Verify the expandable card expanded state**

Click the LangChain card header area:
1. The card expands smoothly (grid row transition).
2. A `border-t border-border` separator appears.
3. The "Courses" label appears in uppercase muted text.
4. Five sub-courses appear in this exact order:
   - `✓` Foundation: Introduction to LangChain - Python — "Completed · Verify" (Verify is a link to `https://academy.langchain.com/certificates/2qsahnhbj6`)
   - `◑` Foundation: Introduction to Deep Agents — "In Progress"
   - `○` Foundation: Building Reliable Agents — "Not Started"
   - `○` Foundation: Monitoring Production Agents — "Not Started"
   - `○` Foundation: Introduction to LangSmith Deployment — "Not Started"
5. Clicking the card header again collapses the panel.

- [ ] **Step 5: Verify the status glyphs render correctly**

Check the three glyphs (`✓`, `◑`, `○`) across:
- Chrome (macOS)
- Safari (macOS)
- Firefox (macOS, if available)

**If `◑` renders inconsistently** (different size, wrong alignment, missing on some browsers): Replace all three glyphs with text-only labels. Remove the `STATUS_GLYPH` map and the `<span>` that renders `glyph`. Each sub-course already shows its status text ("Completed", "In Progress", "Not Started"), so removing the glyph prefix is safe — the status is still readable.

- [ ] **Step 6: Check the `EntryHeader` baseline alignment caveat**

On the LangChain card, visually check whether the "In Progress" chip aligns vertically with the "Present" date text on the right. `EntryHeader` uses `sm:items-baseline`.

**If the chip looks vertically misaligned** (shifted up or down relative to the date): Add `items-center` to the title wrapper `<div>` (the one containing the `<h3>` and `<Chip>`). Do NOT modify `EntryHeader.tsx`.

- [ ] **Step 7: Verify keyboard and ARIA behavior**

1. Tab to the LangChain card. It receives focus with a visible outline (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`).
2. Press Enter or Space. The card expands. `aria-expanded` changes to `true`.
3. Press Enter or Space again. The card collapses. `aria-expanded` changes to `false`.
4. When collapsed, the expand panel has `inert` — Tab should skip over all content inside it.
5. Escape does nothing special (no custom Escape handler — this matches existing expandable cards).
6. The 6 static cards are NOT focusable as buttons (they are `<article>` elements, not `<button>`s). Only the "Verify credential" `<a>` inside them receives Tab focus.

- [ ] **Step 8: Verify the other 6 static cards still work correctly**

After adding the expandable branch, confirm the 6 static cards are unchanged:
1. They render as non-expandable `<article>` elements (no button, no aria-expanded).
2. Title, date, issuer, chips, and verify links all display correctly.
3. The CEH card shows "Mar 2021 · Expired Mar 2024".
4. Show-more still works (4 visible, then 7 after clicking).

---

## Definition of Done

The Certifications section is complete when all of the following are true:

- [ ] **Data:** `data/certifications.ts` exports `Certification`, `SubCourse`, `CourseStatus` types and a 7-entry `certifications` array in reverse-chronological order. All data matches the design doc exactly.
- [ ] **Static cards:** 6 static certification cards render with title, date (+ expiry where applicable), issuer, skill chips, and a working "Verify credential" link that opens in a new tab. None are expandable.
- [ ] **Expandable card:** The LangChain card renders with the "In Progress" chip (flagship variant), "Present" date and "Targeting Sept 2026" right-aligned, and expands/collapses to show 5 sub-courses with correct statuses and a working Verify link on the completed course.
- [ ] **Show-more:** 4 cards visible by default, "Show more" reveals the remaining 3, "Show less" hides them.
- [ ] **Section intro:** Heading reads "Certifications", intro reads "Credentials I've earned, and one I'm still working toward."
- [ ] **Page placement:** `<Certifications />` renders between `<Experience />` and `<Writing />` in `app/page.tsx`.
- [ ] **Nav integration:** "Certifications" nav item appears between "Experience" and "Writing" in both desktop and mobile nav. Clicking it scrolls to the section.
- [ ] **Desktop nav wrapping:** 7 nav items + Resume fit on one row at all widths from 768px to 1200px with no wrapping or overlap.
- [ ] **Mobile nav layout:** 7 nav items in the `grid-cols-2` hamburger menu render acceptably (odd trailing item is expected).
- [ ] **Keyboard/ARIA:** The expandable card is keyboard-operable (Enter/Space to toggle), `aria-expanded` reflects state, and the collapsed panel is `inert`.
- [ ] **No shared component modifications:** `Chip`, `ShowMoreButton`, `ExternalLink`, `EntryHeader`, `SectionHeading`, and `ContentContainer` are unchanged.
- [ ] **Build passes:** `npm run build` completes with no errors.
- [ ] **Design doc and plan doc:** Both `docs/certifications-section-design.md` and `docs/certifications-section-plan.md` are present in `docs/`.
