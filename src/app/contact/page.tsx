import type { Metadata } from "next";
import { isValidUrl, siteConfig } from "@/content/site";
import { serviceSlugToOption } from "@/lib/inquiry-schema";
import { InquiryForm } from "@/components/InquiryForm";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Start a Project — Contact",
  description: "Tell us about your website, app, CRM, API or software project. We will help define the scope, recommend a technical approach and map the next steps.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const defaultService = service ? serviceSlugToOption[service] : undefined;
  const { contact, links } = siteConfig;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_60%)]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="eyebrow">Start a project</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:leading-[1.05]">Tell us what you are building.</h1>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted">Share a few details and we will come back with questions, an initial view on scope and approach, and a suggested next step — usually a short discovery call.</p>

          <ul className="mt-8 space-y-3">
            {["A reply within two business days", "A clear recommendation on technical approach", "An honest view on scope, timeline, and budget range", "No obligation and no sales pressure"].map((t) => (
              <li key={t} className="flex gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-line bg-white/[0.02] p-5">
            <h2 className="mono text-xs uppercase tracking-wider text-fg-subtle">Prefer another channel?</h2>
            <p className="mt-3 text-sm">
              Email{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-cyan underline-offset-4 hover:underline">
                {contact.email}
              </a>
            </p>
            {contact.phone && (
              <p className="mt-1 text-sm">
                Call{" "}
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-semibold text-cyan underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </p>
            )}
            {(isValidUrl(links.booking) || isValidUrl(links.whatsapp)) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {isValidUrl(links.booking) && (
                  <a href={links.booking} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !min-h-[2.6rem] text-sm">
                    Book a discovery call
                  </a>
                )}
                {isValidUrl(links.whatsapp) && (
                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !min-h-[2.6rem] text-sm">
                    Message on WhatsApp
                  </a>
                )}
              </div>
            )}
            <p className="mt-4 text-xs text-fg-subtle">{contact.responseTime}</p>
          </div>
        </div>

        <div>
          <InquiryForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
