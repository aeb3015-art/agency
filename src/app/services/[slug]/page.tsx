import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site";
import { ServiceVisual } from "@/components/Graphics";
import { Pill, Reveal, SectionHeading } from "@/components/ui";
import { CaseCard, FinalCta } from "@/components/Sections";
import { Check, ServiceIcon } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.metaDescription, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = caseStudies.filter((c) => c.relatedServices.includes(s.slug));
  const others = services.filter((o) => o.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/services/${s.slug}`,
  };

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_60%)]" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mono text-xs text-fg-subtle">
              <Link href="/services" className="hover:text-fg">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-fg-muted">{s.navTitle}</span>
            </nav>
            <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-gradient-to-br from-blue/20 to-cyan/10 text-cyan">
              <ServiceIcon name={s.icon} />
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">{s.headline}</h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{s.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/contact?service=${s.slug}`} className="btn btn-primary">
                Start a Project
              </Link>
              <Link href="/process" className="btn btn-secondary">
                How we work
              </Link>
            </div>
          </div>
          <div className="lg:pl-6">
            <ServiceVisual kind={s.visual} />
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="border-t border-line py-20 sm:py-24" aria-labelledby="offerings">
        <div className="container-x">
          <SectionHeading eyebrow="What we build" title="Typical engagements" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o, i) => (
              <Reveal key={o.title} as="li" delay={i * 40}>
                <div className="card h-full p-5">
                  <h3 className="font-semibold">{o.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{o.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How we do it */}
      <section className="light py-20 sm:py-24" aria-labelledby="practices">
        <div className="container-x">
          <SectionHeading eyebrow="How we do it" title="Engineering practices and what they mean for you" description="Technical terms matter when they change outcomes. Each practice below is paired with the practical benefit it delivers." />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {s.practices.map((g, gi) => (
              <Reveal key={g.group} delay={gi * 60} className="card p-6">
                <h3 className="mono text-xs uppercase tracking-wider text-[#0e7490]">{g.group}</h3>
                <dl className="mt-4 divide-y divide-[rgba(13,19,34,0.08)]">
                  {g.items.map((it) => (
                    <div key={it.term} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="text-sm font-semibold text-fg-dark">{it.term}</dt>
                      <dd className="text-sm text-fg-dark-muted">{it.detail}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
          {s.note && (
            <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-[rgba(13,19,34,0.1)] bg-white p-5 text-sm leading-relaxed text-fg-dark-muted">
              <span className="font-semibold text-fg-dark">Note: </span>
              {s.note}
            </p>
          )}
        </div>
      </section>

      {/* Benefits + deliverables */}
      <section className="py-20 sm:py-24" aria-labelledby="benefits">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="Business value" title="What this delivers" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.benefits.map((b) => (
                <li key={b.title} className="rounded-lg border border-line bg-white/[0.02] p-5">
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">{b.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 self-start">
            <h3 className="mono text-xs uppercase tracking-wider text-cyan">Typical deliverables</h3>
            <ul className="mt-4 space-y-2.5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {d}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
              {s.capabilities.map((c) => (
                <li key={c}>
                  <Pill>{c}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line py-20 sm:py-24" aria-labelledby="related-work">
          <div className="container-x">
            <SectionHeading eyebrow="Related work" title="Where this service shows up in practice" />
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <CaseCard key={c.slug} cs={c} index={i} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-line py-14" aria-label="Other services">
        <div className="container-x">
          <p className="eyebrow">Other services</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg-muted transition-colors hover:border-cyan/50 hover:text-fg">
                  <ServiceIcon name={o.icon} className="h-4 w-4 text-cyan" />
                  {o.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
