import "server-only";
import { budgetOptions, labelFor, serviceOptions, stageOptions, timelineOptions, type Inquiry } from "./inquiry-schema";

export type DeliveryResult = { ok: true; provider: string } | { ok: false; reason: "not_configured" | "provider_error"; detail?: string };

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function render(inquiry: Inquiry, meta: { ip?: string; userAgent?: string }) {
  const rows: [string, string][] = [
    ["Name", inquiry.fullName],
    ["Email", inquiry.email],
    ["Company", inquiry.company],
    ["Website", inquiry.website ?? "—"],
    ["Service", labelFor(serviceOptions, inquiry.service)],
    ["Project stage", labelFor(stageOptions, inquiry.stage)],
    ["Budget", labelFor(budgetOptions, inquiry.budget)],
    ["Timeline", labelFor(timelineOptions, inquiry.timeline)],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Description:", inquiry.description, "", `IP: ${meta.ip ?? "unknown"}`, `UA: ${meta.userAgent ?? "unknown"}`].join("\n");
  const html = `<h2>New project inquiry</h2><table>${rows.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table><h3>Description</h3><p style="white-space:pre-wrap">${escapeHtml(inquiry.description)}</p><p style="color:#888;font-size:12px">IP ${escapeHtml(meta.ip ?? "unknown")}</p>`;
  return { text, html, subject: `Project inquiry: ${inquiry.company} — ${labelFor(serviceOptions, inquiry.service)}` };
}

/**
 * Delivers an inquiry using the provider selected by CONTACT_PROVIDER.
 * Secrets stay server-side. Returns an honest result so the UI can show real state.
 */
export async function deliverInquiry(inquiry: Inquiry, meta: { ip?: string; userAgent?: string }): Promise<DeliveryResult> {
  const provider = (process.env.CONTACT_PROVIDER || "none").toLowerCase();
  const payload = render(inquiry, meta);

  try {
    if (provider === "resend") {
      const key = process.env.RESEND_API_KEY;
      const to = process.env.CONTACT_TO_EMAIL;
      const from = process.env.CONTACT_FROM_EMAIL;
      if (!key || !to || !from) return { ok: false, reason: "not_configured", detail: "RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are required." };
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), reply_to: inquiry.email, subject: payload.subject, text: payload.text, html: payload.html }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) return { ok: false, reason: "provider_error", detail: `Resend responded ${res.status}` };
      return { ok: true, provider: "resend" };
    }

    if (provider === "webhook") {
      const url = process.env.CONTACT_WEBHOOK_URL;
      if (!url) return { ok: false, reason: "not_configured", detail: "CONTACT_WEBHOOK_URL is required." };
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.CONTACT_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.CONTACT_WEBHOOK_SECRET;
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ type: "project_inquiry", receivedAt: new Date().toISOString(), inquiry: { ...inquiry, companyPhoneExt: undefined, startedAt: undefined }, meta, subject: payload.subject }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) return { ok: false, reason: "provider_error", detail: `Webhook responded ${res.status}` };
      return { ok: true, provider: "webhook" };
    }

    return { ok: false, reason: "not_configured", detail: "CONTACT_PROVIDER is not set. See .env.example." };
  } catch (err) {
    return { ok: false, reason: "provider_error", detail: err instanceof Error ? err.message : "Unknown error" };
  }
}
