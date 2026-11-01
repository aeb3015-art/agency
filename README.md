# Agency Website

Marketing website and project-inquiry funnel for a software development agency (placeholder brand: **Forgeline** — rename in `src/content/site.ts`).

## Stack

- **Next.js 15** (App Router, React 19, TypeScript, static generation for all content pages)
- **Tailwind CSS 4** with centralised design tokens in `src/app/globals.css` (`@theme` block: colours, fonts, radii, shadows, container width, motion timing)
- **Zod** for shared client + server form validation
- No animation library: motion is CSS-only (`IntersectionObserver` reveals, SVG dash animation) and honours `prefers-reduced-motion`
- No third-party scripts, no cookies, no analytics

## Run

```bash
npm install
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3000
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## Where to edit content

| What | File |
| --- | --- |
| Agency name, legal name, email, phone, address, booking/WhatsApp/social links, privacy contact | `src/content/site.ts` |
| Six services (cards + full detail pages) | `src/content/services.ts` |
| Case studies (status `concept` vs `delivered`, mockup, stack, architecture) | `src/content/case-studies.ts` |
| Hero copy, problems-we-solve, process steps, tech stack, why-us, FAQ, final CTA, About page copy, team | `src/content/content.ts` |
| Form options (services, stages, budgets, timelines) and validation rules | `src/lib/inquiry-schema.ts` |
| Privacy policy text | `src/app/privacy/page.tsx` |

Optional UI is hidden until you supply data: phone, address, booking link, WhatsApp, LinkedIn/GitHub, "founded / location / team size" facts, and team profiles.

## Photography

Photos are royalty-free Unsplash images referenced from `src/content/images.ts` (served through `next/image` as AVIF/WebP with correct `sizes`). Replace them with your own team, office and product photography by editing that file — local files in `/public` work too. The industries and regions shown on the home page live in `src/content/content.ts` (`industries`, `regions`); edit them to match what you actually serve.

## Routes

`/`, `/services`, `/services/[slug]` (6), `/work`, `/work/[slug]` (3), `/process`, `/about`, `/contact`, `/privacy`, custom 404, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `POST /api/inquiry`.

`/contact?service=<service-slug>` pre-selects the service dropdown (linked from each service page).

## Contact form delivery

The form validates on the client and again on the server (`src/app/api/inquiry/route.ts`), then hands off to `src/lib/inquiry-delivery.ts`. Protection: honeypot field, minimum fill-time check, per-IP rate limit (in-memory, per instance — swap `src/lib/rate-limit.ts` for Redis on multi-instance hosting), short-window duplicate suppression, strict security headers and CSP (`next.config.ts`).

Set `CONTACT_PROVIDER` in your environment:

| Value | Behaviour | Required variables |
| --- | --- | --- |
| `resend` | Sends an email through Resend's HTTP API | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified sender domain) |
| `webhook` | POSTs JSON to any URL (CRM, Zapier, Make, n8n, Slack workflow) | `CONTACT_WEBHOOK_URL`, optional `CONTACT_WEBHOOK_SECRET` (sent as `X-Webhook-Secret`) |
| `none` (default) | Validates, then returns an honest "delivery not configured" error with the fallback email | — |

The success state is shown only after the provider confirms delivery. All secrets stay server-side. See `.env.example` for every variable.

## Deployment

Any Node host or Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production domain (drives canonical URLs, sitemap, Open Graph), plus the contact variables above. Remaining steps for the owner:

1. Replace brand name / legal name / emails in `src/content/site.ts` and `.env`.
2. Configure a delivery provider and send a test inquiry.
3. Point DNS at the host and confirm TLS.
4. Optionally add a favicon set under `src/app/` (`icon.png`, `apple-icon.png`).

## Information the owner still needs to supply

- Real agency name, legal entity, registered address, contact email/phone
- Verified company facts (founded, location, team size) and team profiles, if wanted
- Delivered client case studies — current three are clearly labelled **Concept Project / Illustrative Solution** and claim no metrics
- Any testimonials, logos, or certifications (none are shown until verified)
- Privacy policy review by counsel for the applicable jurisdiction

## Verification performed

Type check, lint and production build pass. All routes return 200 (unknown slugs 404). Checked in headless Chromium at 360 / 414 / 768 / 1280 / 1920 px with no horizontal overflow; mobile menu opens, traps focus, closes on Escape and returns focus; services dropdown is keyboard-operable; form shows a focused error summary with per-field messages, pre-selects from the query string, and surfaces the server's "not configured" state honestly. Accessibility and performance targets (WCAG 2.2 AA, Core Web Vitals) are implementation goals — run an audit (e.g. Lighthouse / axe) on the deployed domain before publishing claims.
