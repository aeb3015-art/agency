/** Home page, process, FAQ, technology, and about content. */

export const heroContent = {
  eyebrow: "Software development agency",
  headline: "Websites, apps, and business systems. Engineered for growth.",
  supporting: "High-performance websites, mobile apps, custom CRMs and connected backend systems — built to launch faster and scale confidently.",
  primaryCta: { label: "Start Your Project", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
  capabilityLabels: ["Full-Stack Development", "iOS & Android", "Custom CRM", "API Engineering", "Cloud Deployment"],
};

export const expertiseStrip = [
  "React & Next.js",
  "Flutter & React Native",
  "Node.js & Python",
  "PostgreSQL & Redis",
  "REST & GraphQL",
  "AWS, Azure & Google Cloud",
];

export const problems = [
  {
    problem: "Your team is managing customers across spreadsheets.",
    solution: "A custom CRM built around your pipeline, with automation for follow-ups and hand-offs.",
    outcome: "One source of truth, fewer dropped leads, and reporting without manual assembly.",
    service: "custom-crm-development",
  },
  {
    problem: "Your website is slow and difficult to maintain.",
    solution: "A rebuild on a modern, component-driven stack with a CMS your team can actually use.",
    outcome: "Faster pages, better search visibility, and content updates without a developer.",
    service: "web-development",
  },
  {
    problem: "Your applications cannot share data reliably.",
    solution: "A documented API layer and resilient integrations with retries, queues, and monitoring.",
    outcome: "Consistent data across systems and failures that recover automatically.",
    service: "api-development-integrations",
  },
  {
    problem: "You need to launch an MVP with a clear technical foundation.",
    solution: "A scoped first release on an architecture that can grow — without over-engineering it.",
    outcome: "Real user feedback sooner, and a codebase you will not need to throw away.",
    service: "saas-custom-software",
  },
  {
    problem: "Your existing software cannot support the next stage of growth.",
    solution: "Incremental modernisation: stabilise, document, then replace the riskiest parts first.",
    outcome: "Lower operational risk and a platform ready for new features and scale.",
    service: "saas-custom-software",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Requirements",
    description:
      "We learn how your business works today, who the users are, what success looks like, and which constraints matter — budget, timeline, compliance, existing systems.",
    deliverables: ["Discovery workshop notes", "Prioritised requirements", "Scope & assumptions document", "Indicative timeline and budget"],
  },
  {
    step: "02",
    title: "UX Research & Product Design",
    description:
      "We map user journeys, structure information, and design the interface — validating flows with clickable prototypes before any production code is written.",
    deliverables: ["User flows & information architecture", "Wireframes", "High-fidelity designs", "Interactive prototype", "Design system foundations"],
  },
  {
    step: "03",
    title: "Architecture & Technical Planning",
    description:
      "We choose the stack, define the data model and API contracts, plan integrations, and record each significant decision with its trade-offs.",
    deliverables: ["Architecture overview & diagrams", "Data model", "API specification", "Integration plan", "Architecture decision records", "Delivery plan with milestones"],
  },
  {
    step: "04",
    title: "Development & Integration",
    description:
      "We build in short iterations with regular demonstrations, so you see working software early and can adjust priorities as you learn.",
    deliverables: ["Working increments every sprint", "Demo sessions", "Staging environment access", "Progress reports"],
  },
  {
    step: "05",
    title: "Quality Assurance & Security Review",
    description:
      "Automated tests run on every change. Before launch we complete accessibility checks, performance measurement, and a security review of authentication, data handling, and dependencies.",
    deliverables: ["Automated test suite", "QA report", "Accessibility & performance report", "Security review findings and fixes"],
  },
  {
    step: "06",
    title: "Deployment & Launch",
    description:
      "We set up production infrastructure, run the launch checklist — DNS, TLS, backups, monitoring, rollback — and support the go-live window.",
    deliverables: ["Production environment", "Deployment pipeline", "Launch checklist", "Rollback procedure", "Source code and credentials handover"],
  },
  {
    step: "07",
    title: "Monitoring, Maintenance & Iteration",
    description:
      "After launch we monitor health, keep dependencies current, and plan the next improvements with you based on real usage.",
    deliverables: ["Monitoring dashboards & alerts", "Maintenance plan", "Dependency update cadence", "Improvement roadmap"],
  },
];

export const techStack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "Python", "Django", "FastAPI", "PHP", "Laravel", ".NET"] },
  { group: "Databases & storage", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Object storage"] },
  { group: "APIs & integration", items: ["REST", "GraphQL", "WebSockets", "Webhooks", "OAuth 2.0", "OpenID Connect", "OpenAPI"] },
  { group: "Cloud & delivery", items: ["AWS", "Azure", "Google Cloud", "Docker", "GitHub Actions", "Terraform"] },
  { group: "Quality & observability", items: ["Unit testing", "Integration testing", "End-to-end testing", "Playwright", "Application monitoring", "Structured logs", "Metrics", "Tracing"] },
];

