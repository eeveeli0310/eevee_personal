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
    icon: [{ url: "/favicon.ico" }, { url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
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
            __html: `(function(){var r=document.documentElement;r.classList.add("js");var reduce=false;try{reduce=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}if(reduce)r.classList.add("reduce");var seen=false;try{seen=sessionStorage.getItem("eevee-loader-seen")==="1"}catch(e){}if(reduce||seen)r.classList.add("loader-skip");else r.classList.add("is-loading")})();`,
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
