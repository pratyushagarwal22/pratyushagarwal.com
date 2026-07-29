import type { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

/**
 * External / mailto links with sensible defaults.
 * Same-origin paths (e.g. resume PDF) stay in the same tab unless overridden.
 */
export function ExternalLink({
  href,
  children,
  className,
  rel,
  target,
  ...props
}: ExternalLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isMailto = href.startsWith("mailto:");

  return (
    <a
      href={href}
      className={className}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      {...props}
    >
      {children}
      {isExternal || isMailto ? (
        <span className="sr-only">
          {isMailto ? " (opens email)" : " (opens in a new tab)"}
        </span>
      ) : null}
    </a>
  );
}
