import { z } from "zod";

export const serviceOptions = [
  { value: "website", label: "Website Development" },
  { value: "web-app", label: "Web Application" },
  { value: "mobile-app", label: "Mobile Application" },
  { value: "crm", label: "Custom CRM" },
  { value: "api", label: "API Development" },
  { value: "integration", label: "Third-Party Integration" },
  { value: "saas", label: "SaaS Platform" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "scoping", label: "Help Defining the Scope" },
] as const;

/** Maps service page slugs to form options so `/contact?service=<slug>` pre-selects. */
export const serviceSlugToOption: Record<string, (typeof serviceOptions)[number]["value"]> = {
  "web-development": "web-app",
  "mobile-app-development": "mobile-app",
  "custom-crm-development": "crm",
  "api-development-integrations": "api",
  "saas-custom-software": "saas",
  "cloud-devops-maintenance": "maintenance",
};

export const stageOptions = [
  { value: "idea", label: "Initial idea" },
  { value: "requirements", label: "Requirements prepared" },
  { value: "designs", label: "Designs ready" },
  { value: "improvement", label: "Existing product improvement" },
  { value: "legacy", label: "Legacy system modernization" },
] as const;

export const budgetOptions = [
  { value: "undisclosed", label: "Prefer not to say yet" },
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k – $25k" },
  { value: "25k-50k", label: "$25k – $50k" },
  { value: "50k-100k", label: "$50k – $100k" },
  { value: "100k-plus", label: "$100k+" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Exploring options" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const inquirySchema = z.object({
  fullName: z.string({ required_error: "Please enter your full name." }).trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.string().trim().email("Please enter a valid work email address.").max(254),
  company: z.string({ required_error: "Please enter your company name." }).trim().min(1, "Please enter your company name.").max(160),
  website: z
    .string()
    .trim()
    .max(255)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v), "Please enter a valid website URL (e.g. example.com)."),
  service: z.enum(values(serviceOptions), { errorMap: () => ({ message: "Please choose the service you need." }) }),
  stage: z.enum(values(stageOptions), { errorMap: () => ({ message: "Please choose your project stage." }) }),
  budget: z.enum(values(budgetOptions), { errorMap: () => ({ message: "Please choose a budget range." }) }),
  timeline: z.enum(values(timelineOptions), { errorMap: () => ({ message: "Please choose a preferred timeline." }) }),
  description: z.string({ required_error: "Please describe the project." }).trim().min(30, "Please describe the project in at least 30 characters.").max(4000, "Please keep the description under 4000 characters."),
  privacy: z.literal(true, { errorMap: () => ({ message: "Please acknowledge the privacy policy." }) }),
  /** Honeypot — must be empty. Bots fill it. */
  companyPhoneExt: z.string().max(0, "Invalid submission.").optional().or(z.literal("")),
  /** Rendered timestamp — submissions faster than a few seconds are rejected. */
  startedAt: z.coerce.number().optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export function labelFor<T extends readonly { value: string; label: string }[]>(opts: T, value: string) {
  return opts.find((o) => o.value === value)?.label ?? value;
}
