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
    <div>
      <div className="flex w-fit gap-0.5">
        {calendar.weeks.map((week) => (
          <div key={week.days[0]?.date ?? "empty"} className="flex flex-col gap-0.5">
            {week.days.map((day) => (
              <div
                key={day.date}
                className={`size-2.5 ${CONTRIB_BG[day.level]}`}
                aria-label={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 font-body text-sm text-text-muted">
        {calendar.totalContributions.toLocaleString()} contributions in the last year
      </p>
    </div>
  );
}
