import type { Metadata } from "next";
import { aboutContent } from "@/content/content";
import { siteConfig } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";
import { FinalCta, PageHero } from "@/components/Sections";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "About — A Software Development Agency Built on Clear Delivery",
  description: `How ${siteConfig.name} approaches software delivery: design and engineering working together, understanding the client's business, clear communication, and maintainable implementation.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const facts = Object.entries(aboutContent.facts).filter(([, v]) => v);
  return (
    <>
      <PageHero eyebrow="About" title="A technical partner for the long run." description={aboutContent.intro}>
        {facts.length > 0 && (
          <dl className="mt-10 flex flex-wrap gap-8">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono text-[0.65rem] uppercase tracking-wider text-fg-subtle">{k === "teamSize" ? "Team" : k}</dt>
                <dd className="mt-1 text-lg font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHero>

      <section className="pb-16">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-[2fr_1fr_1fr]">
          <Reveal className="col-span-2 lg:col-span-1">
            <Photo id="boardroom" priority aspect="aspect-[16/10] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 640px, 100vw" className="rounded-2xl border border-line" />
          </Reveal>
          <Reveal delay={100}>
            <Photo id="presentation" aspect="aspect-[4/5]" sizes="(min-width: 1024px) 300px, 50vw" className="rounded-2xl border border-line" />
          </Reveal>
          <Reveal delay={200}>
            <Photo id="focus" aspect="aspect-[4/5]" sizes="(min-width: 1024px) 300px, 50vw" className="rounded-2xl border border-line" />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28" aria-labelledby="approach">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="Delivery that stays clear from kickoff to handover" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aboutContent.approach.map((a, i) => (
              <Reveal key={a.title} as="li" delay={i * 40}>
                <div className="card h-full p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="light py-20 sm:py-28" aria-labelledby="principles">
        <div className="container-x">
          <SectionHeading eyebrow="Principles" title="Three ideas behind every project" />
          <ol className="mt-10 grid gap-4 lg:grid-cols-3">
            {aboutContent.principles.map((p, i) => (
              <li key={p.title} className="card p-6">
                <span className="mono text-xs text-[#2f6bff]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg-dark">“{p.title}”</h3>
                <p className="mt-2 text-sm text-fg-dark-muted">{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {aboutContent.team.length > 0 && (
        <section className="py-20 sm:py-28" aria-labelledby="team">
          <div className="container-x">
            <SectionHeading eyebrow="Team" title="The people you will work with" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aboutContent.team.map((m) => (
                <li key={m.name} className="card p-6">
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="mono text-xs text-cyan">{m.role}</p>
                  <p className="mt-2 text-sm text-fg-muted">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta headline="Let's talk about what you are building." supporting="A short discovery conversation is usually enough to tell whether we are the right partner — and to give you a clearer picture of scope either way." />
    </>
  );
}
