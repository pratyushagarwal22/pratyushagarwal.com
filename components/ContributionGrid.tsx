import type { ContributionCalendar, ContributionDay } from "@/lib/github";

type ContributionGridProps = {
  calendar: ContributionCalendar;
};

const CONTRIB_BG: Record<ContributionDay["level"], string> = {
  0: "bg-contrib-0",
  1: "bg-contrib-1",
  2: "bg-contrib-2",
  3: "bg-contrib-3",
  4: "bg-contrib-4",
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

// Shared by the month-label row and the week columns so they stay aligned
// as cells resize responsively.
const WEEK_COLUMN_CLASS =
  "w-[14px] shrink-0 md:w-auto md:min-w-0 md:max-w-[14px] md:flex-1";

/**
 * Label for the first week column where each month appears. A label is
 * dropped when the next month starts within 2 columns, so adjacent labels
 * never overlap.
 */
function getMonthLabels(calendar: ContributionCalendar): (string | null)[] {
  const labels: (string | null)[] = calendar.weeks.map((week, index) => {
    const date = week.days[0]?.date;
    if (!date) {
      return null;
    }

    const month = Number.parseInt(date.slice(5, 7), 10) - 1;
    const prevDate = calendar.weeks[index - 1]?.days[0]?.date;
    const prevMonth =
      prevDate === undefined
        ? null
        : Number.parseInt(prevDate.slice(5, 7), 10) - 1;

    return month !== prevMonth ? (MONTH_NAMES[month] ?? null) : null;
  });

  for (let i = 0; i < labels.length; i += 1) {
    if (labels[i] === null) {
      continue;
    }
    const hasCloseNeighbor = labels
      .slice(i + 1, i + 3)
      .some((label) => label !== null);
    if (hasCloseNeighbor) {
      labels[i] = null;
    }
  }

  return labels;
}

export function ContributionGrid({ calendar }: ContributionGridProps) {
  const monthLabels = getMonthLabels(calendar);

  return (
    <div className="min-w-0 max-w-full">
      <div
        tabIndex={0}
        className="max-w-full overflow-x-auto overscroll-x-contain max-md:[direction:rtl] md:[direction:ltr] [-webkit-overflow-scrolling:touch] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="w-full max-md:w-max [direction:ltr]">
          <div
            aria-hidden="true"
            className="mb-1 flex w-full gap-0.5 font-mono text-[0.6875rem] leading-4 text-text-muted"
          >
            {calendar.weeks.map((week, index) => (
              <div
                key={week.days[0]?.date ?? `label-${index}`}
                className={`h-4 ${WEEK_COLUMN_CLASS}`}
              >
                {monthLabels[index] ? (
                  <span className="block whitespace-nowrap">
                    {monthLabels[index]}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex w-full gap-0.5">
            {calendar.weeks.map((week) => (
              <div
                key={week.days[0]?.date ?? "empty"}
                className={`flex flex-col gap-0.5 ${WEEK_COLUMN_CLASS}`}
              >
                {week.days.map((day) => (
                  <div
                    key={day.date}
                    className={`aspect-square w-full ${CONTRIB_BG[day.level]}`}
                    aria-label={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="font-body text-sm text-text-muted">
          {calendar.totalContributions.toLocaleString()} contributions in the
          last year
        </p>
        <div className="flex items-center gap-1 font-mono text-[0.6875rem] text-text-muted">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className={`h-2.5 w-2.5 ${CONTRIB_BG[level]}`}
              aria-hidden="true"
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
