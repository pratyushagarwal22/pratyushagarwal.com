import type { ReactNode } from "react";

type EntryHeaderProps = {
  title: ReactNode;
  meta: ReactNode;
};

export function EntryHeader({ title, meta }: EntryHeaderProps) {
  return (
    <div className="flex flex-col gap-y-0.5 sm:flex-row sm:items-baseline sm:gap-x-3">
      <div className="min-w-0 sm:flex-1">{title}</div>
      <p className="font-body text-sm text-text-muted sm:shrink-0 sm:whitespace-nowrap">
        {meta}
      </p>
    </div>
  );
}
