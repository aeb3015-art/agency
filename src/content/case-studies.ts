/**
 * Case study content. All entries are marked with `status`.
 * - "concept": illustrative solution, not a delivered client project (default until real work is added)
 * - "delivered": verified client work — only use results that can be evidenced.
 */
export type CaseStatus = "concept" | "delivered";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  status: CaseStatus;
  industry: string;
  projectType: string;
  category: "web" | "crm" | "mobile";
  summary: string;
  metaDescription: string;
  challenge: string;
  targetUsers: string[];
  scope: string[];
  solution: string;
  features: { title: string; description: string }[];
  stack: { label: string; items: string[] }[];
  architecture: { nodes: string[]; note: string };
  engineeringChallenges: { title: string; description: string }[];
  securityPerformance: string[];
  results: { label: string; detail: string }[];
  relatedServices: string[];
  mockup: "ecommerce" | "crm" | "booking";
  photo: "retail" | "opsDesk" | "phone";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "headless-ecommerce-platform",
    title: "Headless e-commerce platform for a specialty retailer",
    client: "Concept Project",
    status: "concept",
    industry: "Retail / E-commerce",
    projectType: "Web platform & integrations",
    category: "web",
    summary:
      "A fast, content-rich storefront with a headless commerce backend, synchronised inventory, and a checkout built for conversion.",
    metaDescription:
      "Concept case study: a headless e-commerce platform with Next.js storefront, synchronised inventory, payment integration and editorial content.",
    challenge:
      "A specialty retailer's templated storefront had become slow, hard to customise, and disconnected from the warehouse system. Product content lived in three places, inventory counts drifted, and every promotional campaign required developer time.",
    targetUsers: ["Online shoppers on mobile devices", "Marketing team managing campaigns and content", "Operations staff managing inventory and fulfilment"],
    scope: ["Discovery & content modelling", "Storefront UX and design system", "Headless storefront build", "Inventory & ERP synchronisation", "Payment and shipping integrations", "Deployment, monitoring & handover"],
    solution:
      "We would separate content, commerce, and presentation: a headless CMS for editorial content, a commerce engine for catalogue and orders, and a Next.js storefront that renders product pages statically and revalidates when stock or pricing changes. Inventory flows from the warehouse system through a queue-backed sync service so counts stay accurate without blocking the storefront.",
    features: [
      { title: "Static product pages with on-demand revalidation", description: "Pages are pre-rendered for speed and refreshed when prices or stock change." },
      { title: "Editorial content blocks", description: "Marketing composes landing pages from approved components without a release." },
      { title: "Inventory synchronisation", description: "Warehouse updates land in minutes, with conflict handling and an audit trail." },
      { title: "Optimised checkout", description: "Address lookup, saved payment methods, and shipping-rate quotes in one flow." },
      { title: "Search & merchandising", description: "Faceted search with promoted products and typo tolerance." },
      { title: "Order status portal", description: "Customers track orders and returns without contacting support." },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "NestJS", "PostgreSQL", "Redis"] },
      { label: "Integrations", items: ["Payment gateway", "Shipping rates API", "Headless CMS", "ERP sync via webhooks"] },
      { label: "Infrastructure", items: ["Docker", "AWS", "CDN", "GitHub Actions"] },
    ],
    architecture: {
      nodes: ["Storefront (Next.js)", "API gateway", "Commerce service", "Inventory sync worker", "PostgreSQL", "Warehouse ERP"],
      note: "The sync worker consumes ERP webhooks through a queue, so bursts of stock updates never slow the storefront.",
    },
    engineeringChallenges: [
      { title: "Keeping stock accurate under load", description: "Stock events are processed idempotently with versioned writes so out-of-order webhooks cannot resurrect sold-out items." },
      { title: "Fast pages with fresh prices", description: "Static rendering with targeted cache invalidation keeps pages instant while pricing stays current." },
      { title: "Editorial flexibility without chaos", description: "A constrained set of content blocks gives marketing freedom inside a consistent design system." },
    ],
    securityPerformance: [
      "Payment details never touch our servers — tokenised by the payment provider",
      "Webhook signatures verified before processing",
      "Image optimisation and reserved dimensions to protect Core Web Vitals",
      "Rate limiting on search and checkout endpoints",
    ],
    results: [
      { label: "Intended outcome", detail: "Faster product pages, a single source of truth for inventory, and campaigns launched by marketing without engineering time." },
      { label: "Evidence", detail: "This is a concept project; no client metrics are claimed." },
    ],
    relatedServices: ["web-development", "api-development-integrations", "cloud-devops-maintenance"],
    mockup: "ecommerce",
    photo: "retail",
  },
  {
    slug: "crm-operations-dashboard",
    title: "Custom CRM and operations dashboard for a services firm",
    client: "Illustrative Solution",
    status: "concept",
    industry: "Professional services",
    projectType: "Custom CRM & automation",
    category: "crm",
    summary:
      "Replacing spreadsheets and disconnected tools with one system for leads, projects, scheduling, and reporting.",
    metaDescription:
      "Concept case study: a custom CRM and operations dashboard replacing spreadsheets, with pipelines, role-based access, workflow automation and reporting.",
    challenge:
      "A growing services firm tracked leads in a spreadsheet, projects in a task tool, and invoices in accounting software. Nothing was connected: handovers were lost, managers lacked visibility, and reporting took a day each month to assemble by hand.",
    targetUsers: ["Sales team qualifying and converting leads", "Project managers scheduling and tracking delivery", "Leadership reviewing pipeline, utilisation and revenue"],
    scope: ["Workflow mapping across sales, delivery and finance", "Data model & permission design", "CRM modules and dashboards", "Accounting and email integrations", "Spreadsheet migration", "Training & documentation"],
    solution:
      "We would model the firm's real entities — leads, clients, engagements, assignments, and invoices — and build a single application around them. Stage changes trigger tasks and notifications; approved quotes become engagements; completed milestones queue invoices in the accounting system. Role-based views give each team exactly what they need.",
    features: [
      { title: "Lead-to-engagement pipeline", description: "Stages with required fields, ownership, and automatic follow-up tasks." },
      { title: "Scheduling & capacity view", description: "Assign people to engagements and see utilisation at a glance." },
      { title: "Quotation workflow", description: "Templates, approvals, and e-signature status tracked on the record." },
      { title: "Accounting sync", description: "Invoices created automatically from milestones and reconciled on payment." },
      { title: "Activity timeline", description: "Emails, calls, notes, and changes in one chronological view." },
      { title: "Reporting dashboards", description: "Pipeline value, win rate, utilisation, and revenue by service line." },
    ],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Python", "Django", "PostgreSQL", "Redis", "Background workers"] },
      { label: "Integrations", items: ["Accounting API", "Email provider", "Calendar sync", "E-signature webhooks"] },
      { label: "Infrastructure", items: ["Docker", "Azure", "Managed PostgreSQL", "CI/CD"] },
    ],
    architecture: {
      nodes: ["Web app (React)", "REST API (Django)", "Workflow engine", "Job queue", "PostgreSQL", "Accounting system"],
      note: "The workflow engine reacts to domain events, so automation rules are configurable rather than hard-coded.",
    },
    engineeringChallenges: [
      { title: "Migrating years of spreadsheet data", description: "Rehearsed imports with validation reports let the team fix duplicates and missing fields before go-live." },
      { title: "Permissions without complexity", description: "A small set of roles with record-level ownership rules covers every real case without a permissions maze." },
      { title: "Keeping finance in sync", description: "Idempotent invoice creation and reconciliation jobs avoid duplicate invoices when the accounting API is slow." },
    ],
    securityPerformance: [
      "Role-based access with field-level restrictions on financial data",
      "Full audit log of changes to client and financial records",
      "Encrypted backups with tested restore procedures",
      "Indexed search and pagination for large record sets",
    ],
    results: [
      { label: "Intended outcome", detail: "One source of truth across sales, delivery, and finance; automated hand-offs; monthly reporting available on demand." },
      { label: "Evidence", detail: "This is an illustrative solution; no client metrics are claimed." },
    ],
    relatedServices: ["custom-crm-development", "api-development-integrations", "saas-custom-software"],
    mockup: "crm",
    photo: "opsDesk",
  },
  {
    slug: "mobile-booking-app",
    title: "Mobile booking app for a multi-location service business",
    client: "Concept Project",
    status: "concept",
    industry: "Consumer services",
    projectType: "Mobile application & backend",
    category: "mobile",
    summary:
      "A cross-platform app for customers to find, book, pay, and manage appointments — backed by a real-time availability engine.",
    metaDescription:
      "Concept case study: a cross-platform mobile booking app with real-time availability, payments, push notifications and a staff scheduling backend.",
    challenge:
      "Bookings arrived by phone, web form, and walk-in, and were reconciled by hand into a shared calendar. Double bookings, no-shows, and missed reminders cost revenue, and customers had no way to manage their own appointments.",
    targetUsers: ["Customers booking and managing appointments", "Front-desk staff handling schedules", "Owners monitoring occupancy across locations"],
    scope: ["Booking UX research & prototypes", "Flutter app for iOS and Android", "Availability & scheduling backend", "Payments, reminders & notifications", "Staff web console", "Store releases & monitoring"],
    solution:
      "We would build a Flutter app backed by an availability service that holds a single calendar per location and resource. Slots are reserved with short-lived holds during checkout, payments are captured through a provider, and reminders go out as push notifications and SMS. Staff manage schedules from a web console that uses the same API.",
    features: [
      { title: "Real-time availability", description: "Slots reflect staff rosters, service durations, and buffer times across locations." },
      { title: "Hold-and-confirm booking", description: "Temporary holds prevent double bookings while a customer completes payment." },
      { title: "Secure payments & deposits", description: "Card on file, deposits, and refunds handled by the payment provider." },
      { title: "Reminders & rescheduling", description: "Push and SMS reminders with one-tap reschedule to reduce no-shows." },
      { title: "Account & history", description: "Customers see past visits, preferences, and upcoming bookings." },
      { title: "Staff console", description: "Daily schedule, walk-in bookings, and location-level occupancy." },
    ],
    stack: [
      { label: "Mobile", items: ["Flutter", "Secure storage", "Push notifications", "Deep linking"] },
      { label: "Backend", items: ["Node.js", "NestJS", "PostgreSQL", "Redis", "WebSockets"] },
      { label: "Integrations", items: ["Payment provider", "SMS gateway", "Calendar export", "Maps SDK"] },
      { label: "Infrastructure", items: ["Docker", "Google Cloud", "Cloud SQL", "CI/CD with store deployment"] },
    ],
    architecture: {
      nodes: ["Flutter app", "Staff console", "REST + WebSocket API", "Availability engine", "PostgreSQL + Redis", "Payments & SMS"],
      note: "Slot holds live in Redis with expiry; confirmed bookings are written to PostgreSQL in a single transaction.",
    },
    engineeringChallenges: [
      { title: "Preventing double bookings", description: "Atomic slot holds and database constraints guarantee a resource is never booked twice for the same time." },
      { title: "Working on poor connections", description: "The app caches upcoming bookings and queues reschedule requests for when connectivity returns." },
      { title: "Time zones and daylight saving", description: "All scheduling stored in UTC with location time zones applied at the edges, tested across DST changes." },
    ],
    securityPerformance: [
      "Tokens stored in platform keychain/keystore; biometric unlock supported",
      "Payment data handled entirely by the provider's SDK",
      "Availability queries cached per location and invalidated on change",
      "Crash reporting and performance monitoring from day one",
    ],
    results: [
      { label: "Intended outcome", detail: "Self-service booking across locations, fewer double bookings and no-shows, and clear occupancy data for owners." },
      { label: "Evidence", detail: "This is a concept project; no client metrics are claimed." },
    ],
    relatedServices: ["mobile-app-development", "api-development-integrations", "cloud-devops-maintenance"],
    mockup: "booking",
    photo: "phone",
  },
];

export const caseCategories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "crm", label: "CRM" },
  { value: "mobile", label: "Mobile" },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
