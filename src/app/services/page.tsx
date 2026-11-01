import type { Metadata } from "next";
import { services } from "@/content/services";
import { FinalCta, PageHero, ServiceCard, TechStackSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Services — Web, Mobile, CRM, API, SaaS & Cloud Development",
  description: "Custom website and web application development, mobile apps, custom CRM platforms, API development and integrations, SaaS products, and cloud, DevOps and maintenance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Six engineering disciplines. One accountable team." description="Each service below can be engaged on its own, but most products need several of them working together — a website backed by an API, a CRM feeding a mobile app, infrastructure that keeps all of it running. We design the pieces to fit." />
      <section className="pb-20 sm:pb-28" aria-label="All services">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </ul>
        </div>
      </section>
      <TechStackSection compact />
      <FinalCta headline="Not sure which service you need?" supporting="Most projects start with a conversation about the business problem, not the technology. Tell us what is not working and we will help scope the right approach." />
    </>
  );
}
