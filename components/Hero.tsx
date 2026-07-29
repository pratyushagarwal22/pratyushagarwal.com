import { site } from "@/data/site";
import { ExternalLink } from "./ExternalLink";

const [oneLinerLead, oneLinerRest] = site.oneLiner.split("\n");

const socialLinks = site.socials.filter((social) => social.id !== "email");
const email = site.socials.find((social) => social.id === "email");

export function Hero() {
  return (
    <header className="flex w-full max-w-[900px] flex-col gap-6">
      <h1
        className="font-display font-medium leading-[1.15] tracking-tight text-text"
        style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4rem)" }}
      >
        {site.name}
      </h1>

      <p className="font-body text-lg leading-relaxed text-text sm:text-xl">
        <span className="text-text">{oneLinerLead}</span>
        {oneLinerRest ? (
          <>
            <br />
            <span className="text-text-muted">{oneLinerRest}</span>
          </>
        ) : null}
      </p>

      <p className="font-body text-base text-text-muted sm:text-lg">
        Currently building{" "}
        <a
          href={site.currentlyBuilding.href}
          className="font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {site.currentlyBuilding.name}
        </a>
      </p>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <ExternalLink
          href={site.resumeHref}
          aria-label="View resume (PDF)"
          className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 py-2.5 font-body text-base font-medium text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View resume
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
            className="inline-flex min-h-11 items-center justify-center font-body text-base font-medium text-text-muted underline-offset-4 hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Email
          </ExternalLink>
        ) : null}
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-2" aria-label="Social links">
        {socialLinks.map((social) => (
          <li key={social.id}>
            <ExternalLink
              href={social.href}
              className="font-body text-sm text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {social.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </header>
  );
}
