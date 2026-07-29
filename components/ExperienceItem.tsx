"use client";

import { useId, useState } from "react";
import type { ExperienceItem as ExperienceRole } from "@/data/experience";
import { Chip } from "./Chip";

type ExperienceItemProps = {
  item: ExperienceRole;
};

export function ExperienceItem({ item }: ExperienceItemProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  const dates = `${item.start}–${item.end}`;
  const meta = item.location ? `${dates} · ${item.location}` : dates;

  return (
    <article className="rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="group w-full rounded-sm p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-body text-base font-medium text-text sm:text-[1.0625rem]">
            {item.company}
          </h3>
          <p className="font-body text-sm text-text-muted">{meta}</p>
        </div>

        <p className="mt-0.5 font-body text-sm text-text-muted sm:text-base">
          {item.role}
        </p>

        {item.summary ? (
          <p className="mt-1.5 font-body text-sm leading-relaxed text-text-muted">
            {item.summary}
          </p>
        ) : null}

        {item.tech.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {item.tech.map((tech) => (
              <li key={tech}>
                <Chip label={tech} />
              </li>
            ))}
          </ul>
        ) : null}
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="list-disc space-y-2 border-t border-border py-3 pr-4 pb-4 pl-8 sm:pr-5 sm:pb-5 sm:pl-9">
            {item.bullets.map((bullet) => (
              <li
                key={bullet}
                className="font-body text-sm leading-relaxed text-text sm:text-base"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
