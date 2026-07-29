import { site } from "@/data/site";
import { writing } from "@/data/writing";
import { contentContainerClassName } from "./ContentContainer";
import { ExternalLink } from "./ExternalLink";
import { SectionHeading } from "./SectionHeading";
import { VenueProfileCard, WritingCard } from "./WritingCard";

const PROFILE_VENUES = ["medium", "substack", "linkedin"] as const;

export function Writing() {
  const hasPosts = writing.length > 0;

  const medium = site.socials.find((s) => s.id === "medium");
  const substack = site.socials.find((s) => s.id === "substack");

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className={`${contentContainerClassName} scroll-mt-20`}
    >
      <SectionHeading id="writing-heading">Writing</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        Notes on building in public — Medium, Substack, and LinkedIn.
      </p>

      {hasPosts ? (
        <>
          <ul className="mt-8 flex list-none flex-col gap-4 p-0">
            {writing.map((item) => (
              <li key={item.id}>
                <WritingCard item={item} />
              </li>
            ))}
          </ul>

          {medium && substack ? (
            <p className="mt-6 font-body text-sm text-text-muted">
              More on{" "}
              <ExternalLink
                href={medium.href}
                className="text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Medium
              </ExternalLink>{" "}
              and{" "}
              <ExternalLink
                href={substack.href}
                className="text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Substack
              </ExternalLink>{" "}
              — posts coming soon
            </p>
          ) : null}
        </>
      ) : (
        <>
          <ul className="mt-8 flex list-none flex-col gap-4 p-0">
            {PROFILE_VENUES.map((id) => {
              const social = site.socials.find((s) => s.id === id);
              if (!social) return null;
              return (
                <li key={social.id}>
                  <VenueProfileCard
                    label={social.label}
                    href={social.href}
                  />
                </li>
              );
            })}
          </ul>
          <p className="mt-6 font-body text-sm text-text-muted">
            Writing in public — posts coming soon
          </p>
        </>
      )}
    </section>
  );
}
