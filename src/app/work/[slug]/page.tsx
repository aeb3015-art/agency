import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { services } from "@/content/services";
import { ArchitectureDiagram, CrmMock, EcommerceMock, PhoneMock } from "@/components/Graphics";
import { Pill, Reveal, SectionHeading } from "@/components/ui";
import { FinalCta } from "@/components/Sections";
import { Check, ServiceIcon } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return { title: `${c.title} (${c.client})`, description: c.metaDescription, alternates: { canonical: `/work/${c.slug}` } };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mono text-xs uppercase tracking-wider text-cyan">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const Mock = { ecommerce: EcommerceMock, crm: CrmMock, booking: PhoneMock }[c.mockup];
  const related = services.filter((s) => c.relatedServices.includes(s.slug));
  const isConcept = c.status === "concept";

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.14),transparent_60%)]" aria-hidden="true" />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="mono text-xs text-fg-subtle">
            <Link href="/work" className="hover:text-fg">
              Work
            </Link>
            <span className="mx-2">/</span>
            <span className="text-fg-muted">{c.industry}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Pill tone={isConcept ? "warn" : "accent"}>{isConcept ? c.client : "Delivered client project"}</Pill>
            <Pill>{c.projectType}</Pill>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">{c.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg-muted">{c.summary}</p>
          {isConcept && (
            <p className="mt-6 max-w-3xl rounded-lg border border-violet/30 bg-violet/10 px-4 py-3 text-sm text-fg-muted">
              <strong className="text-fg">Concept project.</strong> This case study illustrates how we would approach this type of product. It is not a delivered client engagement and no performance metrics are claimed.
            </p>
          )}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <dl className="grid gap-5 sm:grid-cols-2">
              {[
                ["Industry", c.industry],
                ["Project type", c.projectType],
                ["Status", isConcept ? "Concept / illustrative" : "Delivered"],
                ["Related services", related.map((r) => r.navTitle).join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line bg-white/[0.02] p-4">
                  <dt className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-2xl border border-line bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_70%)] p-6">
              <Mock />
              <p className="mono mt-3 text-center text-[0.65rem] text-fg-subtle">Illustrative interface mockup</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Block title="Business challenge">
            <p className="text-lg leading-relaxed text-fg-muted">{c.challenge}</p>
          </Block>
          <div className="grid gap-10">
            <Block title="Target users">
              <ul className="space-y-2">
                {c.targetUsers.map((u) => (
                  <li key={u} className="flex gap-2.5 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {u}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Scope of work">
              <ul className="flex flex-wrap gap-1.5">
                {c.scope.map((s) => (
                  <li key={s}>
                    <Pill>{s}</Pill>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </section>

      <section className="light py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Solution" title="What we would build" description={c.solution} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f, i) => (
              <Reveal key={f.title} as="li" delay={i * 40}>
                <div className="card h-full p-5">
                  <h3 className="font-semibold text-fg-dark">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-fg-dark-muted">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x">
          <Block title="Simplified architecture">
            <ArchitectureDiagram nodes={c.architecture.nodes} />
            <p className="mt-4 max-w-2xl text-sm text-fg-muted">{c.architecture.note}</p>
          </Block>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Block title="Technical stack">
              <dl className="grid gap-3 sm:grid-cols-2">
                {c.stack.map((s) => (
                  <div key={s.label} className="rounded-lg border border-line bg-white/[0.02] p-4">
                    <dt className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">{s.label}</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {s.items.map((i) => (
                        <Pill key={i}>{i}</Pill>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>
            <Block title="Security & performance considerations">
              <ul className="space-y-2.5">
                {c.securityPerformance.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Engineering challenges" title="The hard parts, and how we handle them" />
          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            {c.engineeringChallenges.map((e, i) => (
              <li key={e.title} className="card p-5">
                <span className="mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{e.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {c.results.map((r) => (
              <div key={r.label} className="rounded-lg border border-line bg-white/[0.02] p-5">
                <h3 className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">{r.label}</h3>
                <p className="mt-2 text-sm text-fg-muted">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-14" aria-label="Related services">
        <div className="container-x">
          <p className="eyebrow">Related services</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((o) => (
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

      <FinalCta headline="Building something similar?" supporting="Tell us about your product and we will outline an approach, a stack, and a realistic plan for your situation." />
    </>
  );
}
