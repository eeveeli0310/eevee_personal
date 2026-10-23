import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { RollText } from "@/components/roll-text";
import { defaultLocale, dictionary, isLocale } from "@/lib/i18n";
import { personJsonLd, site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#282C20",
};

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
      { url: "/favicon.svg?v=el26", type: "image/svg+xml" },
      { url: "/favicon.ico?v=el26", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-32.png?v=el26", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=el26", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=el26", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=el26", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    locale: "en_US",
    siteName: site.name,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const raw = headerList.get("x-locale");
  const locale = raw && isLocale(raw) ? raw : defaultLocale;
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
          <RollText>{t.skip}</RollText>
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
