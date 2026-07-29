/**
 * Reserved v2 region for GitHub contribution grid + latest commits.
 * Fixed min-height keeps layout stable when the real module lands.
 */
export function GitHubSlot() {
  return (
    <div
      className="flex min-h-24 items-center border-b border-border pb-6"
      role="status"
      aria-label="GitHub activity coming soon"
    >
      <p className="font-body text-sm text-text-muted">
        GitHub activity — coming soon
      </p>
    </div>
  );
}
