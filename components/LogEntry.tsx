"use client";

import { Fragment, useId, useState, type ReactNode } from "react";
import type { LogEntry as LogEntryData, LogInlineLink } from "@/data/log";
import { Chip } from "./Chip";
import { ExternalLink } from "./ExternalLink";

type LogEntryProps = {
  entry: LogEntryData;
  /** Hide the connecting rule below the last visible entry */
  isLast?: boolean;
};

function renderBodyWithInlineLinks(
  text: string,
  inlineLinks: LogInlineLink[] | undefined,
): ReactNode {
  if (!inlineLinks || inlineLinks.length === 0) {
    return text;
  }

  const labels = inlineLinks.map((link) => link.label);
  const pattern = new RegExp(
    `(${labels.map((label) => escapeRegExp(label)).join("|")})`,
    "g",
  );
  const hrefByLabel = new Map(
    inlineLinks.map((link) => [link.label, link.href]),
  );
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const href = hrefByLabel.get(part);
    if (!href) {
      return <Fragment key={index}>{part}</Fragment>;
    }

    return (
      <ExternalLink
        key={index}
        href={href}
        eventName="log_inline_link"
        className="text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {part}
      </ExternalLink>
    );
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function LogEntry({ entry, isLast = false }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  return (
    <article className="relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[7rem_1fr] sm:gap-x-4">
      {/* Left rail: date + decorative marker */}
      <div className="relative flex flex-col items-end pt-1 pr-2 sm:pr-4">
        <time
          dateTime={entry.date}
          className="font-mono text-[0.6875rem] text-text-muted sm:text-[0.8125rem]"
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
          className="group w-full rounded-sm py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-baseline sm:gap-2">
            <Chip label={entry.type} />
            <h3 className="min-w-0 break-words font-body text-base font-medium text-text group-hover:text-accent sm:text-[1.0625rem]">
              {entry.title}
            </h3>
          </div>
          <p className="mt-1.5 break-words font-body text-sm leading-relaxed text-text-muted sm:text-base">
            {entry.summary}
          </p>
        </button>

        <div
          id={panelId}
          inert={!expanded ? true : undefined}
          className="expand-panel grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pt-3">
              {entry.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-sm leading-relaxed text-text sm:text-base [&:not(:first-child)]:mt-2"
                >
                  {renderBodyWithInlineLinks(paragraph, entry.inlineLinks)}
                </p>
              ))}
              {entry.href && entry.hrefLabel ? (
                <p className="mt-3">
                  <ExternalLink
                    href={entry.href}
                    eventName="log_repo"
                    eventData={{ title: entry.title }}
                    className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {entry.hrefLabel}
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
