import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const staticRoutes = ["", "/services", "/work", "/process", "/about", "/contact", "/privacy"];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...caseStudies.map((c) => ({ url: `${base}/work/${c.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
