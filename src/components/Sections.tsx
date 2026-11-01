import Link from "next/link";
import type { Service } from "@/content/services";
import type { CaseStudy } from "@/content/case-studies";
import { finalCta, techStack } from "@/content/content";
import { ArrowRight, ServiceIcon } from "./Icons";
import { Pill, Reveal, SectionHeading } from "./ui";
import { DashboardPanel, PhonePanel, StorefrontPanel } from "./Graphics";
import { Magnetic, SplitText, Spotlight } from "./motion";

export function ServiceCard({ service, index = 0, featured = false, bare = false }: { service: Service; index?: number; featured?: boolean; bare?: boolean }) {
  const Wrap = bare ? ({ children }: { children: React.ReactNode }) => <>{children}</> : ({ children }: { children: React.ReactNode }) => <Reveal as="li" delay={index * 60} className={`h-full min-w-0 ${featured ? "md:col-span-2" : ""}`}>{children}</Reveal>;
  return (
    <Wrap>
      <Spotlight className="h-full rounded-[var(--radius-lg)]">
      <Link href={`/services/${service.slug}`} className="card card-hover group relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
        <span className="mono absolute right-6 top-6 text-[0.65rem] text-fg-subtle">0{index + 1}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-ink-3 text-signal-bright">
          <ServiceIcon name={service.icon} />
        </span>
        <h3 className="mt-6 max-w-sm text-[1.35rem] font-semibold leading-tight tracking-tight">{service.title}</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">{service.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {service.capabilities.slice(0, 3).map((c) => (
            <li key={c}>
              <Pill>{c}</Pill>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-fg group-hover:text-signal-bright">
          Explore service
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
      </Spotlight>
    </Wrap>
  );
}

export function CaseCard({ cs, index = 0 }: { cs: CaseStudy; index?: number }) {
  return (
    <Reveal as="li" delay={index * 80} className="h-full min-w-0">
      <Link href={`/work/${cs.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
        <div className="relative h-64 overflow-hidden border-b border-line bg-[radial-gradient(ellipse_at_top,rgba(47,107,255,0.22),transparent_70%)] px-6 pt-6">
          <div className="origin-top scale-[0.92] transition-transform duration-500 group-hover:scale-[0.95]">
            {cs.mockup === "ecommerce" && <StorefrontPanel />}
            {cs.mockup === "crm" && <DashboardPanel />}
            {cs.mockup === "booking" && (
              <div className="flex justify-center">
                <PhonePanel />
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-2 to-transparent" />
          <span className="absolute left-4 top-4">
            <Pill tone={cs.status === "concept" ? "warn" : "accent"}>{cs.status === "concept" ? cs.client : "Client project"}</Pill>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">
            {cs.industry} · {cs.projectType}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight">{cs.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cs.summary}</p>
          <p className="mt-4 mono text-[0.68rem] text-fg-subtle">{cs.stack.flatMap((s) => s.items).slice(0, 5).join(" · ")}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-fg group-hover:text-signal-bright">
            View case study
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
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
        <SectionHeading eyebrow="Technical capabilities" title="What we build with." />
        <div className={`mt-12 grid gap-px overflow-hidden rounded-xl border border-line-dark bg-line-dark ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {techStack.map((g, i) => (
            <Reveal key={g.group} delay={i * 40} className="bg-paper p-5">
              <h3 id={i === 0 ? "tech-heading" : undefined} className="mono text-[0.65rem] uppercase tracking-wider text-signal">
                {g.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <li key={t} className="rounded-md bg-white px-2.5 py-1 text-sm text-fg-dark shadow-[0_1px_0_rgba(18,18,18,0.08)]">
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
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="cta-heading">
      <div className="absolute inset-0 dotgrid" aria-hidden="true" />
      <div className="glow absolute left-1/2 top-1/2 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="cta-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
            {headline}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">{supporting}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Link href={cta.href} className="btn btn-primary">
                {cta.label}
                <ArrowRight />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/process" className="btn btn-secondary">
                See how we work
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top_left,rgba(47,107,255,0.16),transparent_60%)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            <SplitText text={title} delay={0.1} />
          </h1>
          {description && (
            <Reveal delay={400}>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted sm:text-xl">{description}</p>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
