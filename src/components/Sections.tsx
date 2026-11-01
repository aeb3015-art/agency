import Link from "next/link";
import type { Service } from "@/content/services";
import type { CaseStudy } from "@/content/case-studies";
import { finalCta, techStack } from "@/content/content";
import { ArrowRight, ServiceIcon } from "./Icons";
import { Pill, Reveal, SectionHeading } from "./ui";
import { CrmMock, EcommerceMock, PhoneMock } from "./Graphics";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Reveal as="li" delay={index * 60} className="h-full">
      <Link href={`/services/${service.slug}`} className="card card-hover group flex h-full flex-col p-6 sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-gradient-to-br from-blue/20 to-cyan/10 text-cyan">
          <ServiceIcon name={service.icon} />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fg-muted">{service.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {service.capabilities.map((c) => (
            <li key={c}>
              <Pill>{c}</Pill>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-cyan">
          Explore service
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export function CaseCard({ cs, index = 0 }: { cs: CaseStudy; index?: number }) {
  const Mock = { ecommerce: EcommerceMock, crm: CrmMock, booking: PhoneMock }[cs.mockup];
  return (
    <Reveal as="li" delay={index * 80} className="h-full">
      <Link href={`/work/${cs.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
        <div className="relative border-b border-line bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_70%)] p-5">
          <div className={cs.mockup === "booking" ? "py-2" : ""}>
            <Mock />
          </div>
          <span className="absolute left-4 top-4">
            <Pill tone={cs.status === "concept" ? "warn" : "accent"}>{cs.status === "concept" ? cs.client : "Client project"}</Pill>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="mono text-xs text-fg-subtle">
            {cs.industry} · {cs.projectType}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">{cs.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cs.summary}</p>
          <dl className="mt-4 grid gap-2 text-sm">
            <div>
              <dt className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">Challenge</dt>
              <dd className="text-fg-muted">{cs.challenge.split(".")[0]}.</dd>
            </div>
            <div>
              <dt className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">Stack</dt>
              <dd className="text-fg-muted">{cs.stack.flatMap((s) => s.items).slice(0, 5).join(" · ")}</dd>
            </div>
          </dl>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cyan">
            View case study
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function TechStackSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="light py-20 sm:py-28" aria-labelledby="tech-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Technical capabilities" title="A capabilities catalogue, grouped by engineering discipline." description="These are technologies we work with regularly. We choose a minimal, coherent set for each project rather than using everything at once." />
        <div className={`mt-12 grid gap-4 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {techStack.map((g, i) => (
            <Reveal key={g.group} delay={i * 50} className="card p-5">
              <h3 id={i === 0 ? "tech-heading" : undefined} className="mono text-xs uppercase tracking-wider text-[#0e7490]">
                {g.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <li key={t} className="rounded-md border border-[rgba(13,19,34,0.1)] bg-surface-light px-2.5 py-1 text-sm text-fg-dark">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ headline = finalCta.headline, supporting = finalCta.supporting, cta = finalCta.cta }: { headline?: string; supporting?: string; cta?: { label: string; href: string } }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="cta-heading">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.22),transparent_65%)] blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {headline}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fg-muted">{supporting}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={cta.href} className="btn btn-primary">
              {cta.label}
            </Link>
            <Link href="/process" className="btn btn-secondary">
              See how we work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_60%)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-fg-muted sm:text-xl">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
