"use client";

import { useId, useState } from "react";
import type { Publication } from "@/data/publications";
import { ExternalLink } from "./ExternalLink";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const abstract = publication.abstract;
  const hasAbstract = Array.isArray(abstract) && abstract.length > 0;

  return (
    <article className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]">
      {hasAbstract ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((v) => !v)}
          className="group w-full rounded-sm p-4 pb-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5 sm:pb-0"
        >
          <PublicationHeader publication={publication} />
        </button>
      ) : (
        <div className="p-4 pb-0 sm:p-5 sm:pb-0">
          <PublicationHeader publication={publication} />
        </div>
      )}

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <ExternalLink
          href={publication.href}
          className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Read paper
        </ExternalLink>
      </div>

      {hasAbstract ? (
        <div
          id={panelId}
          inert={!expanded ? true : undefined}
          className="expand-panel grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              {abstract.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-sm leading-relaxed text-text sm:text-base [&:not(:first-child)]:mt-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function PublicationHeader({ publication }: { publication: Publication }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="min-w-0 break-words font-body text-base font-medium text-text sm:text-[1.0625rem]">
          {publication.title}
        </h3>
        <p className="shrink-0 font-body text-sm text-text-muted">
          {publication.venue} ·{" "}
          <time dateTime={publication.date}>{publication.date}</time>
        </p>
      </div>

      <p className="mt-1.5 break-words font-body text-sm leading-relaxed text-text-muted sm:text-base">
        {publication.summary}
      </p>
    </>
  );
}
