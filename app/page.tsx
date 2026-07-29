import { contentContainerClassName } from "@/components/ContentContainer";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { SectionHeading } from "@/components/SectionHeading";
import { ShippingLog } from "@/components/ShippingLog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsStrip } from "@/components/StatsStrip";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 py-16">
        <div className="flex flex-col gap-16 sm:gap-24">
          <Hero />
          <ShippingLog />
          <StatsStrip />
          <Projects />
          <Publications />
          <Experience />
          <Writing />
          <section
            id="about"
            aria-labelledby="about-heading"
            className={`${contentContainerClassName} scroll-mt-20`}
          >
            <SectionHeading id="about-heading">About</SectionHeading>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
