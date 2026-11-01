import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { expertiseStrip, faqs, heroContent, problems, processSteps, whyUs } from "@/content/content";
import { siteConfig } from "@/content/site";
import { SystemDiagram } from "@/components/Graphics";
import { Accordion, ArrowLink, Pill, Reveal, SectionHeading } from "@/components/ui";
import { CaseCard, FinalCta, ServiceCard, TechStackSection } from "@/components/Sections";
import { Check } from "@/components/Icons";

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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24" aria-labelledby="hero-heading">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute -top-40 right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-3xl float-slow" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{heroContent.eyebrow}</p>
            <h1 id="hero-heading" className="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.9rem]">
              <span className="text-gradient">{heroContent.headline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">{heroContent.supporting}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={heroContent.primaryCta.href} className="btn btn-primary">
                {heroContent.primaryCta.label}
              </Link>
              <Link href={heroContent.secondaryCta.href} className="btn btn-secondary">
                {heroContent.secondaryCta.label}
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Capabilities">
              {heroContent.capabilityLabels.map((c) => (
                <li key={c}>
                  <Pill tone="accent">{c}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SystemDiagram />
            <p className="sr-only">Diagram showing how a website, API layer, backend services, database, custom CRM and mobile app connect as one system.</p>
          </div>
        </div>
      </section>

      {/* EXPERTISE STRIP */}
      <section aria-label="Areas of expertise" className="border-y border-line bg-bg-elev/50">
        <div className="container-x py-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-fg-muted">
            {expertiseStrip.map((e) => (
              <li key={e} className="mono flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 sm:py-28" aria-labelledby="services-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Services" title="Everything from the first page to the backend behind it." description="Six disciplines, one team. Each service stands on its own and connects cleanly to the others." />
            <ArrowLink href="/services" className="shrink-0">
              All services
            </ArrowLink>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="light py-20 sm:py-28" aria-labelledby="problems-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Business problems we solve" title="Sound familiar? Here is how we usually approach it." />
          <ol className="mt-12 grid gap-4 lg:grid-cols-2">
            {problems.map((p, i) => {
              const svc = services.find((s) => s.slug === p.service)!;
              return (
                <Reveal key={p.problem} as="li" delay={i * 50} className={i === problems.length - 1 ? "lg:col-span-2" : ""}>
                  <div className="card h-full p-6 sm:p-7">
                    <p className="text-lg font-semibold tracking-tight text-fg-dark">“{p.problem}”</p>
                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="mono text-[0.65rem] uppercase tracking-wider text-[#0e7490]">Solution</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-fg-dark-muted">{p.solution}</dd>
                      </div>
                      <div>
                        <dt className="mono text-[0.65rem] uppercase tracking-wider text-[#0e7490]">Outcome</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-fg-dark-muted">{p.outcome}</dd>
                      </div>
                    </dl>
                    <Link href={`/services/${svc.slug}`} className="mt-5 inline-block text-sm font-semibold text-[#0e7490] underline-offset-4 hover:underline">
                      {svc.navTitle} →
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Selected work" title="Illustrative solutions that show how we think." description="These concept projects demonstrate our approach to architecture, interfaces, and integrations. They are clearly labelled and claim no client metrics." />
            <ArrowLink href="/work" className="shrink-0">
              All work
            </ArrowLink>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <CaseCard key={cs.slug} cs={cs} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-bg-elev/40 py-20 sm:py-28" aria-labelledby="process-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Development process" title="A clear path from idea to running software." description="Seven stages, each with defined deliverables, so you always know what you are getting and when." />
            <ArrowLink href="/process" className="shrink-0">
              Full process
            </ArrowLink>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 40}>
                <div className="card h-full p-5">
                  <span className="mono text-xs text-cyan">{p.step}</span>
                  <h3 className="mt-2 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
                  <p className="mono mt-3 text-[0.65rem] uppercase tracking-wider text-fg-subtle">You receive</p>
                  <p className="mt-1 text-xs text-fg-muted">{p.deliverables.slice(0, 3).join(" · ")}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TECH */}
      <TechStackSection />

      {/* WHY US */}
      <section className="py-20 sm:py-28" aria-labelledby="why-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading eyebrow="Why work with us" title="Working practices you can hold us to." description="We would rather describe how we work than make claims we cannot prove. These are the practices every engagement includes." />
            <Link href="/about" className="btn btn-secondary mt-8">
              About the agency
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} as="li" delay={i * 30}>
                <div className="flex h-full gap-3 rounded-lg border border-line bg-white/[0.02] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
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
