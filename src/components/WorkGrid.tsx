"use client";

import { useState } from "react";
import { caseCategories, caseStudies } from "@/content/case-studies";
import { CaseCard } from "./Sections";

export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof caseCategories)[number]["value"]>("all");
  const visible = caseStudies.filter((c) => filter === "all" || c.category === filter);
  return (
    <>
      <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2">
        {caseCategories.map((c) => {
          const active = c.value === filter;
          return (
            <button
              key={c.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.value)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${active ? "border-cyan bg-cyan/15 text-cyan" : "border-line text-fg-muted hover:border-line-strong hover:text-fg"}`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      <p className="mono mt-3 text-xs text-fg-subtle" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <CaseCard key={c.slug} cs={c} index={i} />
        ))}
      </ul>
    </>
  );
}
