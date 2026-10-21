import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { dictionary, isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "页面不存在 · Page not found",
  description: "This page is not on Eevee Li's site.",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const headerList = await headers();
  const raw = headerList.get("x-locale");
  const locale = raw && isLocale(raw) ? raw : "zh";
  const t = dictionary[locale];

  return (
    <main id="main-content" className="missing" data-surface="light">
      <div>
        <p className="sub-kicker">404</p>
        <h1 className="bd">{t.notFound.heading}</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          {t.notFound.body}
        </p>
        <Link className="back" href={`/${locale}`}>
          {t.actions.backHome}
        </Link>
      </div>
    </main>
  );
}
