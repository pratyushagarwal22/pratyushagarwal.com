import type { RecentCommit } from "@/lib/github";
import { Chip } from "./Chip";
import { ExternalLink } from "./ExternalLink";
import { RelativeTime } from "./RelativeTime";

type RecentCommitsProps = {
  commits: RecentCommit[];
};

function firstLine(message: string): string {
  return message.split("\n")[0] ?? message;
}

function repoNameOnly(repo: string): string {
  const slash = repo.lastIndexOf("/");
  return slash === -1 ? repo : repo.slice(slash + 1);
}

export function RecentCommits({ commits }: RecentCommitsProps) {
  if (commits.length === 0) {
    return null;
  }

  return (
    <ul className="list-none p-0">
      {commits.map((commit, index) => {
        const message = firstLine(commit.message);
        const isLast = index === commits.length - 1;
        const shortSha = commit.sha.slice(0, 7);

        return (
          <li
            key={commit.sha}
            className="relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[7rem_1fr] sm:gap-x-4"
          >
            <div className="relative flex flex-col items-end pt-1 pr-2 sm:pr-4">
              <RelativeTime
                iso={commit.occurredAt}
                className="whitespace-nowrap font-mono text-[0.6875rem] text-text-muted sm:text-[0.8125rem]"
              />
              <span
                aria-hidden="true"
                className="mt-1 select-none font-mono text-[0.6875rem] leading-none text-text-muted/70"
              >
                {shortSha}
              </span>
              <span
                aria-hidden="true"
                className="absolute top-[0.55rem] -right-[0.2rem] z-10 size-1.5 rounded-full bg-accent sm:-right-[0.15rem]"
              />
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute top-4 bottom-0 right-0 w-px bg-border"
                />
              ) : null}
            </div>

            <div className="min-w-0 pb-8">
              <Chip label={repoNameOnly(commit.repo)} />
              <ExternalLink
                href={commit.commitUrl}
                eventName="github_commit_click"
                className="mt-1.5 block break-words font-body text-sm leading-relaxed text-text-muted underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-base"
              >
                {message}
              </ExternalLink>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
