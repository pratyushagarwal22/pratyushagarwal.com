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
  /** Substrings in body paragraphs to turn into inline links. */
  inlineLinks?: LogInlineLink[];
  source: "manual" | "github";
  repo?: string;
  sha?: string;
};

export const log: LogEntry[] = [
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
    source: "manual",
  },
  {
    id: "tickersense-hackathon",
    date: "2026-04-12",
    marker: "4e8c0a",
    type: "shipped",
    title:
      "TickerSense placed 2nd at the Claude Builder Club Hackathon (UIUC)",
    summary:
      "SEC research workspace with a source-grounded AI assistant. Next.js + FastAPI + Claude API.",
    body: [
      "Ask a generic AI about a company's numbers and it will confidently invent them. TickerChat answers only from the SEC filings in the workspace and cites them, keeping facts separate from synthesis. When the answer has to be right, grounding beats fluency. Hosted live at link.",
    ],
    href: "https://github.com/pratyushagarwal22/tickersense",
    inlineLinks: [
      {
        label: "link",
        href: "https://project-tickersense.vercel.app",
      },
    ],
    source: "manual",
  },
];
