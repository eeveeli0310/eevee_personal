import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const site = {
  name: "Eevee Li",
  url: "https://eeveeli.me",
  title: "Eevee Li｜内容与品牌运营 Content & Brand Operator",
  description: "Eevee Li，内容与品牌运营。用内容与数据，为科技品牌做海外增长。",
  role: "内容与品牌运营 · Content & Brand Operator",
  email: "2927703817lsy@gmail.com",
  wechat: "Eeveeli0310",
  location: "Shanghai",
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Content & Brand Operator",
  description: site.description,
  knowsLanguage: ["en", "zh-CN"],
  homeLocation: {
    "@type": "Place",
    name: site.location,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "UNSW Sydney",
  },
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  absolute?: boolean;
  shareAlt: string;
};

export function pageMeta({ title, description, path, locale, absolute = false, shareAlt }: PageMetaInput): Metadata {
  const suffix = path === "/" ? "" : path;
  const canonical = `/${locale}${suffix}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": `/en${suffix}`,
        en: `/en${suffix}`,
        "zh-CN": `/zh${suffix}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: site.name,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: shareAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: shareAlt,
        },
      ],
    },
  };
}
