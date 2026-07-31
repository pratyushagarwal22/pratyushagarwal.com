import { ContributionGrid } from "@/components/ContributionGrid";
import { RecentCommits } from "@/components/RecentCommits";
import { getGitHubActivity } from "@/lib/github";

/**
 * Failed revalidations are expected to serve the prior successful cached
 * payload via Next's fetch cache; this component just renders whatever
 * getGitHubActivity() returns.
 */
export async function GitHubActivity() {
  const { calendar, commits } = await getGitHubActivity();

  const showUnavailable =
    calendar === null && (commits === null || commits.length === 0);

  return (
    <div className="flex min-h-24 flex-col justify-center gap-4 border-b border-border pb-6">
      {calendar !== null ? <ContributionGrid calendar={calendar} /> : null}
      {commits !== null && (calendar !== null || commits.length > 0) ? (
        <RecentCommits commits={commits} />
      ) : null}
      {showUnavailable ? (
        <p className="font-body text-sm text-text-muted">
          GitHub activity unavailable
        </p>
      ) : null}
    </div>
  );
}
