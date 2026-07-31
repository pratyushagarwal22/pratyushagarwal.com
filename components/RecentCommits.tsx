import type { RecentCommit } from "@/lib/github";
import { ExternalLink } from "./ExternalLink";

type RecentCommitsProps = {
  commits: RecentCommit[];
};

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["week", 1000 * 60 * 60 * 24 * 7],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
    ["second", 1000],
  ];

  for (const [unit, ms] of divisions) {
    if (absMs >= ms || unit === "second") {
      return rtf.format(-Math.round(diffMs / ms), unit);
    }
  }

  return "just now";
}

function firstLine(message: string): string {
  return message.split("\n")[0] ?? message;
}

export function RecentCommits({ commits }: RecentCommitsProps) {
  if (commits.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2">
      {commits.map((commit) => {
        const message = firstLine(commit.message);

        return (
          <li
            key={commit.sha}
            className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:flex-nowrap"
          >
            <span className="shrink-0 font-mono text-xs text-text-muted sm:text-sm">
              {commit.repo}
            </span>
            <ExternalLink
              href={commit.commitUrl}
              eventName="github_commit_click"
              className="min-w-0 flex-1 truncate font-body text-sm text-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base"
            >
              {message}
            </ExternalLink>
            <time
              dateTime={commit.occurredAt}
              className="shrink-0 font-mono text-xs text-text-muted sm:text-sm"
            >
              {formatRelativeTime(commit.occurredAt)}
            </time>
          </li>
        );
      })}
    </ul>
  );
}
