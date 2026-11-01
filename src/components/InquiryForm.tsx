"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { budgetOptions, inquirySchema, serviceOptions, stageOptions, timelineOptions, type InquiryInput } from "@/lib/inquiry-schema";
import { siteConfig } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof InquiryInput | "form", string>>;

const initial = (service?: string): InquiryInput => ({
  fullName: "",
  email: "",
  company: "",
  website: "",
  service: (service as InquiryInput["service"]) ?? ("" as InquiryInput["service"]),
  stage: "" as InquiryInput["stage"],
  budget: "" as InquiryInput["budget"],
  timeline: "" as InquiryInput["timeline"],
  description: "",
  privacy: false as unknown as true,
  companyPhoneExt: "",
});

export function InquiryForm({ defaultService }: { defaultService?: string }) {
  const [values, setValues] = useState<InquiryInput>(() => initial(defaultService));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const f = (name: keyof InquiryInput) => `${id}-${name}`;

  const set = (name: keyof InquiryInput, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const parsed = inquirySchema.safeParse({ ...values, startedAt: startedAt.current });
    if (parsed.success) return null;
    const next: Errors = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0]) as keyof Errors;
      if (!next[k]) next[k] = issue.message;
    }
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    const clientErrors = validate();
    if (clientErrors) {
      setErrors(clientErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    inFlight.current = true;
    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setServerMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("We could not reach the server. Check your connection and try again.");
    } finally {
      inFlight.current = false;
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="card p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">Thanks — your inquiry is on its way.</h2>
        <p className="mt-2 text-fg-muted">{siteConfig.contact.responseTime} We will reply to {values.email}.</p>
        <Link href="/process" className="btn btn-secondary mt-6">
          See what happens next
        </Link>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];
  const Err = ({ name }: { name: keyof InquiryInput }) =>
    errors[name] ? (
      <p id={`${f(name)}-err`} className="mt-1.5 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;
  const a11y = (name: keyof InquiryInput) => ({ "aria-invalid": errors[name] ? true : undefined, "aria-describedby": errors[name] ? `${f(name)}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-busy={status === "submitting"}>
      {errorList.length > 0 && (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm">
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-fg-muted">
            {errorList.map(([k, v]) => (
              <li key={k}>
                {k === "form" ? v : <a href={`#${f(k as keyof InquiryInput)}`} className="underline underline-offset-2">{v}</a>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={f("fullName")} className="block text-sm font-medium">
            Full name <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <input id={f("fullName")} name="fullName" className="field mt-1.5" autoComplete="name" required value={values.fullName} onChange={(e) => set("fullName", e.target.value)} {...a11y("fullName")} />
          <Err name="fullName" />
        </div>
        <div>
          <label htmlFor={f("email")} className="block text-sm font-medium">
            Work email <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <input id={f("email")} name="email" type="email" inputMode="email" className="field mt-1.5" autoComplete="email" required value={values.email} onChange={(e) => set("email", e.target.value)} {...a11y("email")} />
          <Err name="email" />
        </div>
        <div>
          <label htmlFor={f("company")} className="block text-sm font-medium">
            Company name <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <input id={f("company")} name="company" className="field mt-1.5" autoComplete="organization" required value={values.company} onChange={(e) => set("company", e.target.value)} {...a11y("company")} />
          <Err name="company" />
        </div>
        <div>
          <label htmlFor={f("website")} className="block text-sm font-medium">
            Website URL <span className="text-fg-subtle">(optional)</span>
          </label>
          <input id={f("website")} name="website" type="text" inputMode="url" placeholder="example.com" className="field mt-1.5" autoComplete="url" value={values.website ?? ""} onChange={(e) => set("website", e.target.value)} {...a11y("website")} />
          <Err name="website" />
        </div>
        <div>
          <label htmlFor={f("service")} className="block text-sm font-medium">
            Service required <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <select id={f("service")} name="service" className="field mt-1.5" required value={values.service} onChange={(e) => set("service", e.target.value)} {...a11y("service")}>
            <option value="">Select a service…</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Err name="service" />
        </div>
        <div>
          <label htmlFor={f("stage")} className="block text-sm font-medium">
            Project stage <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <select id={f("stage")} name="stage" className="field mt-1.5" required value={values.stage} onChange={(e) => set("stage", e.target.value)} {...a11y("stage")}>
            <option value="">Select a stage…</option>
            {stageOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Err name="stage" />
        </div>
        <div>
          <label htmlFor={f("budget")} className="block text-sm font-medium">
            Estimated budget range <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <select id={f("budget")} name="budget" className="field mt-1.5" required value={values.budget} onChange={(e) => set("budget", e.target.value)} {...a11y("budget")}>
            <option value="">Select a range…</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Err name="budget" />
        </div>
        <div>
          <label htmlFor={f("timeline")} className="block text-sm font-medium">
            Preferred timeline <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <select id={f("timeline")} name="timeline" className="field mt-1.5" required value={values.timeline} onChange={(e) => set("timeline", e.target.value)} {...a11y("timeline")}>
            <option value="">Select a timeline…</option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Err name="timeline" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={f("description")} className="block text-sm font-medium">
            Project description <span aria-hidden="true" className="text-cyan">*</span>
          </label>
          <p id={`${f("description")}-hint`} className="mt-1 text-xs text-fg-subtle">
            What are you building, who is it for, and which systems does it need to connect to? Rough notes are fine.
          </p>
          <textarea
            id={f("description")}
            name="description"
            rows={6}
            className="field mt-1.5 resize-y"
            required
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={`${f("description")}-hint${errors.description ? ` ${f("description")}-err` : ""}`}
          />
          <div className="mt-1 flex justify-between gap-3">
            <Err name="description" />
            <span className="mono ml-auto text-xs text-fg-subtle">{values.description.length}/4000</span>
          </div>
        </div>

        {/* Honeypot: hidden from humans, visible to bots */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={f("companyPhoneExt")}>Phone extension</label>
          <input id={f("companyPhoneExt")} name="companyPhoneExt" tabIndex={-1} autoComplete="off" value={values.companyPhoneExt ?? ""} onChange={(e) => set("companyPhoneExt", e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input id={f("privacy")} name="privacy" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cyan" checked={values.privacy === true} onChange={(e) => set("privacy", e.target.checked)} {...a11y("privacy")} />
            <label htmlFor={f("privacy")} className="text-sm text-fg-muted">
              I understand that my details will be used to respond to this inquiry, as described in the{" "}
              <Link href="/privacy" className="text-cyan underline-offset-4 hover:underline">
                privacy policy
              </Link>
              . <span aria-hidden="true" className="text-cyan">*</span>
            </label>
          </div>
          <Err name="privacy" />
        </div>
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="mt-6 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm">
          <p className="font-semibold">Your inquiry was not sent.</p>
          <p className="mt-1 text-fg-muted">
            {serverMessage} You can also reach us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-cyan underline-offset-4 hover:underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <svg className="spinner h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
                <path d="M21 12a9 9 0 0 0-9-9" />
              </svg>
              Sending…
            </>
          ) : status === "error" ? (
            "Try again"
          ) : (
            "Send Project Inquiry"
          )}
        </button>
        <p className="text-xs text-fg-subtle">No commitment. We will reply with questions or next steps.</p>
      </div>
    </form>
  );
}
