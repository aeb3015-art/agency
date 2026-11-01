/**
 * Global site configuration.
 * Edit this file to change the agency name, contact details and optional links.
 * Leave optional values as empty strings to hide the related UI (booking button, social links, etc.).
 */
export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  contact: { email: string; phone: string; address: string; responseTime: string };
  links: { booking: string; whatsapp: string; linkedin: string; github: string };
  privacy: { lastUpdated: string; dataController: string; privacyEmail: string };
}

export const siteConfig: SiteConfig = {
  /** Placeholder brand name — replace with the real agency name. */
  name: "Forgeline",
  legalName: "Forgeline Software Ltd.", // TODO: replace with registered company name
  tagline: "We design, build, and scale software that moves businesses forward.",
  description:
    "From customer-facing websites and mobile applications to custom CRM platforms, backend infrastructure, and API integrations, we turn complex requirements into secure, scalable digital products.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    email: "hello@example.com", // TODO: real inbox
    phone: "", // e.g. "+1 555 010 0100" — hidden when empty
    address: "", // e.g. "Remote-first · London & Lisbon" — hidden when empty
    responseTime: "We reply to project inquiries within two business days.", // adjust to your real SLA
  },
  /** Optional destinations. Buttons only render when a valid https URL is supplied. */
  links: {
    booking: "", // e.g. "https://cal.com/your-agency/discovery"
    whatsapp: "", // e.g. "https://wa.me/15550100100"
    linkedin: "",
    github: "",
  },
  privacy: {
    lastUpdated: "2026-11-01",
    dataController: "Forgeline Software Ltd.", // TODO
    privacyEmail: "privacy@example.com", // TODO
  },
};

export function isValidUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
