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
  // Server-rendered value can differ from the client's clock at hydration
  // time, so recompute on mount and suppress the (harmless) mismatch warning.
  const [label, setLabel] = useState(() => formatRelativeTime(iso));

  useEffect(() => {
    setLabel(formatRelativeTime(iso));

    const interval = setInterval(() => {
      setLabel(formatRelativeTime(iso));
    }, 60_000);

    return () => clearInterval(interval);
  }, [iso]);

  return (
    <time dateTime={iso} className={className} suppressHydrationWarning>
      {label}
    </time>
  );
}
