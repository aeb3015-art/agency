import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { expertiseStrip, faqs, heroContent, problems, processSteps, whyUs } from "@/content/content";
import { siteConfig } from "@/content/site";
import { HeroStack } from "@/components/Graphics";
import { Enter, Magnetic, SplitText, Stagger, StaggerItem } from "@/components/motion";
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
            <Enter delay={0} from={{ y: 12 }}>
              <p className="eyebrow">{heroContent.eyebrow}</p>
            </Enter>
            <h1 id="hero-heading" className="mt-6 text-[2.9rem] font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              <SplitText text="Websites, apps, and business systems." delay={0.1} stagger={0.06} />{" "}
              <SplitText text="Engineered" className="serif-i text-signal-bright font-normal" delay={0.5} />{" "}
              <SplitText text="for growth." delay={0.6} stagger={0.06} />
            </h1>
            <Enter delay={0.75} from={{ y: 20 }}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">{heroContent.supporting}</p>
            </Enter>
            <Enter delay={0.9} from={{ y: 20 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Link href={heroContent.primaryCta.href} className="btn btn-primary">
                  {heroContent.primaryCta.label}
                  <ArrowRight />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={heroContent.secondaryCta.href} className="btn btn-secondary">
                  {heroContent.secondaryCta.label}
                </Link>
              </Magnetic>
            </Enter>
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

      {/* SERVICES — bento */}
      <section className="pb-20 sm:pb-28" aria-labelledby="services-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 pt-20 sm:flex-row sm:items-end sm:justify-between sm:pt-28">
            <SectionHeading eyebrow="Services" title="Six disciplines. One accountable team." />
            <ArrowLink href="/services" className="shrink-0">
              All services
            </ArrowLink>
          </div>
          <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <StaggerItem key={s.slug} as="li" className="h-full min-w-0">
                <ServiceCard service={s} index={i} bare />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PROBLEMS — paper */}
      <section className="light py-20 sm:py-28" aria-labelledby="problems-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Problems we solve" title="Sound familiar?" />
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => {
              const svc = services.find((s) => s.slug === p.service)!;
              return (
                <StaggerItem key={p.problem} as="li" className={i === problems.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <Link href={`/services/${svc.slug}`} className="card card-hover group flex h-full flex-col justify-between p-6 sm:p-7">
                    <span className="mono text-xs text-signal">0{i + 1}</span>
                    <p className="serif mt-10 text-2xl leading-snug text-fg-dark sm:text-[1.7rem]">“{p.problem}”</p>
                    <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                      {svc.navTitle}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Selected work" title="Concept projects that show how we think." />
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
            <SectionHeading eyebrow="Process" title="From idea to running software in seven stages." />
            <ArrowLink href="/process" className="shrink-0">
              Full process
            </ArrowLink>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} as="li" delay={i * 40} className="bg-ink">
                <div className="flex h-full flex-col p-6">
                  <span className="serif text-5xl text-signal-bright">{p.step}</span>
                  <h3 className="mt-6 text-lg font-semibold leading-snug">{p.title}</h3>
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
            <SectionHeading eyebrow="Why work with us" title="Practices you can hold us to." />
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
                  <h3 className="text-sm font-semibold">{w.title}</h3>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="faq-heading">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Questions we hear on most first calls." />
          <Accordion items={faqs.slice(0, 6)} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      <FinalCta />
    </>
  );
}
