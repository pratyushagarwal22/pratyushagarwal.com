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
      <div className="p-4 sm:p-5">
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

        <div className="mt-3">
          <ExternalLink
            href={certification.verifyUrl}
            eventName="certification_verify"
            eventData={{
              issuer: certification.issuer,
              title: certification.title,
            }}
            className="font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Verify credential
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}

function ExpandableCard({ certification }: { certification: Certification }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  const dateMeta = certification.targetDate
    ? `${certification.date} \u00B7 ${certification.targetDate}`
    : certification.date;

  return (
    <article className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="group w-full rounded-sm p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
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

        <p className="mt-3 font-body text-sm text-accent underline-offset-4 group-hover:underline">
          {expanded ? "Hide courses" : "View courses"}
        </p>
      </button>

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
  Completed: "\u2713",
  "In Progress": "\u25D1",
  "Not Started": "\u25CB",
};

function SubCourseItem({ course }: { course: SubCourse }) {
  const glyph = STATUS_GLYPH[course.status] ?? "";

  return (
    <li className="flex items-start gap-2">
      <span
        className="mt-0.5 w-4 shrink-0 text-center font-mono text-sm leading-relaxed text-text-muted"
        aria-hidden="true"
      >
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
              {" \u00B7 "}
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
