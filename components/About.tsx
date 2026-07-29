import Image from "next/image";
import { site } from "@/data/site";
import { contentContainerClassName } from "./ContentContainer";
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
      className={`${contentContainerClassName} scroll-mt-20`}
    >
      <SectionHeading id="about-heading">About</SectionHeading>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <div className="shrink-0">
          <Image
            src={site.profileImageSrc}
            alt="Pratyush Agarwal"
            width={240}
            height={240}
            className="h-auto w-[180px] sm:w-[220px]"
            sizes="220px"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-4 font-body text-base leading-relaxed text-text">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
