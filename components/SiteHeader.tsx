"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ExternalLink } from "./ExternalLink";

const navItems = [
  { href: "#now", label: "Now" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-bg/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1200px] items-center justify-between gap-6 px-8">
        <a
          href="#top"
          aria-label="Pratyush Agarwal — back to top"
          className="shrink-0 font-display text-[1.75rem] font-bold lowercase tracking-tight text-text hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          pa
        </a>
        <nav aria-label="Primary" className="shrink-0">
          <ul className="flex items-center gap-x-5 sm:gap-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-[15px] font-semibold text-text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <ExternalLink
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume (PDF)"
                className="font-body text-[15px] font-semibold text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Resume
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
