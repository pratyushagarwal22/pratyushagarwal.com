"use client";

import { useEffect, useId, useState } from "react";
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

const linkClassName =
  "font-body text-[15px] font-semibold text-text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const resumeClassName =
  "font-body text-[15px] font-semibold text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-bg/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:gap-6 md:px-8">
        <a
          href="#top"
          aria-label="Pratyush Agarwal — back to top"
          className="shrink-0 font-display text-[1.75rem] font-bold lowercase tracking-tight text-text hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          pa
        </a>

        {/* Desktop: all anchors + Resume in one row */}
        <nav aria-label="Primary" className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-x-5 sm:gap-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClassName}>
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
                eventName="resume_click"
                className={resumeClassName}
              >
                Resume
              </ExternalLink>
            </li>
          </ul>
        </nav>

        {/* Mobile: Resume always visible, then hamburger */}
        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <ExternalLink
            href={site.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View resume (PDF)"
            eventName="resume_click"
            className={`inline-flex min-h-11 items-center px-2 ${resumeClassName}`}
          >
            Resume
          </ExternalLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Section navigation"
          className="border-t border-border md:hidden"
        >
          <ul className="ml-auto grid w-max max-w-full grid-cols-2 gap-x-3 gap-y-0 py-2 pr-4 pl-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${linkClassName} flex min-h-11 items-center justify-end px-2 text-right`}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="stroke-current"
    >
      {open ? (
        <>
          <path
            d="M4 4L16 16"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 4L4 16"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M3 5H17"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 10H17"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 15H17"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
