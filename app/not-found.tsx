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
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-frame border-2 border-border p-8 md:p-12">
        <span className="text-xs uppercase tracking-[0.25em] text-accent">404</span>
        <h1 className="kinetic-section mt-6 font-display font-bold uppercase text-foreground">{t.notFound.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">{t.notFound.body}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex border-2 border-foreground px-6 py-4 text-sm font-bold uppercase tracking-[-0.04em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-accent-foreground"
        >
          {t.actions.backHome}
        </Link>
      </div>
    </main>
  );
}
