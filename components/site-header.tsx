"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/locale-switch";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const pathname = usePathname() || `/${locale}`;
  const home = localePath(locale);
  const work = localePath(locale, "/work");
  const items = [
    { href: work, label: t.nav.work, pill: true },
    { href: `${home}#about`, label: t.nav.about, pill: false },
    { href: `${home}#resume`, label: t.nav.resume, pill: false },
    { href: `${home}#contact`, label: t.nav.contact, pill: false },
  ];

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-bar]");
    if (!header) return;
    const pick = () => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-surface]");
      let theme = "light";
      const y = 28;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top <= y && rect.bottom > y) theme = node.dataset.surface || "light";
      });
      header.dataset.theme = theme;
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [pathname]);

  return (
    <header className="bar" data-bar data-theme="light">
      <Link href={home} className="logo" aria-label="Eevee Li">
        <span className="sf">EEVEE</span>
        <span className="bd">LI</span>
      </Link>
      <nav className="nav" aria-label={t.nav.label}>
        {items.map((item) => (
          <Link key={item.label} href={item.href} className={item.pill ? "pill" : undefined} aria-current={pathname.startsWith(work) && item.pill ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
        <LocaleSwitch locale={locale} label={t.localeSwitch.label} zhLabel="中" enLabel="EN" />
      </nav>
    </header>
  );
}
