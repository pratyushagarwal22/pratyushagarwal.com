import { publications } from "@/data/publications";
import { contentContainerClassName, sectionScrollMarginClassName } from "./ContentContainer";
import { PublicationCard } from "./PublicationCard";
import { SectionHeading } from "./SectionHeading";

export function Publications() {
  // Data is already newest-first (Elsevier 2024 → IEEE 2023 → Springer 2022).
  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className={`${contentContainerClassName} ${sectionScrollMarginClassName}`}
    >
      <SectionHeading id="publications-heading">Publications</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Peer-reviewed papers — click to expand for the abstract.
      </p>

      <ul className="mt-8 flex list-none flex-col gap-4 p-0">
        {publications.map((publication) => (
          <li key={publication.id}>
            <PublicationCard publication={publication} />
          </li>
        ))}
      </ul>
    </section>
  );
}
