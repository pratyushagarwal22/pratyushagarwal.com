export type SocialLink = {
  id: "github" | "linkedin" | "medium" | "substack" | "email";
  label: string;
  href: string;
};

export type SiteContent = {
  name: string;
  shortName: string;
  title: string;
  oneLiner: string;
  currentlyBuilding: { name: string; href: string };
  resumeHref: string;
  profileImageSrc: string;
  socials: SocialLink[];
  about: string;
};

export const site: SiteContent = {
  name: "Pratyush Agarwal",
  shortName: "Pratyush",
  title: "Pratyush Agarwal — Building software in public",
  oneLiner:
    "I like building things people actually use.\nThree years shipping data systems in production, now all in on software engineering. Proof, not promises, one commit at a time.",
  currentlyBuilding: { name: "Mnemo", href: "#projects" },
  resumeHref: "/pratyush-agarwal-resume.pdf",
  profileImageSrc: "/profile.png",
  socials: [
    {
      id: "email",
      label: "Email",
      href: "mailto:hi@pratyushagarwal.com",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://www.github.com/pratyushagarwal22",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/agarwal-pratyush/",
    },
    {
      id: "medium",
      label: "Medium",
      href: "https://www.medium.com/@agarwal-pratyush",
    },
    {
      id: "substack",
      label: "Substack",
      href: "https://www.substack.com/@agarwalpratyush",
    },
  ],
  about:
    "I spent three years working with data across Kohler, Apna, and Google, building pipelines, automation, and systems that teams relied on every day. Somewhere along the way I realized the parts I loved most were the software parts: designing APIs, shipping products, watching people use what I built. So I'm going all in on software engineering. I don't have years of a traditional SWE title behind me, but I have production experience, I learn fast, and I'm building the proof in the open: every project public, every milestone logged, every lesson written up. If you want to see how I work, it's all here.",
};
