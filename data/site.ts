export type SocialLink = {
  id: "github" | "linkedin" | "medium" | "substack" | "email";
  label: string;
  href: string;
};

/** Minimal stub for Task 2 shell. Full site content lands in Task 4. */
export const site = {
  name: "Pratyush Agarwal",
  resumeHref: "/pratyush-agarwal-resume.pdf",
  socials: [
    {
      id: "email" as const,
      label: "Email",
      href: "mailto:hi@pratyushagarwal.com",
    },
    {
      id: "github" as const,
      label: "GitHub",
      href: "https://github.com/pratyushagarwal22",
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/agarwal-pratyush",
    },
    {
      id: "medium" as const,
      label: "Medium",
      href: "https://medium.com/@agarwal-pratyush",
    },
    {
      id: "substack" as const,
      label: "Substack",
      href: "https://substack.com/@agarwalpratyush",
    },
  ] satisfies SocialLink[],
};
