"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Chevron } from "./Icons";

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article" }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Comp>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ eyebrow, title, description, align = "left", className = "" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}

/* ---------- Accordion ---------- */
export function Accordion({ items, singleOpen = true }: { items: { question: string; answer: string }[]; singleOpen?: boolean }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(singleOpen ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white/[0.02]">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-b-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-fg hover:bg-white/[0.03] sm:px-6"
              >
                {item.question}
                <Chevron className={`shrink-0 text-cyan transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion-panel" data-open={isOpen}>
              <div>
                <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-fg-muted sm:px-6">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Link with arrow ---------- */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-cyan ${className}`}>
      {children}
      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ---------- Tag / pill ---------- */
export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" | "warn" }) {
  const tones = {
    default: "border-line text-fg-muted bg-white/[0.03]",
    accent: "border-cyan/40 text-cyan bg-cyan/10",
    warn: "border-violet/40 text-violet bg-violet/10",
  };
  return <span className={`mono inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] tracking-wide ${tones[tone]}`}>{children}</span>;
}
