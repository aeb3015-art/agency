import Link from "next/link";
import { isValidUrl, mainNav, siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, links } = siteConfig;
  return (
    <footer className="border-t border-line bg-bg-elev/40">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-fg">
              <Logo />
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{siteConfig.tagline}</p>
            <div className="mt-5 flex flex-col gap-1.5 text-sm">
              <a href={`mailto:${contact.email}`} className="text-fg hover:text-cyan">
                {contact.email}
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-fg hover:text-cyan">
                  {contact.phone}
                </a>
              )}
              {contact.address && <span className="text-fg-muted">{contact.address}</span>}
            </div>
            {(isValidUrl(links.linkedin) || isValidUrl(links.github)) && (
              <div className="mt-5 flex gap-4 text-sm">
                {isValidUrl(links.linkedin) && (
                  <a href={links.linkedin} rel="noopener noreferrer" target="_blank" className="text-fg-muted hover:text-fg">
                    LinkedIn
                  </a>
                )}
                {isValidUrl(links.github) && (
                  <a href={links.github} rel="noopener noreferrer" target="_blank" className="text-fg-muted hover:text-fg">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="eyebrow">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-fg-muted hover:text-fg">
                    {s.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-fg-muted hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-fg-muted hover:text-fg">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Start a project</h2>
            <p className="mt-4 text-sm text-fg-muted">{contact.responseTime}</p>
            <Link href="/contact" className="btn btn-secondary mt-4 w-full lg:w-auto">
              Discuss Your Project
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="mono">Designed and engineered in-house.</p>
        </div>
      </div>
    </footer>
  );
}
