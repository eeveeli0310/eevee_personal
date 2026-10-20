import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not on Eevee Li's site.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-20">
      <div className="w-full max-w-frame border-2 border-border p-8 md:p-12">
        <span className="text-xs uppercase tracking-[0.25em] text-accent">404</span>
        <h1 className="kinetic-section mt-6 font-display font-bold uppercase text-foreground">
          This page is not here.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">
          The link may be out of date. Head back to the homepage to see Eevee Li&apos;s selected work.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex border-2 border-foreground px-6 py-4 text-sm font-bold uppercase tracking-[-0.04em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-accent-foreground"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
