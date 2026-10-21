import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/learning-experience", "/project-experience", "/portfolio", ...projectSlugs.map((slug) => `/projects/${slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: path === "" ? "monthly" : "yearly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
