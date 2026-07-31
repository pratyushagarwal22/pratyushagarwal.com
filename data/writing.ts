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
    id: "tickersense-linkedin",
    title: "TickerSense: 2nd place at the Claude Builder Club Hackathon",
    venue: "LinkedIn",
    date: "2026-04-14",
    href: "https://www.linkedin.com/posts/agarwal-pratyush_hi-everyone-i-participated-in-the-claude-share-7450333929712312321-nrAx/",
    topics: ["Hackathon", "LLM", "Building in public"],
  },
];
