"use client";

import { useState } from "react";
import { certifications } from "@/data/certifications";
import {
  contentContainerClassName,
  sectionScrollMarginClassName,
} from "./ContentContainer";
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
      <SectionHeading id="certifications-heading">
        Certifications
      </SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Credentials I&apos;ve earned, and one I&apos;m still working toward.
      </p>

      <ul
        id="certifications-list"
        className="mt-8 flex list-none flex-col gap-4 p-0"
      >
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
