"use client";

/* Product-grade visuals built with HTML/CSS/SVG. Decorative (aria-hidden) with text equivalents nearby. */
import { CountUp, Enter, Parallax, Tilt, TypedLines } from "./motion";

/* ---------- Shared window chrome ---------- */
function Window({ title, children, className = "", tone = "dark" }: { title: string; children: React.ReactNode; className?: string; tone?: "dark" | "paper" }) {
  const dark = tone === "dark";
  return (
    <div className={`overflow-hidden rounded-xl border ${dark ? "border-line bg-ink-2 shadow-float" : "border-line-dark bg-white shadow-paper"} ${className}`}>
      <div className={`flex items-center gap-2 border-b px-3.5 py-2.5 ${dark ? "border-line" : "border-line-dark"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-rose/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className={`mono ml-2 text-[0.65rem] ${dark ? "text-fg-subtle" : "text-fg-dark-muted"}`}>{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------- Code editor ---------- */
export function EditorPanel({ className = "" }: { className?: string }) {
  const K = ({ c }: { c: string }) => <span className="text-[#c792ea]">{c}</span>;
  const F = ({ c }: { c: string }) => <span className="text-signal-bright">{c}</span>;
  const S = ({ c }: { c: string }) => <span className="text-mint">{c}</span>;
  const T = ({ c }: { c: string }) => <span className="text-amber">{c}</span>;
  const C = ({ c }: { c: string }) => <span className="text-fg-subtle italic">{c}</span>;
  const lines: React.ReactNode[] = [
    <><K c="export async function" /> <F c="createOrder" />(input: <T c="OrderInput" />) {"{"}</>,
    <>  <K c="const" /> order = <K c="await" /> db.<F c="transaction" />(<K c="async" /> (tx) =&gt; {"{"}</>,
    <>    <K c="await" /> inventory.<F c="reserve" />(tx, input.items);</>,
    <>    <K c="return" /> tx.orders.<F c="insert" />({"{"} ...input, status: <S c="'confirmed'" /> {"}"});</>,
    <>  {"}"});</>,
    <>  <C c="// publish for CRM, email and analytics consumers" /></>,
    <>  <K c="await" /> events.<F c="emit" />(<S c="'order.created'" />, {"{"} id: order.id {"}"});</>,
    <>  <K c="return" /> order;</>,
    <>{"}"}<span className="cursor-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-fg" /></>,
  ];
  return (
    <Window title="orders/service.ts" className={className}>
      <pre className="mono overflow-x-auto p-4 text-[0.72rem] leading-[1.7] text-fg-muted sm:text-[0.76rem]">
        {lines.map((l, i) => (
          <div key={i} className="flex">
            <span className="w-6 shrink-0 select-none text-right pr-3 text-fg-subtle/60">{i + 1}</span>
            <code>{l}</code>
          </div>
        ))}
      </pre>
    </Window>
  );
}

/* ---------- Analytics / dashboard ---------- */
function AreaChart({ className = "" }: { className?: string }) {
  const pts = [12, 18, 15, 24, 22, 30, 28, 36, 34, 44, 41, 52];
  const w = 260;
  const h = 70;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / 56) * h}`).join(" L ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2f6bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M 0,${h} L ${path} L ${w},${h} Z`} fill="url(#area)" />
      <path d={`M ${path}`} fill="none" stroke="#6b95ff" strokeWidth="2" className="draw-line" />
      <circle cx={w} cy={h - (52 / 56) * h} r="3.5" fill="#6b95ff" />
    </svg>
  );
}

export function DashboardPanel({ className = "" }: { className?: string }) {
  const rows = [
    ["Northwind Supply", "Proposal", "$42,000", "mint"],
    ["Harbor Dental", "Qualified", "$18,500", "amber"],
    ["Atlas Logistics", "Negotiation", "$96,200", "signal"],
    ["Kestrel Studio", "Won", "$27,900", "mint"],
  ];
  return (
    <Window title="ops.example.com/pipeline" className={className}>
      <div className="grid grid-cols-3 gap-px border-b border-line bg-line">
        {[
          { l: "Pipeline value", d: "+12.4%", v: <CountUp to={184.6} prefix="$" suffix="k" decimals={1} /> },
          { l: "Won this month", d: "+3 deals", v: <CountUp to={27.9} prefix="$" suffix="k" decimals={1} /> },
          { l: "Avg. cycle", d: "−4 days", v: <CountUp to={23} suffix=" days" /> },
        ].map(({ l, v, d }) => (
          <div key={l} className="bg-ink-2 p-3">
            <div className="mono text-[0.58rem] uppercase tracking-wider text-fg-subtle">{l}</div>
            <div className="mt-1 text-base font-semibold tracking-tight tabular-nums">{v}</div>
            <div className="mono text-[0.6rem] text-mint">{d}</div>
          </div>
        ))}
      </div>
      <div className="p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="mono text-[0.6rem] uppercase tracking-wider text-fg-subtle">Revenue · last 12 weeks</span>
          <span className="mono text-[0.6rem] text-fg-subtle">weekly</span>
        </div>
        <AreaChart className="h-16" />
      </div>
      <table className="w-full border-t border-line text-[0.68rem]">
        <tbody>
          {rows.map(([n, st, v, tone]) => (
            <tr key={n} className="border-b border-line last:border-0">
              <td className="flex items-center gap-2 px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-3 mono text-[0.55rem] text-fg-muted">{n[0]}</span>
                <span className="font-medium">{n}</span>
              </td>
              <td className="px-3 py-2">
                <span className={`rounded-full px-2 py-0.5 mono text-[0.58rem] ${tone === "mint" ? "bg-mint/15 text-mint" : tone === "amber" ? "bg-amber/15 text-amber" : "bg-signal/20 text-signal-bright"}`}>{st}</span>
              </td>
              <td className="px-3 py-2 text-right mono text-fg-muted">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Window>
  );
}

/* ---------- Terminal / deploy log ---------- */
export function TerminalPanel({ className = "" }: { className?: string }) {
  return (
    <Window title="deploy · production" className={className}>
      <TypedLines
        className="mono p-4 text-[0.7rem] leading-[1.75] text-fg-muted"
        lines={[
          <><span className="text-mint">✓</span> lint &amp; typecheck <span className="text-fg-subtle">1.8s</span></>,
          <><span className="text-mint">✓</span> tests 212 passed <span className="text-fg-subtle">14.2s</span></>,
          <><span className="text-mint">✓</span> build image <span className="text-fg-subtle">api@sha-7f3c1</span></>,
          <><span className="text-mint">✓</span> migrate <span className="text-fg-subtle">0003_add_audit_log</span></>,
          <><span className="text-signal-bright">→</span> rolling out <span className="text-fg">3/3</span> healthy</>,
          <><span className="text-amber">●</span> p95 latency <span className="text-fg">84ms</span></>,
        ]}
      />
    </Window>
  );
}

/* ---------- Phone: booking app ---------- */
export function PhonePanel({ className = "" }: { className?: string }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={`w-[12.5rem] rounded-[2.2rem] border border-line-strong bg-ink-3 p-2 shadow-float ${className}`}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-2 px-4 pb-4 pt-5">
        <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-[0.55rem] text-fg-subtle">Book with</div>
            <div className="text-sm font-semibold tracking-tight">Nadia · Stylist</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/20 text-[0.6rem] font-semibold text-amber">NK</div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {days.map((d, i) => (
            <div key={i} className="mono text-[0.5rem] text-fg-subtle">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`flex h-6 items-center justify-center rounded-md text-[0.6rem] ${i === 9 ? "bg-signal font-semibold text-white" : i < 2 ? "text-fg-subtle/40" : "bg-white/[0.04] text-fg-muted"}`}>
              {i + 3}
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          {[
            ["09:00", "Open"],
            ["10:30", "Selected"],
            ["13:00", "Open"],
          ].map(([t, s]) => (
            <div key={t} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[0.65rem] ${s === "Selected" ? "border-signal/70 bg-signal/15 text-fg" : "border-line text-fg-muted"}`}>
              <span className="mono">{t}</span>
              <span className={s === "Selected" ? "text-signal-bright" : "text-fg-subtle"}>{s}</span>
            </div>
          ))}
        </div>
        <button type="button" tabIndex={-1} className="mt-4 w-full rounded-full bg-fg py-2.5 text-[0.7rem] font-semibold text-ink">
          Confirm · $65
        </button>
      </div>
    </div>
  );
}

/* ---------- Storefront ---------- */
export function StorefrontPanel({ className = "" }: { className?: string }) {
  const products = [
    ["Field Jacket", "$189", "from-[#3b4a6b] to-[#1d2538]"],
    ["Trail Boot", "$240", "from-[#7a5a3a] to-[#3b2b1a]"],
    ["Canvas Tote", "$58", "from-[#8c8a7a] to-[#4a493f]"],
    ["Wool Beanie", "$42", "from-[#5b3a4a] to-[#2b1a24]"],
    ["Down Vest", "$160", "from-[#2f6bff] to-[#1a2d66]"],
    ["Rain Shell", "$210", "from-[#2d5a4a] to-[#132b22]"],
  ];
  return (
    <Window title="shop.example.com/collections/outdoor" tone="paper" className={className}>
      <div className="grid grid-cols-[6.5rem_1fr] gap-4 p-4 text-fg-dark">
        <div className="space-y-3 text-[0.65rem]">
          <div className="font-semibold">Filters</div>
          {["Jackets", "Footwear", "Accessories"].map((f, i) => (
            <label key={f} className="flex items-center gap-2 text-fg-dark-muted">
              <span className={`h-3 w-3 rounded-sm border ${i === 0 ? "border-signal bg-signal" : "border-line-dark"}`} />
              {f}
            </label>
          ))}
          <div className="pt-2 font-semibold">Size</div>
          <div className="flex flex-wrap gap-1">
            {["S", "M", "L", "XL"].map((s) => (
              <span key={s} className={`rounded px-1.5 py-0.5 mono text-[0.55rem] ${s === "M" ? "bg-fg-dark text-paper" : "border border-line-dark"}`}>{s}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {products.map(([n, p, g]) => (
            <div key={n}>
              <div className={`aspect-[4/5] rounded-md bg-gradient-to-br ${g}`} />
              <div className="mt-1.5 text-[0.62rem] font-medium leading-tight">{n}</div>
              <div className="mono text-[0.58rem] text-fg-dark-muted">{p}</div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

/* ---------- API request/response ---------- */
export function ApiPreview({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const K = ({ c }: { c: string }) => <span className="text-signal-bright">&quot;{c}&quot;</span>;
  const V = ({ c }: { c: string }) => <span className="text-mint">&quot;{c}&quot;</span>;
  return (
    <Window title="POST /v1/orders  ·  201 Created  ·  41ms" className={className}>
      <div className={`grid ${compact ? "" : "sm:grid-cols-2"} mono ${compact ? "text-[0.68rem]" : "text-[0.74rem]"} leading-relaxed text-fg-muted`}>
        <pre className="overflow-x-auto p-4">
          <div className="text-fg-subtle"># request</div>
          <div><span className="text-amber">Authorization</span>: Bearer sk_live_…</div>
          <div><span className="text-amber">Idempotency-Key</span>: 7f3c-91ab</div>
          <div className="mt-2">{"{"}</div>
          <div>  <K c="customer_id" />: <V c="cus_9a1" />,</div>
          <div>  <K c="items" />: [{"{ "}<K c="sku" />: <V c="PL-220" />, <K c="qty" />: 2{" }"}],</div>
          <div>  <K c="shipping" />: <V c="express" /></div>
          <div>{"}"}</div>
        </pre>
        <pre className={`overflow-x-auto border-t border-line p-4 ${compact ? "" : "sm:border-l sm:border-t-0"}`}>
          <div className="text-fg-subtle"># response</div>
          <div>{"{"}</div>
          <div>  <K c="id" />: <V c="ord_41c8" />,</div>
          <div>  <K c="status" />: <V c="confirmed" />,</div>
          <div>  <K c="total" />: {"{ "}<K c="amount" />: 8400, <K c="currency" />: <V c="EUR" />{" }"},</div>
          <div>  <K c="events" />: [<V c="order.created" />]</div>
          <div>{"}"}</div>
        </pre>
      </div>
    </Window>
  );
}

/* ---------- Hero composition ---------- */
export function HeroStack() {
  return (
    <div className="relative mx-auto w-full max-w-[40rem] lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,107,255,0.28),transparent_62%)] blur-3xl" />
      <Tilt max={4}>
        <div className="relative grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
          <div className="relative min-w-0 sm:pl-16 sm:pt-32 lg:pl-20 lg:pt-36">
            <Enter delay={0.2} from={{ y: 60 }}>
              <DashboardPanel className="relative z-10" />
            </Enter>
            <Enter delay={0.55} from={{ x: -40, y: 20, rotate: -2 }} className="absolute -left-4 top-0 z-20 hidden w-[58%] sm:block lg:-left-8">
              <Parallax amount={-30}>
                <EditorPanel />
              </Parallax>
            </Enter>
            <Enter delay={0.8} from={{ x: -30, y: 40 }} className="absolute -bottom-10 -left-4 z-20 hidden w-[46%] sm:block lg:-left-8">
              <Parallax amount={40}>
                <TerminalPanel />
              </Parallax>
            </Enter>
          </div>
          <Enter delay={0.95} from={{ y: 80, rotate: 3 }} className="relative z-30 hidden sm:block sm:-mb-6">
            <Parallax amount={-50}>
              <PhonePanel className="float-slow" />
            </Parallax>
          </Enter>
        </div>
      </Tilt>
      {/* connection lines */}
      <svg className="absolute inset-0 -z-[1] h-full w-full" viewBox="0 0 600 400" fill="none" preserveAspectRatio="none">
        <path d="M60 60 C 200 60, 220 200, 380 200 S 560 340, 590 340" stroke="rgba(107,149,255,0.35)" strokeWidth="1.5" className="flow-line" />
      </svg>
    </div>
  );
}

/* ---------- Connected system diagram (services page / about) ---------- */
export function SystemDiagram() {
  const nodes = [
    { label: "Website", sub: "Next.js", x: 20, y: 20 },
    { label: "API Layer", sub: "REST / GraphQL", x: 220, y: 20 },
    { label: "Backend", sub: "Node / Python", x: 420, y: 20 },
    { label: "Database", sub: "PostgreSQL", x: 420, y: 160 },
    { label: "CRM", sub: "Custom platform", x: 220, y: 160 },
    { label: "Mobile App", sub: "Flutter", x: 20, y: 160 },
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]];
  const w = 160, h = 64;
  const c = (i: number) => ({ x: nodes[i].x + w / 2, y: nodes[i].y + h / 2 });
  return (
    <svg viewBox="0 0 600 244" className="w-full h-auto" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line key={i} x1={c(a).x} y1={c(a).y} x2={c(b).x} y2={c(b).y} stroke="#6b95ff" strokeOpacity="0.5" strokeWidth="1.5" className="flow-line" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {nodes.map((n, i) => (
        <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
          <rect width={w} height={h} rx="12" fill="#121419" stroke="rgba(242,239,233,0.18)" />
          <circle cx="18" cy="22" r="4" fill={i % 2 ? "#6b95ff" : "#f5b64a"} />
          <text x="30" y="26" fill="#f2efe9" fontSize="13" fontWeight="600" fontFamily="var(--font-sans), system-ui">{n.label}</text>
          <text x="30" y="46" fill="#a8a59e" fontSize="11" fontFamily="var(--font-mono), monospace">{n.sub}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Deployment pipeline ---------- */
export function PipelineGraphic() {
  return <TerminalPanel />;
}

/* ---------- SaaS modules ---------- */
export function SaasGraphic() {
  const mods = ["Auth", "Billing", "Workspaces", "Jobs", "Search", "Events"];
  return (
    <Window title="platform · modular monolith">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {mods.map((m, i) => (
            <div key={m} className={`rounded-lg border px-3 py-2.5 text-center mono text-[0.68rem] ${i === 1 ? "border-signal/60 bg-signal/15 text-signal-bright" : "border-line bg-white/[0.03] text-fg-muted"}`}>{m}</div>
          ))}
        </div>
        <div className="my-3 flex justify-center">
          <svg width="120" height="22" viewBox="0 0 120 22" fill="none" stroke="#6b95ff" strokeWidth="1.5"><path d="M20 0v10h80V0M60 10v12" className="flow-line" /></svg>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["tenant_a", "tenant_b", "tenant_c"].map((t) => (
            <div key={t} className="rounded-lg border border-amber/40 bg-amber/10 px-3 py-2 text-center mono text-[0.65rem] text-amber">{t}</div>
          ))}
        </div>
      </div>
    </Window>
  );
}

/* ---------- Architecture (case studies) ---------- */
export function ArchitectureDiagram({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flex flex-wrap items-stretch gap-3">
      {nodes.map((n, i) => (
        <li key={n} className="flex items-center gap-3">
          <Enter delay={i * 0.12} from={{ y: 16 }} className="contents">
          <span className="mono rounded-lg border border-line-strong bg-ink-2 px-3 py-2.5 text-xs text-fg sm:text-sm">
            <span className="mr-2 text-signal-bright">{String(i + 1).padStart(2, "0")}</span>
            {n}
          </span>
          </Enter>
          {i < nodes.length - 1 && (
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#6b95ff" strokeWidth="1.5" aria-hidden="true" className="shrink-0">
              <path d="M0 6h18M14 1l5 5-5 5" className="flow-line" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}

/* Back-compat exports used by cards */
export const EcommerceMock = StorefrontPanel;
export const CrmMock = DashboardPanel;
export function PhoneMock() {
  return (
    <div className="flex justify-center">
      <PhonePanel />
    </div>
  );
}

export function ServiceVisual({ kind }: { kind: "browser" | "phone" | "dashboard" | "api" | "saas" | "pipeline" }) {
  switch (kind) {
    case "browser":
      return <StorefrontPanel />;
    case "phone":
      return <PhoneMock />;
    case "dashboard":
      return <DashboardPanel />;
    case "api":
      return <ApiPreview compact />;
    case "saas":
      return <SaasGraphic />;
    case "pipeline":
      return <TerminalPanel />;
  }
}
