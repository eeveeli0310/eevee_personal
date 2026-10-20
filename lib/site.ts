import type { Metadata } from "next";

const shareAlt = "Eevee Li — Overseas Market Content Operator, Content Creator, and Designer";

export const site = {
  name: "Eevee Li",
  url: "https://eeveeli.me",
  title: "Eevee Li — Overseas Market Content Operator / Content Creator / Designer",
  description:
    "Portfolio of Eevee Li, an overseas market content operator, content creator, and designer based in Shanghai. Selected work includes the Pimax Micro-OLED launch event video.",
  role: "Overseas Market Content Operator / Content Creator / Designer",
  email: "2927703817lsy@gmail.com",
  wechat: "Eeveeli0310",
  phone: "19810620310",
  location: "Shanghai",
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: site.phone,
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
  absolute?: boolean;
};

export function pageMeta({ title, description, path, absolute = false }: PageMetaInput): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: site.name,
      locale: "en_US",
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

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/learning-experience", label: "Learning Experience" },
  { href: "/project-experience", label: "Project Experience" },
  { href: "/portfolio", label: "Portfolio" },
] as const;

export const marqueeItems = [
  "Overseas Content",
  "Content Creation",
  "Visual Design",
  "Launch Storytelling",
  "Global Audience",
  "Performance Art",
] as const;
