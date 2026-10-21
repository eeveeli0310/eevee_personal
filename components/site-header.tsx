"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/locale-switch";
import { LogoEl26 } from "@/components/logo-el26";

const fineQuery = "(hover: hover) and (pointer: fine)";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const pathname = usePathname() || `/${locale}`;
  const home = localePath(locale);
  const work = localePath(locale, "/work");
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const fine = useRef(true);
  const holdClosed = useRef(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const media = window.matchMedia(fineQuery);
    const apply = () => {
      fine.current = media.matches;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      holdClosed.current = true;
      setOpen(false);
      button.current?.focus();
      window.setTimeout(() => {
        holdClosed.current = false;
      }, 0);
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const focusedInside = () => root.current?.contains(document.activeElement) ?? false;

  return (
    <header className="bar" data-bar data-theme="light">
      <Link href={home} className="logo" aria-label="Eevee Li">
        <LogoEl26 />
      </Link>
      <nav
        ref={root}
        className={open ? "menu is-open" : "menu"}
        aria-label={t.nav.label}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse" && fine.current) setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse" || !fine.current) return;
          if (focusedInside()) return;
          setOpen(false);
        }}
        onFocus={() => {
          if (holdClosed.current || !fine.current) return;
          setOpen(true);
        }}
        onBlur={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          setOpen(false);
        }}
      >
        <div className="menu-panel" id="site-menu" inert={!open}>
          <div className="menu-panel-inner">
            <div className="menu-links">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={item.pill ? "pill" : undefined}
                  aria-current={pathname.startsWith(work) && item.pill ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <LocaleSwitch locale={locale} label={t.localeSwitch.label} zhLabel="中" enLabel="EN" />
          </div>
        </div>
        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => {
            if (fine.current) return;
            setOpen((value) => !value);
          }}
        >
          {t.nav.menu}
        </button>
      </nav>
    </header>
  );
}
