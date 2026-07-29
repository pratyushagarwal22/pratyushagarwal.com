import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
};

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="font-display text-[1.75rem] leading-tight text-text sm:text-[2rem]"
    >
      {children}
    </h2>
  );
}
