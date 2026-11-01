"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { Chevron, Logo, ServiceIcon } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuId = useId();
  const servicesId = useId();
  const servicesRef = useRef<HTMLLIElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape / outside click for desktop dropdown & mobile
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesOpen) setServicesOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          toggleRef.current?.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen, mobileOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null);
    focusables()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Blur lives on an inner element: a backdrop-filter on <header> would become the containing block for the fixed mobile panel. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-[background,border-color,box-shadow] duration-300 ${
          scrolled || mobileOpen
            ? "bg-[rgba(7,11,20,0.82)] backdrop-blur-xl border-b border-line shadow-[0_10px_40px_-20px_rgba(0,0,0,0.7)]"
            : "bg-transparent border-b border-transparent"
        }`}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-cyan focus:text-fg-dark"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-fg" aria-label={`${siteConfig.name} home`}>
          <Logo />
          <span className="text-[1.05rem]">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              if (item.label === "Services") {
                return (
                  <li key={item.href} ref={servicesRef} className="relative">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-fg ${
                          isActive(item.href) ? "text-fg" : "text-fg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls={servicesId}
                        aria-label="Open services menu"
                        onClick={() => setServicesOpen((o) => !o)}
                        className="-ml-2 rounded-full p-2 text-fg-muted hover:text-fg"
                      >
                        <Chevron className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <div
                      id={servicesId}
                      hidden={!servicesOpen}
                      className="absolute left-1/2 top-full mt-3 w-[40rem] -translate-x-1/2 rounded-xl border border-line bg-bg-elev/95 p-3 shadow-2xl backdrop-blur-xl"
                    >
                      <ul className="grid grid-cols-2 gap-1">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-white/[0.03] text-cyan">
                                <ServiceIcon name={s.icon} />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-fg">{s.navTitle}</span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">{s.summary.split(".")[0]}.</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex items-center justify-between border-t border-line px-3 pt-3 text-xs">
                        <span className="text-fg-subtle mono">Not sure which fits? We can help scope it.</span>
                        <Link href="/services" className="font-semibold text-cyan hover:underline">
                          All services →
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-fg ${
                      isActive(item.href) ? "text-fg" : "text-fg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex !min-h-[2.6rem] !px-5 text-sm">
            Start a Project
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        ref={mobilePanelRef}
        hidden={!mobileOpen}
        className="lg:hidden fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-bg/95 backdrop-blur-xl border-t border-line"
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link href={item.href} className="flex-1 rounded-lg px-3 py-3 text-lg font-semibold" aria-current={isActive(item.href) ? "page" : undefined}>
                      Services
                    </Link>
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      aria-label="Toggle services list"
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className="h-11 w-11 inline-flex items-center justify-center rounded-lg text-fg-muted"
                    >
                      <Chevron className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div className="accordion-panel" data-open={mobileServicesOpen}>
                    <div>
                      <ul className="mb-2 ml-3 border-l border-line pl-3">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-3 text-base text-fg-muted hover:text-fg">
                              <ServiceIcon name={s.icon} className="text-cyan" />
                              {s.navTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-lg font-semibold ${isActive(item.href) ? "text-cyan" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6 border-t border-line pt-6">
            <Link href="/contact" className="btn btn-primary w-full">
              Start a Project
            </Link>
            <p className="mt-4 text-center text-sm text-fg-muted">
              or email{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-cyan underline-offset-4 hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
