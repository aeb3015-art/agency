import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { deliverInquiry } from "@/lib/inquiry-delivery";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);
const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS || 600) * 1000;
const MIN_FILL_MS = 3000;

/** Dedupe identical submissions for a short time (double-click / retry protection). */
const recent = new Map<string, number>();

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const rl = rateLimit(`inquiry:${ip}`, MAX, WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again later or email us directly." }, { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json", message: "The request could not be read." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot hit — pretend success to avoid tipping off bots.
    if (fieldErrors.companyPhoneExt) return NextResponse.json({ ok: true, delivered: true });
    return NextResponse.json({ ok: false, code: "validation", message: "Please correct the highlighted fields.", fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Timing check: real humans take longer than a few seconds.
  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  // Duplicate protection
  const dedupeKey = `${data.email.toLowerCase()}|${data.description.slice(0, 200)}`;
  const last = recent.get(dedupeKey);
  if (last && Date.now() - last < 2 * 60 * 1000) {
    return NextResponse.json({ ok: true, delivered: true, duplicate: true });
  }

  const result = await deliverInquiry(data, { ip, userAgent });
  if (!result.ok) {
    console.error("[inquiry] delivery failed:", result.reason, result.detail ?? "");
    const message =
      result.reason === "not_configured"
        ? "Our inquiry delivery is not configured yet, so your message was not sent. Please email us directly."
        : "We could not deliver your message right now. Please try again in a moment or email us directly.";
    return NextResponse.json({ ok: false, code: result.reason, message }, { status: 503 });
  }
  recent.set(dedupeKey, Date.now());
  return NextResponse.json({ ok: true, delivered: true });
}
