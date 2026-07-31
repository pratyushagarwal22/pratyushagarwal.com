import { site } from "@/data/site";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { days: ContributionDay[] }[];
};

export type RecentCommit = {
  sha: string;
  message: string;
  repo: string;
  repoUrl: string;
  commitUrl: string;
  occurredAt: string;
};

export type GitHubActivityData = {
  calendar: ContributionCalendar | null;
  commits: RecentCommit[] | null;
};

// 2h — commit list + contribution grid refresh interval
const REVALIDATE_SECONDS = 7200;

const CONTRIBUTION_CALENDAR_QUERY = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type ContributionLevelName =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GraphQLContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevelName;
};

type GraphQLCalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLContributionDay[] }[];
        } | null;
      } | null;
    } | null;
  };
  errors?: unknown[];
};

const RECENT_COMMITS_QUERY = `
  query RecentCommits($login: String!) {
    user(login: $login) {
      contributionsCollection {
        commitContributionsByRepository(maxRepositories: 10) {
          repository {
            nameWithOwner
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) {
                    nodes {
                      oid
                      messageHeadline
                      committedDate
                      commitUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GraphQLCommitNode = {
  oid?: string | null;
  messageHeadline?: string | null;
  committedDate?: string | null;
  commitUrl?: string | null;
};

type GraphQLCommitRepository = {
  repository?: {
    nameWithOwner?: string | null;
    url?: string | null;
    defaultBranchRef?: {
      target?: {
        history?: {
          nodes?: (GraphQLCommitNode | null)[] | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

type GraphQLRecentCommitsResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        commitContributionsByRepository?:
          | (GraphQLCommitRepository | null)[]
          | null;
      } | null;
    } | null;
  };
  errors?: unknown[];
};

function mapContributionLevel(
  level: ContributionLevelName,
): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
  }
}

/** Resolve login from site.socials GitHub href. */
export function getGitHubLogin(): string {
  const github = site.socials.find((social) => social.id === "github");
  if (!github) {
    throw new Error('Missing GitHub entry in site.socials (id === "github")');
  }

  const pathname = new URL(github.href).pathname;
  const login = pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
  if (!login) {
    throw new Error("Could not parse GitHub login from site.socials href");
  }

  return login;
}

async function fetchContributionCalendar(
  login: string,
  token: string,
): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_CALENDAR_QUERY,
        variables: { login },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as GraphQLCalendarResponse;
    if (json.errors?.length) {
      return null;
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return null;
    }

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          contributionCount: day.contributionCount,
          level: mapContributionLevel(day.contributionLevel),
        })),
      })),
    };
  } catch {
    return null;
  }
}

async function fetchRecentCommits(
  login: string,
  token: string,
): Promise<RecentCommit[] | null> {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: RECENT_COMMITS_QUERY,
        variables: { login },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as GraphQLRecentCommitsResponse;
    if (json.errors?.length) {
      return null;
    }

    const byRepository =
      json.data?.user?.contributionsCollection?.commitContributionsByRepository;
    if (!Array.isArray(byRepository)) {
      return null;
    }

    // Top repos by recent commit activity; repos without a resolvable latest
    // commit (empty repo, no default branch) are skipped, not a failure.
    const candidates: RecentCommit[] = [];
    for (const entry of byRepository) {
      const repository = entry?.repository;
      const commit =
        repository?.defaultBranchRef?.target?.history?.nodes?.[0];
      if (
        !repository?.nameWithOwner ||
        !repository.url ||
        !commit?.oid ||
        !commit.messageHeadline ||
        !commit.committedDate ||
        !commit.commitUrl
      ) {
        continue;
      }

      // messageHeadline is already a single line; split is a safety net.
      const message =
        commit.messageHeadline.split("\n")[0] ?? commit.messageHeadline;

      candidates.push({
        sha: commit.oid,
        message,
        repo: repository.nameWithOwner,
        repoUrl: repository.url,
        commitUrl: commit.commitUrl,
        occurredAt: commit.committedDate,
      });
    }

    candidates.sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    );

    return candidates.slice(0, 3);
  } catch {
    return null;
  }
}

/**
 * Parallel fetch; never throws to callers — failed halves are null.
 * Failed revalidations should keep prior successful payloads when present (Next.js ISR fetch cache).
 */
export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { calendar: null, commits: null };
  }

  let login: string;
  try {
    login = getGitHubLogin();
  } catch {
    return { calendar: null, commits: null };
  }

  const [calendar, commits] = await Promise.all([
    fetchContributionCalendar(login, token),
    fetchRecentCommits(login, token),
  ]);

  return { calendar, commits };
}
