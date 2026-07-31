import { contentContainerClassName, sectionScrollMarginClassName } from "./ContentContainer";
import { GitHubSlot } from "./GitHubSlot";
import { SectionHeading } from "./SectionHeading";
import { ShippingLogList } from "./ShippingLogList";

export function ShippingLog() {
  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className={`${contentContainerClassName} ${sectionScrollMarginClassName}`}
    >
      <SectionHeading id="now-heading">Now</SectionHeading>
      <p className="mt-2 font-body text-base text-text-muted">
        A dated feed of what I ship — commits, writes, and milestones — click each item to know more.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        <GitHubSlot />

        <ShippingLogList />
      </div>
    </section>
  );
}
