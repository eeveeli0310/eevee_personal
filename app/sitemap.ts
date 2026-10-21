import type { MetadataRoute } from "next";
import { caseSlugs } from "@/lib/cases";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/life", ...caseSlugs.map((slug) => `/work/${slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date("2026-10-21"),
      changeFrequency: path === "" ? "monthly" : "yearly",
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
