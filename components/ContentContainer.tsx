import type { ReactNode } from "react";

/** Single page content width — use on every main-column section. */
export const contentContainerClassName =
  "mx-auto w-full max-w-[900px] px-6";

type ContentContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Shared body column wrapper (900px). Header/footer stay at 1200px. */
export function ContentContainer({
  children,
  className,
}: ContentContainerProps) {
  return (
    <div
      className={[contentContainerClassName, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