export const whyUs = [
  { title: "Clear requirements and documented scope", description: "Every project starts with a written scope, assumptions, and acceptance criteria you have reviewed." },
  { title: "Reusable components and maintainable code", description: "Typed, tested, consistently structured code that your team or any other developer can take forward." },
  { title: "Thoughtful architecture", description: "Decisions sized to your actual needs, recorded with their trade-offs." },
  { title: "Transparent communication", description: "A named point of contact, shared project board, and no surprises about progress or budget." },
  { title: "Regular demonstrations", description: "Working software shown at the end of each iteration, not just at the end of the project." },
  { title: "Automated quality checks", description: "Tests, linting, type checks, and security scans run on every change." },
  { title: "Source code ownership", description: "You own the code, the repository, and the infrastructure accounts." },
  { title: "Technical documentation", description: "Architecture, setup, and operations documented for whoever maintains the system next." },
  { title: "Structured handover", description: "Credentials, access, runbooks, and a walkthrough — nothing locked away with us." },
  { title: "Ongoing maintenance options", description: "Support plans for monitoring, updates, and improvements after launch, if you want them." },
];

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope, integrations, and complexity. A focused marketing website can take a few weeks; a custom CRM or SaaS MVP typically runs several months across design, development, and launch. After discovery we provide a milestone plan with a realistic range rather than a single optimistic date.",
  },
  {
    question: "Can you build an MVP, and how do you keep it affordable?",
    answer:
      "Yes. We help you cut the scope to the features that test your riskiest assumptions, then build those on a solid foundation. The goal is a product you can learn from quickly without having to rewrite it when it succeeds.",
  },
  {
    question: "Can you integrate with the systems we already use?",
    answer:
      "In most cases, yes — accounting, CRM, ERP, payment, shipping, messaging, and identity platforms with APIs or webhooks. During discovery we review each system's integration options and flag any limitations before committing to a design.",
  },
  {
    question: "How do you choose the technology stack?",
    answer:
      "We start from the product requirements, your team's existing skills, hosting constraints, and long-term maintenance. We prefer mature, well-supported technologies and explain the trade-offs so the decision is yours, not a default.",
  },
  {
    question: "Who owns the source code?",
    answer:
      "You do. Code lives in a repository you control from the start, and all infrastructure and third-party accounts are registered to your organisation. Our contracts assign intellectual property for the custom work we deliver.",
  },
  {
    question: "We already have designs. Can you build from them?",
    answer:
      "Yes. We review the designs for feasibility, accessibility, and missing states (loading, empty, error), raise any questions early, and then implement them faithfully as a component-based frontend.",
  },
  {
    question: "Where will the application be hosted, and who manages deployment?",
    answer:
      "We deploy to AWS, Azure, Google Cloud, or a managed platform that fits your requirements, using automated pipelines. Everything is set up in your accounts. You can manage it yourself afterwards or keep us on a maintenance plan.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes a handover with documentation and a warranty period for defects. Beyond that, optional maintenance plans cover monitoring, security updates, dependency upgrades, performance tuning, and ongoing feature work.",
  },
  {
    question: "Can you modernise our legacy software without a risky rewrite?",
    answer:
      "Usually. We prefer incremental modernisation: stabilise and document the existing system, add tests around critical behaviour, then replace the highest-risk or highest-value parts first while the business keeps running.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing depends on scope, integrations, and complexity. We offer fixed-price delivery for well-defined scopes and time-and-materials for evolving products, and we always start with a written estimate after discovery.",
  },
];

export const finalCta = {
  headline: "Have a product idea or a system that needs to work better?",
  supporting:
    "Tell us what you are building. We will help define the scope, identify the right technical approach, and map the next steps.",
  cta: { label: "Discuss Your Project", href: "/contact" },
};

export const aboutContent = {
  intro:
    "We are a software development agency that partners with startups, growing businesses, and enterprise teams to design, build, and scale digital products. Our work spans customer-facing websites and mobile apps through to the CRM platforms, APIs, and cloud infrastructure that run behind them.",
  approach: [
    {
      title: "How we approach delivery",
      body: "We work in short, visible iterations with a written scope, a shared board, and regular demonstrations. You always know what has been built, what is next, and where the budget stands.",
    },
    {
      title: "Design and engineering together",
      body: "Designers and engineers work on the same team from discovery onward, so interfaces are both usable and buildable, and technical constraints shape the design early rather than late.",
    },
    {
      title: "Understanding your business first",
      body: "Before proposing a system, we learn the workflow it has to support — who does what, where time is lost, and what good looks like. Software that fits is the result of that understanding.",
    },
    {
      title: "Clear communication",
      body: "Plain-language updates, documented decisions, and honest conversations about trade-offs, risks, and timelines.",
    },
    {
      title: "Maintainable implementation",
      body: "Typed code, automated tests, consistent structure, and documentation — because the cheapest feature is the one the next developer can add without fear.",
    },
    {
      title: "Long-term product improvement",
      body: "Launch is a milestone, not the finish line. We help you monitor, learn, and iterate so the product keeps delivering value.",
    },
  ],
  principles: [
    { title: "Understand the workflow before designing the system.", detail: "Good software mirrors how people actually work." },
    { title: "Build a strong foundation for the next release.", detail: "Every version should make the following one easier." },
    { title: "Make complex software straightforward to use.", detail: "Complexity belongs in the engineering, not the interface." },
  ],
  /** Supply real facts to display them. Empty values are hidden. */
  facts: {
    founded: "", // e.g. "2019"
    location: "", // e.g. "London, UK · remote-first"
    teamSize: "", // e.g. "12 engineers and designers"
  },
  /** Team profiles render only when provided. */
  team: [] as { name: string; role: string; bio: string }[],
};
