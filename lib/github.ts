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

// 6h — was 3600 during build/verify; see docs/github-activity-module-design.md §5
const REVALIDATE_SECONDS = 21600;

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

type PublicEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    head?: string;
    commits?: { sha: string; message: string }[];
  };
};

type CommitApiResponse = {
  sha: string;
  commit?: { message?: string };
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
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(login)}/events/public`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!response.ok) {
      return null;
    }

    const events = (await response.json()) as PublicEvent[];
    if (!Array.isArray(events)) {
      return null;
    }

    // Public events API returns PushEvents with head/before only (no
    // payload.commits). Collect newest PushEvent heads, then fetch messages.
    const candidates: { repo: string; sha: string; occurredAt: string }[] = [];
    for (const event of events) {
      if (event.type !== "PushEvent") {
        continue;
      }

      const sha = event.payload?.head;
      const repo = event.repo?.name;
      if (!sha || !repo) {
        continue;
      }

      candidates.push({
        repo,
        sha,
        occurredAt: event.created_at,
      });

      if (candidates.length >= 3) {
        break;
      }
    }

    const settled = await Promise.all(
      candidates.map(async (candidate) => {
        try {
          const commitResponse = await fetch(
            `https://api.github.com/repos/${candidate.repo}/commits/${encodeURIComponent(candidate.sha)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
              },
              next: { revalidate: REVALIDATE_SECONDS },
            },
          );

          if (!commitResponse.ok) {
            return null;
          }

          const body = (await commitResponse.json()) as CommitApiResponse;
          const fullMessage = body.commit?.message;
          if (!fullMessage) {
            return null;
          }

          const message = fullMessage.split("\n")[0] ?? fullMessage;
          const sha = body.sha || candidate.sha;
          const repoUrl = `https://github.com/${candidate.repo}`;

          return {
            sha,
            message,
            repo: candidate.repo,
            repoUrl,
            commitUrl: `${repoUrl}/commit/${sha}`,
            occurredAt: candidate.occurredAt,
          } satisfies RecentCommit;
        } catch {
          return null;
        }
      }),
    );

    return settled.filter((commit): commit is RecentCommit => commit !== null);
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
