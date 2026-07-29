"use client";

import { useId, useState } from "react";
import type { LogEntry as LogEntryData } from "@/data/log";
import { Chip } from "./Chip";
import { ExternalLink } from "./ExternalLink";

type LogEntryProps = {
  entry: LogEntryData;
  /** Hide the connecting rule below the last visible entry */
  isLast?: boolean;
};

export function LogEntry({ entry, isLast = false }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <article className="relative grid grid-cols-[5.5rem_1fr] gap-x-3 sm:grid-cols-[6.5rem_1fr] sm:gap-x-4">
      {/* Left rail: date + decorative marker */}
      <div className="relative flex flex-col items-end pt-1 pr-1">
        <time
          dateTime={entry.date}
          className="font-mono text-xs text-text-muted sm:text-[0.8125rem]"
        >
          {entry.date}
        </time>
        <span
          aria-hidden="true"
          className="mt-1 select-none font-mono text-[0.6875rem] leading-none text-text-muted/70"
        >
          {entry.marker}
        </span>
        {/* Timeline dot */}
        <span
          aria-hidden="true"
          className="absolute top-[0.55rem] -right-[0.2rem] z-10 size-1.5 rounded-full bg-accent sm:-right-[0.15rem]"
        />
        {/* Quiet vertical rule */}
        {!isLast ? (
          <span
            aria-hidden="true"
            className="absolute top-4 bottom-0 right-0 w-px bg-border"
          />
        ) : null}
      </div>

      {/* Entry content */}
      <div className="min-w-0 pb-8">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((v) => !v)}
          className="group w-full rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip label={entry.type} />
            <h3 className="font-body text-base font-medium text-text group-hover:text-accent sm:text-[1.0625rem]">
              {entry.title}
            </h3>
          </div>
          <p className="mt-1.5 font-body text-sm leading-relaxed text-text-muted sm:text-base">
            {entry.summary}
          </p>
        </button>

        <div
          id={panelId}
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pt-3">
              {entry.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-sm leading-relaxed text-text sm:text-base [&:not(:first-child)]:mt-2"
                >
                  {paragraph}
                </p>
              ))}
              {entry.href ? (
                <p className="mt-3">
                  <ExternalLink
                    href={entry.href}
                    className="font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View link
                  </ExternalLink>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
