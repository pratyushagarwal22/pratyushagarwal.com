export type LogEntryType = "shipped" | "wrote" | "built" | "milestone";

export type LogEntry = {
  id: string;
  date: string;
  marker: string;
  type: LogEntryType;
  title: string;
  summary: string;
  body: string[];
  href?: string;
  source: "manual" | "github";
  repo?: string;
  sha?: string;
};

export const log: LogEntry[] = [
  {
    id: "mnemo-foundations",
    date: "2026-07-26",
    marker: "a7c3e1",
    type: "milestone",
    title: "Mnemo: foundations underway",
    summary:
      "Core API taking shape: NestJS + Postgres with clean layering, Docker Compose orchestration.",
    body: [
      "Mnemo is a personal knowledge tool that starts as a Notion/Trello-style notes-and-kanban app and evolves into a semantic, graph-connected, agent-powered second brain. Two services: a TypeScript/NestJS API and a Python/FastAPI AI layer. Nine stacked milestones from CRUD to agentic AI, each with a design doc, plan, and learning write-up.",
    ],
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
      "The whole build is documented as it happens: design.md and plan.md per milestone, commit-per-verified-task, and a learning log that becomes blog posts. This is the flagship of the pivot.",
    ],
    href: "https://github.com/pratyushagarwal22/mnemo",
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
      "One workspace per ticker: filings, fundamentals, charts, governance, and TickerChat, an assistant that answers from official SEC filings instead of guessing. Deployed on Vercel and Render. Live at project-tickersense.vercel.app.",
    ],
    href: "https://project-tickersense.vercel.app",
    source: "manual",
  },
];
