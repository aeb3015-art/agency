import type { Metadata } from "next";
import { processSteps, whyUs } from "@/content/content";
import { PipelineGraphic } from "@/components/Graphics";
import { Reveal, SectionHeading } from "@/components/ui";
import { FinalCta, PageHero } from "@/components/Sections";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Process — How We Deliver Software Projects",
  description: "Our seven-stage development process: discovery, UX and product design, architecture, development, QA and security review, deployment, and ongoing maintenance — with deliverables at every stage.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Process" title="Seven stages. Clear deliverables at each one." description="You should never wonder what you are paying for or what comes next. Every stage ends with something concrete you can review, and nothing moves forward without your sign-off." />
      <section className="pb-20 sm:pb-28" aria-label="Process stages">
        <div className="container-x">
          <ol className="relative grid gap-6">
            <div className="absolute left-[1.35rem] top-6 bottom-6 hidden w-px bg-gradient-to-b from-cyan via-blue to-violet sm:block" aria-hidden="true" />
            {processSteps.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 40} className="relative sm:pl-16">
                <span className="absolute left-0 top-5 hidden h-11 w-11 items-center justify-center rounded-full border border-cyan/50 bg-bg mono text-xs text-cyan sm:flex" aria-hidden="true">
                  {p.step}
                </span>
                <div className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <span className="mono text-xs text-cyan sm:hidden">Stage {p.step}</span>
                    <h2 className="text-2xl font-semibold tracking-tight">{p.title}</h2>
                    <p className="mt-3 leading-relaxed text-fg-muted">{p.description}</p>
                  </div>
                  <div className="rounded-lg border border-line bg-white/[0.02] p-5">
                    <h3 className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">Client deliverables</h3>
                    <ul className="mt-3 space-y-2">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="light py-20 sm:py-28" aria-labelledby="quality">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Built-in quality" title="Every change goes through the same pipeline." description="Linting, type checks, automated tests, and a build run on every commit. Changes are deployed to staging for review before they reach production, and every release has a rollback path." />
          </div>
          <PipelineGraphic />
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="commitments">
        <div className="container-x">
          <SectionHeading eyebrow="Our commitments" title="What every engagement includes" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <li key={w.title} className="rounded-lg border border-line bg-white/[0.02] p-4">
                <h3 className="text-sm font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{w.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
