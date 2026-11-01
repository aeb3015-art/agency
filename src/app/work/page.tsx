import type { Metadata } from "next";
import { PageHero, FinalCta } from "@/components/Sections";
import { WorkGrid } from "@/components/WorkGrid";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Work — Case Studies & Concept Projects",
  description: "Illustrative case studies showing how we design and build e-commerce platforms, custom CRM dashboards and mobile booking apps — architecture, stack, and engineering decisions.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="How we approach real business problems." description="The projects below are concept projects and illustrative solutions. They show how we think about architecture, interfaces, integrations and trade-offs. Delivered client work is marked separately when it is published, and we only cite results we can evidence." />
      <section className="container-x pb-12">
        <Photo id="workshop" priority aspect="aspect-[21/9]" sizes="100vw" className="rounded-2xl border border-line" />
      </section>
      <section className="pb-20 sm:pb-28" aria-label="Case studies">
        <div className="container-x">
          <WorkGrid />
        </div>
      </section>
      <FinalCta headline="Want to see how this applies to your product?" supporting="Share what you are building and we will walk you through a comparable approach — architecture, stack, and a realistic plan." />
    </>
  );
}
