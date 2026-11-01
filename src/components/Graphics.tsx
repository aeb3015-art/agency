/* Engineering-inspired visuals built with HTML/CSS/SVG. All are decorative (aria-hidden) with text equivalents nearby. */

const nodeBase = "rounded-lg border border-line bg-bg-elev/90 px-3 py-2 text-center shadow-card";

/* ---------- Hero: connected system diagram ---------- */
export function SystemDiagram() {
  const nodes = [
    { label: "Website", sub: "Next.js", x: 40, y: 40 },
    { label: "API Layer", sub: "REST / GraphQL", x: 230, y: 40 },
    { label: "Backend Services", sub: "Node / Python", x: 420, y: 40 },
    { label: "Database", sub: "PostgreSQL", x: 420, y: 180 },
    { label: "CRM", sub: "Custom platform", x: 230, y: 180 },
    { label: "Mobile App", sub: "Flutter", x: 40, y: 180 },
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 1],
  ];
  const w = 160;
  const h = 64;
  const center = (i: number) => ({ cx: nodes[i].x + w / 2, cy: nodes[i].y + h / 2 });
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22),transparent_65%)] blur-2xl" />
      <svg viewBox="0 0 620 284" className="relative w-full h-auto" role="img">
        <defs>
          <linearGradient id="link" x1="0" x2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {links.map(([a, b], i) => {
          const A = center(a);
          const B = center(b);
          return (
            <g key={i}>
              <line x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy} stroke="rgba(167,177,196,0.18)" strokeWidth="2" />
              <line x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy} stroke="url(#link)" strokeWidth="2" className="flow-line" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
            <rect width={w} height={h} rx="12" fill="#0c1220" stroke="rgba(167,177,196,0.28)" />
            <rect width={w} height={h} rx="12" fill="none" stroke="#60a5fa" strokeOpacity="0.35" filter="url(#glow)" className="pulse-soft" style={{ animationDelay: `${i * 0.45}s` }} />
            <circle cx="18" cy="20" r="4" fill={i % 2 ? "#22d3ee" : "#a78bfa"} />
            <text x="30" y="24" fill="#eef2f8" fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
              {n.label}
            </text>
            <text x="30" y="44" fill="#a7b1c4" fontSize="11" fontFamily="JetBrains Mono, monospace">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- Code / API preview ---------- */
export function ApiPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-line bg-bg-elev shadow-card overflow-hidden ${compact ? "text-[0.72rem]" : "text-[0.78rem]"} mono`} aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-fg-subtle">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-3">POST /v1/orders</span>
        <span className="ml-auto rounded bg-success/15 px-2 py-0.5 text-success">201 Created</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-2">
        <pre className="overflow-x-auto p-4 leading-relaxed text-fg-muted">
          <code>
            <span className="text-fg-subtle"># request</span>
            {"\n"}
            <span className="text-violet">Authorization</span>: Bearer sk_…{"\n"}
            <span className="text-violet">Idempotency-Key</span>: 7f3c…{"\n\n"}
            {"{\n"}
            {"  "}
            <span className="text-cyan">&quot;customer_id&quot;</span>: <span className="text-blue-bright">&quot;cus_9a1&quot;</span>,{"\n"}
            {"  "}
            <span className="text-cyan">&quot;items&quot;</span>: [{"{ "}
            <span className="text-cyan">&quot;sku&quot;</span>: <span className="text-blue-bright">&quot;PL-220&quot;</span>, <span className="text-cyan">&quot;qty&quot;</span>: 2{" }"}],{"\n"}
            {"  "}
            <span className="text-cyan">&quot;shipping&quot;</span>: <span className="text-blue-bright">&quot;express&quot;</span>
            {"\n}"}
          </code>
        </pre>
        <pre className="overflow-x-auto border-t border-line p-4 leading-relaxed text-fg-muted sm:border-l sm:border-t-0">
          <code>
            <span className="text-fg-subtle"># response</span>
            {"\n"}
            {"{\n"}
            {"  "}
            <span className="text-cyan">&quot;id&quot;</span>: <span className="text-blue-bright">&quot;ord_41c8&quot;</span>,{"\n"}
            {"  "}
            <span className="text-cyan">&quot;status&quot;</span>: <span className="text-blue-bright">&quot;confirmed&quot;</span>,{"\n"}
            {"  "}
            <span className="text-cyan">&quot;total&quot;</span>: {"{ "}
            <span className="text-cyan">&quot;amount&quot;</span>: 8400, <span className="text-cyan">&quot;currency&quot;</span>: <span className="text-blue-bright">&quot;EUR&quot;</span>
            {" }"},{"\n"}
            {"  "}
            <span className="text-cyan">&quot;events&quot;</span>: [<span className="text-blue-bright">&quot;order.created&quot;</span>]{"\n"}
            {"}"}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ---------- Browser mockup: e-commerce ---------- */
export function EcommerceMock() {
  return (
    <div className="rounded-xl border border-line bg-bg-elev shadow-card overflow-hidden" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg-subtle/60" />
        <span className="h-2 w-2 rounded-full bg-fg-subtle/60" />
        <span className="ml-2 h-5 flex-1 rounded bg-white/[0.04] mono text-[0.6rem] leading-5 px-2 text-fg-subtle">shop.example.com/collections/outdoor</span>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-3 p-3">
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-fg/20" />
          {[80, 60, 70, 50].map((w, i) => (
            <div key={i} className="h-2 rounded bg-fg/10" style={{ width: `${w}%` }} />
          ))}
          <div className="pt-2 h-2 w-2/3 rounded bg-cyan/50" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-md border border-line bg-white/[0.02] p-1.5">
              <div className={`h-10 rounded ${["bg-blue/30", "bg-cyan/25", "bg-violet/30"][i % 3]}`} />
              <div className="mt-1.5 h-1.5 w-3/4 rounded bg-fg/20" />
              <div className="mt-1 h-1.5 w-1/3 rounded bg-fg/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Dashboard mockup: CRM ---------- */
export function CrmMock() {
  const stages = [
    { label: "New", n: 4, c: "bg-fg/15" },
    { label: "Qualified", n: 3, c: "bg-blue/30" },
    { label: "Proposal", n: 2, c: "bg-cyan/30" },
    { label: "Won", n: 1, c: "bg-success/30" },
  ];
  return (
    <div className="rounded-xl border border-line bg-bg-elev shadow-card overflow-hidden" aria-hidden="true">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <div className="flex gap-3">
          <span className="h-2 w-10 rounded bg-fg/30" />
          <span className="h-2 w-8 rounded bg-fg/10" />
          <span className="h-2 w-8 rounded bg-fg/10" />
        </div>
        <span className="h-4 w-4 rounded-full bg-violet/40" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {["Pipeline", "Won this month", "Tasks due"].map((t, i) => (
          <div key={t} className="rounded-md border border-line bg-white/[0.02] p-2">
            <div className="mono text-[0.55rem] text-fg-subtle">{t}</div>
            <div className={`mt-1 h-3 rounded ${["w-3/4 bg-cyan/50", "w-1/2 bg-success/50", "w-2/3 bg-violet/50"][i]}`} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 px-3 pb-3">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="mono mb-1.5 text-[0.55rem] text-fg-subtle">{s.label}</div>
            <div className="space-y-1.5">
              {Array.from({ length: s.n }).map((_, i) => (
                <div key={i} className={`h-6 rounded border border-line ${s.c}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Phone mockup: booking ---------- */
export function PhoneMock() {
  return (
    <div className="mx-auto w-[11rem] rounded-[1.6rem] border border-line-strong bg-bg-elev p-2 shadow-card" aria-hidden="true">
      <div className="rounded-[1.2rem] bg-bg p-3 overflow-hidden">
        <div className="mx-auto mb-3 h-1 w-10 rounded bg-fg/20" />
        <div className="h-2.5 w-2/3 rounded bg-fg/25" />
        <div className="mt-1 h-2 w-1/2 rounded bg-fg/10" />
        <div className="mt-3 grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`h-5 rounded ${i === 9 ? "bg-cyan/70" : "bg-white/[0.05]"}`} />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {["09:00", "10:30", "13:00"].map((t, i) => (
            <div key={t} className={`flex items-center justify-between rounded-md border px-2 py-1.5 mono text-[0.55rem] ${i === 1 ? "border-cyan/60 bg-cyan/10 text-cyan" : "border-line text-fg-subtle"}`}>
              <span>{t}</span>
              <span>{i === 1 ? "selected" : "open"}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-7 rounded-full bg-gradient-to-r from-cyan to-blue-bright" />
      </div>
    </div>
  );
}

/* ---------- Deployment pipeline ---------- */
export function PipelineGraphic() {
  const steps = ["commit", "lint + types", "tests", "build image", "staging", "production"];
  return (
    <div className="rounded-xl border border-line bg-bg-elev p-4 shadow-card" aria-hidden="true">
      <div className="mono mb-3 text-[0.65rem] text-fg-subtle">main · deploy.yml</div>
      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`mono rounded-md border px-2.5 py-1.5 text-[0.7rem] ${i < 4 ? "border-success/40 bg-success/10 text-success" : i === 4 ? "border-cyan/50 bg-cyan/10 text-cyan" : "border-line text-fg-subtle"}`}>
              {i < 4 ? "✓ " : i === 4 ? "● " : "○ "}
              {s}
            </span>
            {i < steps.length - 1 && <span className="h-px w-3 bg-line-strong" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- SaaS: tenant / module diagram ---------- */
export function SaasGraphic() {
  return (
    <div className="rounded-xl border border-line bg-bg-elev p-4 shadow-card" aria-hidden="true">
      <div className="grid grid-cols-3 gap-2">
        {["Auth", "Billing", "Workspaces", "Jobs", "Search", "Events"].map((m, i) => (
          <div key={m} className={`${nodeBase} mono text-[0.68rem] ${i % 3 === 1 ? "text-cyan" : "text-fg-muted"}`}>
            {m}
          </div>
        ))}
      </div>
      <div className="my-2 flex justify-center">
        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" stroke="#22d3ee" strokeWidth="1.5">
          <path d="M10 0v10h60V0M40 10v10" className="flow-line" />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["tenant_a", "tenant_b", "tenant_c"].map((t) => (
          <div key={t} className={`${nodeBase} mono text-[0.65rem] text-violet`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Generic architecture (case studies) ---------- */
export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-3">
      {nodes.map((n, i) => (
        <li key={n} className="flex items-center gap-3">
          <span className="mono rounded-lg border border-line-strong bg-bg-elev px-3 py-2.5 text-xs text-fg sm:text-sm">
            <span className="mr-2 text-cyan">{String(i + 1).padStart(2, "0")}</span>
            {n}
          </span>
          {i < nodes.length - 1 && (
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#60a5fa" strokeWidth="1.5" aria-hidden="true" className="shrink-0">
              <path d="M0 6h18M14 1l5 5-5 5" className="flow-line" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}

export function ServiceVisual({ kind }: { kind: "browser" | "phone" | "dashboard" | "api" | "saas" | "pipeline" }) {
  switch (kind) {
    case "browser":
      return <EcommerceMock />;
    case "phone":
      return <PhoneMock />;
    case "dashboard":
      return <CrmMock />;
    case "api":
      return <ApiPreview compact />;
    case "saas":
      return <SaasGraphic />;
    case "pipeline":
      return <PipelineGraphic />;
  }
}
