import { site } from "@/data/site";
import { contentContainerClassName } from "./ContentContainer";
import { ExternalLink } from "./ExternalLink";

const oneLinerLines = site.oneLiner.split("\n");

const socialLinks = site.socials.filter((social) => social.id !== "email");
const email = site.socials.find((social) => social.id === "email");

function OneLinerLine({ line, muted }: { line: string; muted: boolean }) {
  const proofPrefix = "Proof";
  const hasProofLead = muted && line.startsWith(proofPrefix);

  return (
    <span className={muted ? "text-text-muted" : "text-text"}>
      {hasProofLead ? (
        <>
          <span className="font-bold text-accent">{proofPrefix}</span>
          {line.slice(proofPrefix.length)}
        </>
      ) : (
        line
      )}
    </span>
  );
}

export function Hero() {
  return (
    <header
      className={`${contentContainerClassName} flex min-h-[calc((100svh-76px)*0.81)] flex-col justify-center pt-8 pb-10`}
    >
      <h1
        className="max-w-full break-words font-display font-medium leading-[1.15] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 5vw + 1rem, 4rem)" }}
      >
        {site.name}
      </h1>

      <p className="mt-8 max-w-full break-words font-body text-lg leading-relaxed text-text sm:mt-10 sm:text-xl">
        <OneLinerLine line={oneLinerLines[0]} muted={false} />
        {oneLinerLines.slice(1).map((line) => (
          <span key={line}>
            <br />
            <OneLinerLine line={line} muted />
          </span>
        ))}
      </p>

      <p className="mt-8 font-body text-base text-text-muted sm:mt-10 sm:text-lg">
        Currently building{" "}
        <a
          href={site.currentlyBuilding.href}
          className="font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {site.currentlyBuilding.name}
        </a>
      </p>

      <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3">
        <ExternalLink
          href={site.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View resume (PDF)"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 py-2.5 font-body text-base font-medium text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Resume
        </ExternalLink>
        <a
          href="#now"
          className="inline-flex min-h-11 items-center justify-center font-body text-base font-medium text-text-muted underline-offset-4 hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          See what I&apos;m building
        </a>
        {email ? (
          <ExternalLink
            href={email.href}
            className="inline-flex min-h-11 max-w-full items-center justify-center break-all font-body text-base font-medium text-text-muted underline-offset-4 hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:break-normal"
          >
            hi@pratyushagarwal.com
          </ExternalLink>
        ) : null}
      </div>

      <ul
        className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 sm:mt-10 sm:justify-start sm:gap-x-5 sm:gap-y-2"
        aria-label="Social links"
      >
        {socialLinks.map((social) => (
          <li key={social.id}>
            <ExternalLink
              href={social.href}
              className="inline-flex min-h-11 items-center font-body text-sm text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {social.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
