import type { Metadata } from "next";
import { headers } from "next/headers";
import { dictionary, isLocale } from "@/lib/i18n";
import { personJsonLd, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Eevee Li",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo/el26-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo/el26-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/el26-favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo/el26-favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo/el26-favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const raw = headerList.get("x-locale");
  const locale = raw && isLocale(raw) ? raw : "zh";
  const t = dictionary[locale];

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.documentElement;r.classList.add("js","is-loading");try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)r.classList.add("reduce")}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip">
          {t.skip}
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
