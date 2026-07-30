"use client";

import { useId, useState } from "react";
import type { Project } from "@/data/projects";
import { Chip } from "./Chip";
import { ExternalLink } from "./ExternalLink";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const linkAffordance = project.links.map((l) => l.label).join(" · ");
  const isFlagship = Boolean(project.featured);

  return (
    <article
      className="hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]"
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className="group w-full rounded-sm p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`min-w-0 break-words font-body text-base text-text sm:text-[1.0625rem] ${
              isFlagship ? "font-semibold" : "font-medium"
            }`}
          >
            {project.title}
          </h3>
          {isFlagship ? <Chip label="Flagship" variant="flagship" /> : null}
        </div>

        <p className="mt-1.5 break-words font-body text-sm leading-relaxed text-text-muted sm:text-base">
          {project.blurb}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {project.tech.map((tech) => (
              <li key={tech} className="max-w-full">
                <Chip label={tech} />
              </li>
            ))}
          </ul>
        ) : null}

        {linkAffordance ? (
          <p className="mt-3 font-body text-sm text-text-muted">
            {linkAffordance}
          </p>
        ) : null}
      </button>

      <div
        id={panelId}
        inert={!expanded ? true : undefined}
        className="expand-panel grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
            {project.problem ? (
              <DetailBlock label="Problem" text={project.problem} />
            ) : null}
            {project.approach ? (
              <DetailBlock label="Approach" text={project.approach} />
            ) : null}
            {project.outcome ? (
              <DetailBlock label="Outcome" text={project.outcome} />
            ) : null}

            {project.links.length > 0 ? (
              <ul className="mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
                {project.links.map((link) => {
                  const eventName =
                    link.label === "GitHub"
                      ? "project_github"
                      : link.label === "Live"
                        ? "project_live"
                        : undefined;
                  return (
                    <li key={link.href}>
                      <ExternalLink
                        href={link.href}
                        eventName={eventName}
                        eventData={
                          eventName ? { project: project.id } : undefined
                        }
                        className="inline-flex min-h-11 items-center font-body text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {link.label}
                      </ExternalLink>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="[&:not(:first-child)]:mt-3">
      <p className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="mt-1 font-body text-sm leading-relaxed text-text sm:text-base">
        {text}
      </p>
    </div>
  );
}
