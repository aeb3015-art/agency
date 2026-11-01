import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="container-x relative max-w-3xl">
        <div className="mono rounded-xl border border-line bg-bg-elev p-5 text-sm text-fg-muted shadow-card" aria-hidden="true">
          <div className="text-fg-subtle"># GET {"{path}"}</div>
          <div className="mt-2">
            <span className="text-danger">404</span> Not Found
          </div>
          <div className="mt-1">{`{ "error": "route_not_found", "hint": "try one of the links below" }`}</div>
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">This page does not exist.</h1>
        <p className="mt-4 text-lg text-fg-muted">The link may be out of date, or the page may have moved. Here is where you probably want to go.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Start a project
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm text-fg-muted hover:border-cyan/50 hover:text-fg">
                {s.navTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
