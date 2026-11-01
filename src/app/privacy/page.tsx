import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const { privacy, legalName } = siteConfig;
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description={`Last updated ${privacy.lastUpdated}. This policy explains what personal data we collect through this website, why, and how you can exercise your rights.`} />
      <section className="pb-24">
        <div className="container-x">
          <div className="prose-custom max-w-3xl space-y-8 text-fg-muted">
            <div>
              <h2 className="text-xl font-semibold text-fg">Who we are</h2>
              <p className="mt-2">
                {legalName} (“we”, “us”) is the data controller for personal data collected through this website. You can contact us about privacy at{" "}
                <a href={`mailto:${privacy.privacyEmail}`} className="text-cyan">
                  {privacy.privacyEmail}
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">What we collect</h2>
              <p className="mt-2">We collect only what we need to respond to you:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong className="text-fg">Project inquiry form:</strong> your name, work email, company name, optional website, the service and project details you provide, and your acknowledgement of this policy.
                </li>
                <li>
                  <strong className="text-fg">Technical data:</strong> when you submit the form we process your IP address temporarily to protect the form against abuse (rate limiting). Standard server logs may record requests for security and troubleshooting.
                </li>
              </ul>
              <p className="mt-2">This website does not use advertising cookies or third-party tracking scripts. If analytics are added in future, this policy will be updated first.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Why we process it</h2>
              <p className="mt-2">
                We use inquiry data to respond to your request, assess whether we can help, and follow up about your project. The legal basis is our legitimate interest in responding to business inquiries and, where applicable, steps taken at your request before entering a contract.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Where it goes</h2>
              <p className="mt-2">
                Inquiries are delivered to our team by email and/or stored in the customer relationship tool we use to manage leads. These providers process data on our behalf under their terms and data processing agreements. We do not sell personal data.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">How long we keep it</h2>
              <p className="mt-2">We keep inquiry data for as long as needed to handle your request and for a reasonable period afterwards for follow-up and record-keeping, unless you ask us to delete it sooner.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Your rights</h2>
              <p className="mt-2">
                Depending on where you live, you may have the right to access, correct, delete, or restrict the processing of your personal data, to object to processing, and to data portability. To exercise these rights, email{" "}
                <a href={`mailto:${privacy.privacyEmail}`} className="text-cyan">
                  {privacy.privacyEmail}
                </a>
                . You may also lodge a complaint with your local data protection authority.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Security</h2>
              <p className="mt-2">Data is transmitted over encrypted connections (TLS). Form input is validated on the server, and access to inquiry data is limited to staff who need it to respond to you.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-fg">Changes</h2>
              <p className="mt-2">We may update this policy from time to time. The date at the top reflects the latest revision.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
