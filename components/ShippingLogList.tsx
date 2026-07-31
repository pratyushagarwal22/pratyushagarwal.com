"use client";

import { useState } from "react";
import { log } from "@/data/log";
import { LogEntry } from "./LogEntry";
import { ShowMoreButton } from "./ShowMoreButton";

const DEFAULT_VISIBLE = 5;

export function ShippingLogList() {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...log].sort((a, b) => b.date.localeCompare(a.date));
  const total = sorted.length;
  const hiddenCount = Math.max(0, total - DEFAULT_VISIBLE);
  const visible = showAll ? sorted : sorted.slice(0, DEFAULT_VISIBLE);

  return (
    <div>
      <ol id="now-entries" className="list-none p-0">
        {visible.map((entry, index) => (
          <li key={entry.id}>
            <LogEntry
              entry={entry}
              isLast={index === visible.length - 1}
            />
          </li>
        ))}
      </ol>

      {total > DEFAULT_VISIBLE ? (
        <ShowMoreButton
          expanded={showAll}
          count={hiddenCount}
          controlsId="now-entries"
          onClick={() => setShowAll((v) => !v)}
        />
      ) : null}
    </div>
  );
}
