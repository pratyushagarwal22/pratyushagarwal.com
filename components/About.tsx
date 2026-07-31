import Image from "next/image";
import { site } from "@/data/site";
import { contentContainerClassName, sectionScrollMarginClassName } from "./ContentContainer";
import { EntryHeader } from "./EntryHeader";
import { SectionHeading } from "./SectionHeading";

/** Split at a sentence boundary for readability — words unchanged. */
function aboutParagraphs(text: string): string[] {
  const marker = "So I'm going all in on software engineering.";
  const index = text.indexOf(marker);
  if (index === -1) return [text];

  const splitAt = index + marker.length;
  return [text.slice(0, splitAt).trim(), text.slice(splitAt).trim()].filter(
    Boolean,
  );
}

export function About() {
  const paragraphs = aboutParagraphs(site.about);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${contentContainerClassName} ${sectionScrollMarginClassName}`}
    >
      <SectionHeading id="about-heading">About</SectionHeading>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <div className="relative mx-auto aspect-[3/4] w-[180px] shrink-0 overflow-hidden sm:mx-0 sm:w-[260px]">
          <Image
            src={site.profileImageSrc}
            alt="Pratyush Agarwal"
            fill
            sizes="(max-width: 640px) 180px, 260px"
            className="scale-[1.7] object-cover object-[center_22%]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="space-y-4 break-words font-body text-base leading-relaxed text-text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6">
            <p className="font-body text-xs font-medium uppercase tracking-wide text-text-muted">
              Education
            </p>
            <ul className="mt-2 list-none space-y-3 p-0">
              {site.education.map((item) => (
                <li key={item.institution}>
                  <EntryHeader
                    title={
                      <p className="break-words font-body text-sm font-medium text-text sm:text-base">
                        {item.institution}
                      </p>
                    }
                    meta={item.years}
                  />
                  <p className="mt-0.5 break-words font-body text-sm leading-relaxed text-text-muted sm:text-base">
                    {item.degree}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
