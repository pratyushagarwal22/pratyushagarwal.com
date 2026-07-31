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

export function ContributionGrid({ calendar }: ContributionGridProps) {
  return (
    <div className="min-w-0 max-w-full">
      <div
        tabIndex={0}
        className="max-w-full overflow-x-auto overscroll-x-contain max-md:[direction:rtl] md:[direction:ltr] [-webkit-overflow-scrolling:touch] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="flex w-full gap-0.5 max-md:w-max [direction:ltr]">
          {calendar.weeks.map((week) => (
            <div
              key={week.days[0]?.date ?? "empty"}
              className="flex w-[14px] shrink-0 flex-col gap-0.5 md:w-auto md:min-w-0 md:max-w-[14px] md:flex-1"
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
      <p className="mt-2 font-body text-sm text-text-muted">
        {calendar.totalContributions.toLocaleString()} contributions in the last year
      </p>
    </div>
  );
}
