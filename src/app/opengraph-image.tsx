import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = siteConfig.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#0b0c10 0%,#121419 60%,#1a1d24 100%)", color: "#eef2f8", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 700 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, border: "3px solid #6b95ff" }} />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1000 }}>Websites, apps, and business systems. Engineered for growth.</div>
          <div style={{ fontSize: 28, color: "#a8a59e", maxWidth: 950 }}>Web · Mobile · Custom CRM · APIs & Integrations · SaaS · Cloud & DevOps</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Full-Stack", "iOS & Android", "API Engineering", "Cloud"].map((t) => (
            <div key={t} style={{ border: "1px solid rgba(107,149,255,0.5)", color: "#6b95ff", borderRadius: 999, padding: "8px 18px", fontSize: 20 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
