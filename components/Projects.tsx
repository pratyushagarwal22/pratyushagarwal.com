"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { Chip } from "./Chip";
import { contentContainerClassName } from "./ContentContainer";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";
import { ShowMoreButton } from "./ShowMoreButton";

const DEFAULT_VISIBLE = 4;
const ALL = "All";

export function Projects() {
  const [filter, setFilter] = useState(ALL);
  const [showAll, setShowAll] = useState(false);

  const sorted = [...projects].sort((a, b) => a.priority - b.priority);

  const tagUnion = Array.from(
    new Set(projects.flatMap((p) => p.tags)),
  ).sort((a, b) => a.localeCompare(b));
  const filterOptions = [ALL, ...tagUnion];

  // Filter applies to the full sorted list first; the 4-item visible slice
  // applies to that filtered result. Changing the filter resets show-more
  // to the collapsed 4-item view.
  const filtered =
    filter === ALL
      ? sorted
      : sorted.filter((p) => p.tags.includes(filter));

  const hiddenCount = Math.max(0, filtered.length - DEFAULT_VISIBLE);
  const visible = showAll
    ? filtered
    : filtered.slice(0, DEFAULT_VISIBLE);

  function selectFilter(next: string) {
    setFilter(next);
    setShowAll(false);
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`${contentContainerClassName} scroll-mt-20`}
    >
      <SectionHeading id="projects-heading">Projects</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Selected builds — filter by tag, click to expand.
      </p>

      <div
        role="group"
        aria-label="Filter projects by tag"
        className="mt-6 flex flex-wrap gap-2.5"
      >
        {filterOptions.map((tag) => {
          const isActive = filter === tag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectFilter(tag)}
              className="inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Chip
                label={tag}
                size="md"
                variant={isActive ? "active" : "default"}
              />
            </button>
          );
        })}
      </div>

      <ul className="mt-8 flex list-none flex-col gap-4 p-0">
        {visible.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {filtered.length > DEFAULT_VISIBLE ? (
        <ShowMoreButton
          expanded={showAll}
          count={hiddenCount}
          onClick={() => setShowAll((v) => !v)}
        />
      ) : null}
    </section>
  );
}
