import type { WritingItem } from "@/data/writing";
import { Chip } from "./Chip";
import { ExternalLink } from "./ExternalLink";

type WritingCardProps = {
  item: WritingItem;
};

const cardClassName =
  "hover-raise rounded-sm border border-border bg-surface transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_4px_12px_rgba(20,20,20,0.06)]";

export function WritingCard({ item }: WritingCardProps) {
  return (
    <article className={cardClassName}>
      <ExternalLink
        href={item.href}
        className="group block rounded-sm p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-body text-base font-medium text-accent underline-offset-4 group-hover:underline sm:text-[1.0625rem]">
            {item.title}
          </h3>
          <p className="font-body text-sm text-text-muted">
            {item.venue} ·{" "}
            <time dateTime={item.date}>{item.date}</time>
          </p>
        </div>

        {item.topics.length > 0 ? (
          <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
            {item.topics.map((topic) => (
              <li key={topic}>
                <Chip label={topic} />
              </li>
            ))}
          </ul>
        ) : null}
      </ExternalLink>
    </article>
  );
}

type VenueProfileCardProps = {
  label: string;
  href: string;
};

/** Profile-level venue card for empty writing data — no invented article titles. */
export function VenueProfileCard({ label, href }: VenueProfileCardProps) {
  return (
    <article className={cardClassName}>
      <ExternalLink
        href={href}
        className="group block rounded-sm p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
      >
        <h3 className="font-body text-base font-medium text-accent underline-offset-4 group-hover:underline sm:text-[1.0625rem]">
          {label}
        </h3>
        <p className="mt-1.5 font-body text-sm text-text-muted">
          Posts coming soon
        </p>
      </ExternalLink>
    </article>
  );
}
