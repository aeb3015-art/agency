import type { IconName } from "@/content/services";

const common = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ServiceIcon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "web":
      return (
        <svg {...common} className={className}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
          <path d="M7 13h6M7 16h10" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common} className={className}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </svg>
      );
    case "crm":
      return (
        <svg {...common} className={className}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M16 8h5M16 12h5M16 16h5" />
        </svg>
      );
    case "api":
      return (
        <svg {...common} className={className}>
          <path d="M8 7L4 12l4 5M16 7l4 5-4 5M13.5 5l-3 14" />
        </svg>
      );
    case "saas":
      return (
        <svg {...common} className={className}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common} className={className}>
          <path d="M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9.5a3.5 3.5 0 0 1 .5 6.95" />
          <path d="M12 12v8M9 17l3 3 3-3" />
        </svg>
      );
  }
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg {...common} width={18} height={18} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg {...common} width={18} height={18} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg {...common} width={16} height={16} className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6b95ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="8" stroke="url(#lg)" strokeWidth="1.5" />
      <path d="M9 22L16 9l7 13" stroke="url(#lg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18h8" stroke="#f5b64a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
