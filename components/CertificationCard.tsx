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
