"use client";

import { track } from "@vercel/analytics";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

type TrackProperties = Record<string, string | number | boolean | null>;

type ExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  /** Vercel Analytics custom event name. Falls back to outbound_click. */
  eventName?: string;
  eventData?: TrackProperties;
};

/**
 * External / mailto / PDF links with sensible defaults.
 * Same-origin paths stay in the same tab unless overridden (e.g. resume).
 */
export function ExternalLink({
  href,
  children,
  className,
  rel,
  target,
  eventName,
  eventData,
  onClick,
  ...props
}: ExternalLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isMailto = href.startsWith("mailto:");
  const isPdf = /\.pdf($|\?)/i.test(href);
  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
  const opensInNewTab = resolvedTarget === "_blank";
  const resolvedRel =
    rel ??
    (isExternal || opensInNewTab ? "noopener noreferrer" : undefined);

  let announcement: string | null = null;
  if (isMailto) {
    announcement = " (opens email)";
  } else if (isPdf && opensInNewTab) {
    announcement = " (PDF, opens in a new tab)";
  } else if (isPdf) {
    announcement = " (PDF)";
  } else if (opensInNewTab) {
    announcement = " (opens in a new tab)";
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (eventName) {
      track(eventName, eventData);
    } else {
      track("outbound_click", { href });
    }
    onClick?.(event);
  }

  return (
    <a
      href={href}
      className={className}
      target={resolvedTarget}
      rel={resolvedRel}
      {...props}
      onClick={handleClick}
    >
      {children}
      {announcement ? <span className="sr-only">{announcement}</span> : null}
    </a>
  );
}
