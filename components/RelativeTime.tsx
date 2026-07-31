"use client";

import { useEffect, useState } from "react";

type RelativeTimeProps = {
  iso: string;
  className?: string;
};

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const absMs = Math.abs(diffMs);

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (absMs < minute) {
    return "just now";
  }

  const divisions: { ms: number; singular: string; plural: string }[] = [
    { ms: year, singular: "yr", plural: "yrs" },
    { ms: month, singular: "mo", plural: "mos" },
    { ms: week, singular: "wk", plural: "wks" },
    { ms: day, singular: "day", plural: "days" },
    { ms: hour, singular: "hr", plural: "hrs" },
    { ms: minute, singular: "min", plural: "mins" },
  ];

  for (const { ms, singular, plural } of divisions) {
    if (absMs >= ms) {
      const value = Math.round(absMs / ms);
      const unit = value === 1 ? singular : plural;
      return `${value} ${unit} ago`;
    }
  }

  return "just now";
}

export function RelativeTime({ iso, className }: RelativeTimeProps) {
  // Relative time depends on the client clock, so the server (ISR) value can
  // be arbitrarily stale. Render a placeholder on the server and during
  // hydration (identical output, so no mismatch), then compute from the real
  // client time on mount. The null -> string state change guarantees React
  // commits the fresh value to the DOM immediately.
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatRelativeTime(iso));

    const interval = setInterval(() => {
      setLabel(formatRelativeTime(iso));
    }, 60_000);

    return () => clearInterval(interval);
  }, [iso]);

  return (
    <time dateTime={iso} className={className}>
      {label ?? "\u00A0"}
    </time>
  );
}
