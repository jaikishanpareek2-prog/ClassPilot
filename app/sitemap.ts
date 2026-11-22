import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/tools/lesson-planner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tools/certificate-maker`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tools/worksheet-generator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tools/quiz-generator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/tools/rubric-generator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
