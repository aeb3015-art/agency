import "server-only";

/**
 * Simple in-memory sliding-window rate limiter.
 * Scope: per server instance. For multi-instance deployments, swap for Redis/Upstash
 * using the same `check(key)` contract.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return { allowed: false, retryAfterSeconds: Math.ceil((hits[0] + windowMs - now) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  // Opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
