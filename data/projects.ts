export type Project = {
  id: string;
  title: string;
  blurb: string;
  description: string[];
  problem?: string;
  approach?: string;
  outcome?: string;
  tech: string[];
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  priority: number;
};

export const projects: Project[] = [
  {
    id: "mnemo",
    title: "Mnemo",
    blurb:
      "A second brain built in public: from CRUD app to semantic, agent-powered knowledge engine.",
    description: [],
    problem:
      "Notes, tasks, and links live in disconnected tools that never show how anything interlinks, and none of them actually know you.",
    approach:
      "Two services over an HTTP contract: a NestJS API for notes, tasks, auth, and kanban, and a FastAPI AI layer, orchestrated with Docker Compose. Strict layering: thin routers, service logic, repository DB access. Nine stacked milestones from plain CRUD to pgvector semantic search, GraphRAG over Neo4j, and an MCP-exposed agent.",
    outcome:
      "In active development, documented milestone by milestone with design docs, plans, and learning write-ups in the repo.",
    tech: [
      "TypeScript",
      "NestJS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
    ],
    tags: ["Backend", "AI", "Systems", "Full-Stack"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/mnemo",
      },
    ],
    featured: true,
    priority: 1,
  },
  {
    id: "tickersense",
    title: "TickerSense",
    blurb:
      "SEC research workspace with a source-grounded AI assistant. 2nd place, Claude Builder Club Hackathon (UIUC).",
    description: [],
    problem:
      "Public-company research is fragmented across EDGAR, market data sites, and filing types, and generic AI chat answers without citing filings.",
    approach:
      "One workspace per ticker: filings, fundamentals, charts, governance, and TickerChat, a Claude-powered assistant grounded in official SEC documents, with PDF export. Next.js frontend on Vercel, FastAPI ingestion service on Render.",
    outcome: "Placed 2nd at the hackathon. Live demo online.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Claude API", "PostgreSQL"],
    tags: ["Full-Stack", "AI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/tickersense",
      },
      {
        label: "Live",
        href: "https://project-tickersense.vercel.app",
      },
    ],
    priority: 2,
  },
  {
    id: "triptok",
    title: "TripTok",
    blurb:
      "25GB+ NYC taxi data pipeline serving ML models through an LLM analytics agent.",
    description: [],
    problem:
      "Raw city-scale transit data is useless without curation, and dashboards alone don't answer ad-hoc questions.",
    approach:
      "PySpark pipeline over AWS S3 producing curated datasets; XGBoost, Random Forest, and LSTM models for fare and demand forecasting; models served via a FastAPI MCP server and a conversational agent built with Strands Agents on AWS Bedrock.",
    outcome:
      "End-to-end: raw data to models to a chat interface for real-time mobility insights.",
    tech: ["PySpark", "AWS S3", "FastAPI", "AWS Bedrock", "MCP"],
    tags: ["Data", "AI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/TripTok",
      },
    ],
    priority: 3,
  },
  {
    id: "jobhunt",
    title: "JOBHUNT",
    blurb:
      "Multi-stage AI automation pipeline wiring several services into one human-in-the-loop workflow.",
    description: [],
    problem:
      "Repetitive multi-service workflows burn hours and break silently when APIs rate-limit or duplicate work.",
    approach:
      "Node.js pipeline using the Claude API for evaluation and generation, Google Sheets and Drive for state, Apollo for enrichment. Built around production concerns: per-task model routing, safe re-runs that skip completed work, rate limiting, deduplication, OAuth per provider, and a human approval gate at every stage.",
    outcome:
      "Powers a real job search end to end, but the design generalizes to any service-orchestration workflow.",
    tech: ["Node.js", "Claude API", "Google APIs", "Apollo API"],
    tags: ["Automation", "AI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/job-hunter",
      },
    ],
    priority: 4,
  },
  {
    id: "lead-management-system",
    title: "Lead Management System",
    blurb:
      "Full-stack lead-intake system with a public resume-upload form, a JWT-guarded reviewer dashboard, and automated email, built on strict backend layering.",
    description: [],
    problem:
      "A lead-intake workflow needs to take a prospect from a public form all the way to a reviewer's guarded dashboard — persisting the lead, storing the resume, emailing both sides, and tracking status — without the codebase becoming a tangle that resists future change.",
    approach:
      "FastAPI backend in strict layers (thin routers, services for logic, repositories for the only DB access) with email, file storage, and auth behind swappable interfaces. Next.js App Router frontend with a JWT-guarded internal dashboard. PostgreSQL via SQLAlchemy and Alembic, a DB-level enum for lead state, and the whole system, database, mail server, API, and web app, brought up with one Docker Compose command with health gating and auto-run migrations.",
    outcome:
      "One-command runtime with reproducible clean demos. Found and fixed a timing-based user-enumeration side channel in the login flow, and backed the project with ~1,100 lines of tests against a real Postgres database.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "JWT",
      "REST APIs",
    ],
    tags: ["Full-Stack", "Backend", "Systems"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/lead-management-system",
      },
    ],
    priority: 5,
  },
  {
    id: "stripe-subscription-integration",
    title: "Stripe Subscription Integration",
    blurb:
      "A correct, secure $10/month subscription flow for a mock SaaS product using Stripe hosted Checkout and signature-verified webhooks.",
    description: [],
    problem:
      "Payment integrations are easy to get subtly wrong: trusting the success redirect instead of the signed event, leaving webhook endpoints spoofable, or hardcoding keys so test-to-live is a code change. The goal was a production-shaped Stripe integration a solo developer could actually ship.",
    approach:
      "Stripe hosted Checkout so card details never touch the app's servers. Next.js frontend redirects to Stripe's page; a FastAPI backend creates the subscription-mode session and receives webhooks. The signed webhook, not the success redirect, is treated as the source of truth for granting access, with every webhook signature verified and bad payloads rejected before handling. All Stripe keys live in environment variables, making test-to-live a config change, not a code change.",
    outcome:
      "A minimal, secure, production-shaped integration. Documented the full local testing loop with the Stripe CLI, including the localhost vs 127.0.0.1 same-origin gotcha.",
    tech: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe API",
      "Webhooks",
      "REST APIs",
    ],
    tags: ["Full-Stack", "Backend"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/llama-inc",
      },
    ],
    priority: 6,
  },
  {
    id: "f1-race-weekend",
    title: "F1 Race Weekend Data Pipeline",
    blurb:
      "End-to-end pipeline structuring session, lap, telemetry, and pit stop data for race analysis.",
    description: [],
    approach:
      "Ingests, cleans, and structures F1 session, lap, telemetry, and pit stop data with FastF1, pandas, and SQLAlchemy.",
    outcome:
      "Analytics-ready datasets supporting driver performance analysis, race insights, and downstream dashboarding.",
    tech: ["Python", "FastF1", "pandas", "SQLAlchemy"],
    tags: ["Data"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/F1_Projects",
      },
    ],
    priority: 7,
  },
  {
    id: "chicago-crimes",
    title: "Chicago Crimes in Focus",
    blurb:
      "Interactive public data viz exploring a decade of Chicago crime patterns, built for non-technical users.",
    description: [],
    approach:
      "Streamlit app with Altair and Pydeck analyzing Chicago crime data 2010-2020.",
    outcome:
      "Narrative, user-friendly exploration of crime patterns by year, offense type, location, and time of day.",
    tech: ["Python", "Streamlit", "pandas", "Altair", "Pydeck"],
    tags: ["Data"],
    links: [
      {
        label: "Hugging Face Space",
        href: "https://huggingface.co/spaces/pratyushagarwal/Project_FP3",
      },
    ],
    priority: 8,
  },
  {
    id: "global-energy",
    title: "Global Energy ETL and BI Dashboard",
    blurb:
      "24-year, 20-country energy dataset consolidated into four interactive dashboards.",
    description: [],
    approach:
      "End-to-end ETL workflow in Tableau Prep consolidating and transforming a 24-year dataset across 20 countries.",
    outcome:
      "Four interactive dashboards analyzing electricity capacity, renewable trends, price movements, and CO2 emissions across major economies.",
    tech: ["Tableau Prep", "Tableau"],
    tags: ["Data"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pratyushagarwal22/global-energy-etl-bi-dashboard",
      },
    ],
    priority: 9,
  },
];
