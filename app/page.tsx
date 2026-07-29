import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { ShippingLog } from "@/components/ShippingLog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsStrip } from "@/components/StatsStrip";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 py-10 sm:py-16">
        <div className="flex flex-col gap-14 sm:gap-24">
          <Hero />
          <ShippingLog />
          <StatsStrip />
          <Projects />
          <Publications />
          <Experience />
          <Writing />
          <About />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
