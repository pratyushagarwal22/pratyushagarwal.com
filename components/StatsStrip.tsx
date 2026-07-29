import { stats } from "@/data/stats";

export function StatsStrip() {
  return (
    <section
      aria-label="Key stats"
      className="w-full max-w-[900px] border-y border-border py-8"
    >
      <dl className="grid grid-cols-2 items-start gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.id} className="flex min-w-0 flex-col-reverse gap-1.5">
            <dt className="font-body text-sm leading-snug text-text-muted">
              {stat.label}
            </dt>
            <dd className="font-display text-xl font-medium leading-snug tracking-tight text-text">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
