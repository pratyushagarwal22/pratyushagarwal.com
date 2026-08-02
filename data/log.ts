export type LogEntryType = "shipped" | "wrote" | "built" | "milestone";

export type LogInlineLink = {
  label: string;
  href: string;
};

export type LogEntry = {
  id: string;
  date: string;
  marker: string;
  type: LogEntryType;
  title: string;
  summary: string;
  body: string[];
  href?: string;
  hrefLabel?: string; // CTA text for the href link, e.g. "View Repo", "View Post"
  /** Substrings in body paragraphs to turn into inline links. */
  inlineLinks?: LogInlineLink[];
  source: "manual" | "github";
  repo?: string;
  sha?: string;
};

export const log: LogEntry[] = [
  {
    id: "post-stripe-docs",
    date: "2026-08-02",
    marker: "9c4a1e",
    type: "wrote",
    title: "New Substack post: Stripe docs and subscription integration",
    summary:
      "Wrote about what it actually took to navigate Stripe's docs while building the Llama Inc. subscription integration, and why reading docs well is its own skill.",
    body: [
      "Reading someone else's documentation well is its own skill, separate from writing the code. The single most important sentence in the whole integration, that access is granted from the signed webhook and never the redirect, was buried a click deeper than the main guide. That is the story, not the Stripe plumbing itself.",
    ],
    href: "https://agarwalpratyush.substack.com/p/stripe-docs-subscription-integration",
    hrefLabel: "View Post",
    source: "manual",
  },
  {
    id: "website-launch",
    date: "2026-07-31",
    marker: "b1d9f4",
    type: "shipped",
    title: "Launched this site",
    summary:
      "This site, live. Next.js on Vercel, custom domain, built design-doc-first.",
    body: [
      "Built the same way as everything it lists: a design doc, a dependency-ordered plan, one commit per verified task. The site is not a writeup about the pivot, it is the pivot, running in public.",
    ],
    href: "https://github.com/pratyushagarwal22/pratyushagarwal.com",
    hrefLabel: "View Repo",
    source: "manual",
  },
  {
    id: "post-lead-intake",
    date: "2026-07-30",
    marker: "e2740b",
    type: "wrote",
    title: "First Substack post: building with an AI coding agent",
    summary:
      "My first published post: the process behind the lead intake build, and the quiet bugs an AI agent produced.",
    body: [
      "The real lesson was not any single bug. An AI coding agent will happily produce code that runs, looks fine, and is quietly wrong. Planning first and checking both behavior and structure is what caught a login timing leak, a broken migration, and a wrong uniqueness rule.",
    ],
    href: "https://agarwalpratyush.substack.com/p/ai-coding-agent-lead-intake-app",
    hrefLabel: "View Post",
    source: "manual",
  },
  {
    id: "mnemo-foundations",
    date: "2026-07-26",
    marker: "a7c3e1",
    type: "milestone",
    title: "Mnemo: foundations underway",
    summary:
      "Core API taking shape: Express + Postgres with clean layering, Docker Compose orchestration.",
    body: [
      "The CRUD core is done and clean-slate verified, the floor the rest stands on. Auth comes next, then a semantic graph, then an agent layer on top. Nine milestones, each with its own design doc and learning write-up.",
    ],
    href: "https://github.com/pratyushagarwal22/mnemo",
    hrefLabel: "View Repo",
    source: "manual",
  },
  {
    id: "mnemo-started",
    date: "2026-07-06",
    marker: "f2b91d",
    type: "built",
    title: "Started Mnemo in public",
    summary:
      "Repo public from day one. Nine-milestone roadmap from CRUD API to agentic second brain.",
    body: [
      "Public from commit one changes how you build. Every choice gets a written reason before the code, because the reasoning is part of the repo. The discipline is the point, not a side effect of it.",
    ],
    href: "https://github.com/pratyushagarwal22/mnemo",
    hrefLabel: "View Repo",
    source: "manual",
  },
  {
    id: "lead-management",
    date: "2026-07-01",
    marker: "c8a2e7",
    type: "built",
    title: "Lead Management System",
    summary:
      "Full-stack lead intake for a legal clinic. FastAPI, Next.js, Postgres, Docker Compose.",
    body: [
      "The login endpoint only hashed the password when the email existed, so an unknown email answered faster than a wrong one, quietly leaking which accounts are real. The fix: one bcrypt check every attempt, real hash or dummy, so both paths cost the same and return an identical 401.",
    ],
    href: "https://github.com/pratyushagarwal22/lead-management-system",
    hrefLabel: "View Repo",
    source: "manual",
  },
  {
    id: "zolve-scholarship",
    date: "2026-05-06",
    marker: "d4f091",
    type: "milestone",
    title: "Won the Zolve Global Scholarship",
    summary:
      "Named the Excellence Scholarship winner, Zolve's top merit award, chosen from a global pool of 30,000-plus applicants.",
    body: [
      "The Excellence Scholarship is Zolve's single top merit award, chosen from more than 30,000 applicants across 50-plus countries. Recognition for leadership and real-world impact, and a good marker on the pivot into software.",
    ],
    href: "https://www.linkedin.com/posts/agarwal-pratyush_really-grateful-to-be-named-a-zolve-global-ugcPost-7454926269118365697-ppqq/",
    hrefLabel: "View Post",
    source: "manual",
  },
  {
    id: "stripe-subscription",
    date: "2026-04-20",
    marker: "5f3b9d",
    type: "built",
    title: "Stripe Subscription Integration",
    summary:
      "A $10/mo subscription done right. Stripe hosted Checkout, signature-verified webhooks, Next.js + FastAPI.",
    body: [
      "The tempting place to unlock premium is the success redirect after checkout, but a redirect can be spoofed, interrupted, or never fire. Access is granted only from the signed checkout.session.completed webhook, every signature verified. Trust the event Stripe signs, not the page the browser lands on.",
    ],
    href: "https://github.com/pratyushagarwal22/llama-inc",
    hrefLabel: "View Repo",
    source: "manual",
  },
  {
    id: "tickersense-hackathon",
    date: "2026-04-12",
    marker: "4e8c0a",
    type: "shipped",
    title: "TickerSense placed 2nd at the Claude Builder Club Hackathon (UIUC)",
    summary:
      "SEC research workspace with a source-grounded AI assistant. Next.js + FastAPI + Claude API.",
    body: [
      "Ask a generic AI about a company's numbers and it will confidently invent them. TickerChat answers only from the SEC filings in the workspace and cites them, keeping facts separate from synthesis. When the answer has to be right, grounding beats fluency. Hosted live at link.",
    ],
    href: "https://github.com/pratyushagarwal22/tickersense",
    hrefLabel: "View Repo",
    inlineLinks: [
      {
        label: "link",
        href: "https://project-tickersense.vercel.app",
      },
    ],
    source: "manual",
  },
];
