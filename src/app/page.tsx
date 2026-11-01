import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { expertiseStrip, faqs, heroContent, problems, processSteps, whyUs } from "@/content/content";
import { siteConfig } from "@/content/site";
import { HeroStack } from "@/components/Graphics";
import { Accordion, ArrowLink, Reveal, SectionHeading } from "@/components/ui";
import { CaseCard, FinalCta, ServiceCard, TechStackSection } from "@/components/Sections";
import { ArrowRight, Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Websites, Apps & Business Systems Engineered for Growth`,
  description: heroContent.supporting,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const marqueeItems = [...expertiseStrip, ...heroContent.capabilityLabels];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 lg:pt-28 lg:pb-32" aria-labelledby="hero-heading">
        <div className="absolute inset-0 dotgrid" aria-hidden="true" />
        <div className="container-x relative grid min-w-0 items-center gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="relative z-10">
            <p className="eyebrow">{heroContent.eyebrow}</p>
            <h1 id="hero-heading" className="mt-6 text-[2.9rem] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              Websites, apps, and business systems.{" "}
              <span className="serif-i text-signal-bright font-normal">Engineered</span> for growth.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">{heroContent.supporting}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={heroContent.primaryCta.href} className="btn btn-primary">
                {heroContent.primaryCta.label}
                <ArrowRight />
              </Link>
              <Link href={heroContent.secondaryCta.href} className="btn btn-secondary">
                {heroContent.secondaryCta.label}
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                ["Web", "React · Next.js"],
                ["Mobile", "Flutter · Native"],
                ["Systems", "CRM · APIs · Cloud"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold">{k}</dt>
                  <dd className="mono mt-1 text-[0.68rem] text-fg-subtle">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="min-w-0 pt-6 sm:pt-16 lg:pt-20">
            <HeroStack />
            <p className="sr-only">Illustration of a connected product: an operations dashboard, a code editor, a deployment log and a mobile booking app working together.</p>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section aria-label="Areas of expertise" className="border-y border-line bg-ink-2/60 py-4">
        <div className="marquee-mask overflow-hidden">
          <ul className="marquee gap-10 px-5">
            {[...marqueeItems, ...marqueeItems].map((e, i) => (
              <li key={i} className="mono flex items-center gap-10 whitespace-nowrap text-sm text-fg-muted" aria-hidden={i >= marqueeItems.length}>
                {e}
                <span className="h-1 w-1 rounded-full bg-amber" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTRO STATEMENT */}
      <section className="py-20 sm:py-28" aria-label="Positioning">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <p className="eyebrow self-start">What we do</p>
          <Reveal>
            <p className="text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              We design, build, and scale software that moves businesses forward — <span className="serif-i text-fg-muted">from the first landing page to the backend, CRM and infrastructure behind it.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — bento */}
      <section className="pb-20 sm:pb-28" aria-labelledby="services-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Services" title="Six disciplines. One accountable team." description="Each service stands on its own and connects cleanly to the others." />
            <ArrowLink href="/services" className="shrink-0">
              All services
            </ArrowLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* PROBLEMS — paper */}
      <section className="light py-20 sm:py-28" aria-labelledby="problems-heading">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow="Problems we solve" title="Sound familiar?" description="Most projects start with a business problem, not a technology. Here is how we usually approach the common ones." />
            </div>
            <ol className="divide-y divide-line-dark border-y border-line-dark">
              {problems.map((p, i) => {
                const svc = services.find((s) => s.slug === p.service)!;
                return (
                  <Reveal key={p.problem} as="li" delay={i * 40} className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr]">
                    <span className="mono text-sm text-signal">0{i + 1}</span>
                    <div>
                      <p className="serif text-2xl leading-snug text-fg-dark sm:text-[1.75rem]">“{p.problem}”</p>
                      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <dt className="mono text-[0.62rem] uppercase tracking-wider text-fg-dark-muted">What we build</dt>
                          <dd className="mt-1 text-[0.95rem] leading-relaxed text-fg-dark">{p.solution}</dd>
                        </div>
                        <div>
                          <dt className="mono text-[0.62rem] uppercase tracking-wider text-fg-dark-muted">Outcome</dt>
                          <dd className="mt-1 text-[0.95rem] leading-relaxed text-fg-dark">{p.outcome}</dd>
                        </div>
                      </dl>
                      <Link href={`/services/${svc.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                        {svc.navTitle}
                        <ArrowRight />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Selected work" title="Illustrative solutions that show how we think." description="Concept projects demonstrating our approach to architecture, interfaces, and integrations. Clearly labelled; no client metrics claimed." />
            <ArrowLink href="/work" className="shrink-0">
              All work
            </ArrowLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <CaseCard key={cs.slug} cs={cs} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-ink-2/50 py-20 sm:py-28" aria-labelledby="process-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Development process" title="A clear path from idea to running software." description="Seven stages, each with defined deliverables, so you always know what you are getting and when." />
            <ArrowLink href="/process" className="shrink-0">
              Full process
            </ArrowLink>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 40} className="bg-ink">
                <div className="flex h-full flex-col p-6">
                  <span className="serif text-4xl text-signal-bright">{p.step}</span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
                  <p className="mono mt-auto pt-5 text-[0.62rem] uppercase tracking-wider text-fg-subtle">You receive</p>
                  <p className="mt-1 text-xs text-fg-muted">{p.deliverables.slice(0, 3).join(" · ")}</p>
                </div>
              </Reveal>
            ))}
            <li className="flex items-center justify-center bg-ink p-6">
              <Link href="/contact" className="btn btn-primary">
                Start at stage 01
                <ArrowRight />
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* TECH */}
      <TechStackSection />

      {/* WHY US */}
      <section className="py-20 sm:py-28" aria-labelledby="why-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Why work with us" title="Practices you can hold us to." description="We would rather describe how we work than make claims we cannot prove. Every engagement includes these." />
            <Link href="/about" className="btn btn-secondary mt-8">
              About the agency
            </Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} as="li" delay={i * 30} className="bg-ink">
                <div className="flex h-full gap-3 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal-bright">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{w.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="faq-heading">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Questions we hear on most first calls." description="Timelines and pricing always depend on scope, integrations, and complexity — but here is how we think about the common questions." />
          <Accordion items={faqs} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      <FinalCta />
    </>
  );
}
