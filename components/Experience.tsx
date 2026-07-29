"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import { contentContainerClassName } from "./ContentContainer";
import { ExperienceItem } from "./ExperienceItem";
import { SectionHeading } from "./SectionHeading";
import { ShowMoreButton } from "./ShowMoreButton";

const DEFAULT_VISIBLE = 4;

export function Experience() {
  const [showAll, setShowAll] = useState(false);

  // Data is already newest-first (Kohler → … → Haryana Police).
  const total = experience.length;
  const hiddenCount = Math.max(0, total - DEFAULT_VISIBLE);
  const visible = showAll
    ? experience
    : experience.slice(0, DEFAULT_VISIBLE);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={`${contentContainerClassName} scroll-mt-20`}
    >
      <SectionHeading id="experience-heading">Experience</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Roles and internships — click to expand for detail.
      </p>

      <ul id="experience-list" className="mt-8 flex list-none flex-col gap-4 p-0">
        {visible.map((item) => (
          <li key={item.id}>
            <ExperienceItem item={item} />
          </li>
        ))}
      </ul>

      {total > DEFAULT_VISIBLE ? (
        <ShowMoreButton
          expanded={showAll}
          count={hiddenCount}
          controlsId="experience-list"
          onClick={() => setShowAll((v) => !v)}
        />
      ) : null}
    </section>
  );
}
