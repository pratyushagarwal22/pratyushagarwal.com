import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SectionHeading } from "@/components/SectionHeading";
import { ShippingLog } from "@/components/ShippingLog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsStrip } from "@/components/StatsStrip";

const sections = [
  { id: "experience", title: "Experience" },
  { id: "writing", title: "Writing" },
  { id: "about", title: "About" },
] as const;

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader />
      <main id="main" className="mx-auto w-full max-w-[900px] flex-1 px-6 py-16">
        <div className="flex flex-col gap-16 sm:gap-24">
          <Hero />
          <div className="w-full max-w-[720px]">
            <ShippingLog />
          </div>
          <StatsStrip />
          <Projects />
          <div className="flex w-full max-w-[720px] flex-col gap-16 sm:gap-24">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-20"
              >
                <SectionHeading id={`${section.id}-heading`}>
                  {section.title}
                </SectionHeading>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
