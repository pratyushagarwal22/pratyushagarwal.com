import { site } from "@/data/site";
import { ExternalLink } from "./ExternalLink";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-5 sm:gap-y-2">
            {site.socials.map((social) => (
              <li key={social.id}>
                <ExternalLink
                  href={social.href}
                  eventName={
                    social.id === "email" ? "email_click" : `social_${social.id}`
                  }
                  className="inline-flex min-h-11 items-center font-body text-sm text-text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-body text-sm text-text-muted">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
