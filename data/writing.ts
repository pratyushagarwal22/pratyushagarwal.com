export type WritingItem = {
  id: string;
  title: string;
  venue: "Substack" | "LinkedIn";
  date: string;
  href: string;
  topics: string[];
};

export const writing: WritingItem[] = [
  {
    id: "post-stripe-docs",
    title: "Stripe's Docs Are Great. Finding the Right Page Wasn't.",
    venue: "Substack",
    date: "2026-08-02",
    href: "https://agarwalpratyush.substack.com/p/stripe-docs-subscription-integration",
    topics: ["Stripe", "Documentation", "Full-stack"],
  },
  {
    id: "post-lead-intake",
    title:
      "I built a lead intake app with an AI Coding Agent. Here is what went wrong, and why that was the point.",
    venue: "Substack",
    date: "2026-07-30",
    href: "https://agarwalpratyush.substack.com/p/ai-coding-agent-lead-intake-app",
    topics: ["AI coding agents", "Full-stack", "Building in public"],
  },
  {
    id: "tickersense-linkedin",
    title: "TickerSense: 2nd place at the Claude Builder Club Hackathon",
    venue: "LinkedIn",
    date: "2026-04-14",
    href: "https://www.linkedin.com/posts/agarwal-pratyush_hi-everyone-i-participated-in-the-claude-share-7450333929712312321-nrAx/",
    topics: ["Hackathon", "LLM", "Building in public"],
  },
];
