"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/locale-switch";
import { LogoEl26 } from "@/components/logo-el26";
import { ContourField } from "@/components/motion/contour-field";

type MenuPhoto = "home" | "work" | "life";

const photos: Record<MenuPhoto, string> = {
  home: "/img/face.jpg",
  work: "/img/vr.png",
  life: "/img/face.png",
};

const menuCopy = {
  zh: {
    close: "关闭菜单",
    home: "首页",
    work: "工作",
    life: "生活",
    pending: "链接尚未写入",
    emailPending: "邮箱尚未写入",
    socials: ["小红书", "抖音", "Instagram", "LinkedIn"],
  },
  en: {
    close: "Close menu",
    home: "Home",
    work: "Work",
    life: "Life",
    pending: "Link not added yet",
    emailPending: "Email not added yet",
    socials: ["Xiaohongshu", "Douyin", "Instagram", "LinkedIn"],
  },
} as const;

function pagePhoto(pathname: string, locale: Locale): MenuPhoto {
  const base = `/${locale}`;
  if (pathname === `${base}/work` || pathname.startsWith(`${base}/work/`)) return "work";
  if (pathname === `${base}/life` || pathname.startsWith(`${base}/life/`)) return "life";
  return "home";
}

function Squiggle() {
  return (
    <svg className="squiggle" viewBox="0 0 180 16" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 9 C14 2, 24 15, 40 8 S62 1, 80 10 S104 16, 124 7 S148 2, 166 11 S176 13, 178 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const copy = menuCopy[locale];
  const pathname = usePathname() || `/${locale}`;
  const home = localePath(locale);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<MenuPhoto | null>(null);
  const pageKey = pagePhoto(pathname, locale);
  const shown = hover ?? pageKey;
  const links: { key: MenuPhoto; href: string; label: string }[] = [
    { key: "home", href: home, label: copy.home },
    { key: "work", href: localePath(locale, "/work"), label: copy.work },
    { key: "life", href: localePath(locale, "/life"), label: copy.life },
  ];

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-bar]");
    if (!header) return;
    const pick = () => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-surface]")];
      const y = 28;
      const hits = nodes.filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top <= y && rect.bottom > y;
      });
      const hit = hits.length ? hits[hits.length - 1] : null;
      const wall = hit?.hasAttribute("data-wall") ? hit : null;
      if (wall) {
        const p = Number(wall.style.getPropertyValue("--wall-p") || "0");
        const fg = Number(wall.style.getPropertyValue("--wall-fg") || "0");
        header.dataset.wallMix = "1";
        header.style.setProperty("--wall-p", p.toFixed(4));
        header.style.setProperty("--wall-fg", fg.toFixed(4));
        header.dataset.theme = p >= 0.5 ? "light" : "dark";
        return;
      }
      header.removeAttribute("data-wall-mix");
      header.style.removeProperty("--wall-p");
      header.style.removeProperty("--wall-fg");
      header.dataset.theme = hit?.dataset.surface || "light";
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
    setOpen(false);
    setHover(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("is-menu-open");
    window.__eeveeLenis?.stop();
    dialogRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setHover(null);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const header = headerRef.current;
      if (!header) return;
      const items = [...document.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter((el) => {
        if (el.closest("[inert]")) return false;
        if (header.contains(el)) return true;
        return el.classList.contains("skip");
      });
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || !items.includes(active)) {
        event.preventDefault();
        if (event.shiftKey) buttonRef.current?.focus();
        else linksRef.current?.querySelector("a")?.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("is-menu-open");
      document.removeEventListener("keydown", onKey);
      if (!root.classList.contains("is-loading") && !root.classList.contains("is-covering")) {
        window.__eeveeLenis?.start();
      }
    };
  }, [open]);

  const clearHover = (current: HTMLElement, next: EventTarget | null) => {
    if (next instanceof Node && current.contains(next)) return;
    const active = document.activeElement;
    if (active instanceof Node && current.contains(active) && linksRef.current?.contains(active)) return;
    setHover(null);
  };

  return (
    <header
      ref={headerRef}
      className="bar"
      data-bar
      data-theme="light"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpen(false);
      }}
    >
      <Link href={home} className="logo" aria-label="Eevee Li">
        <LogoEl26 />
      </Link>
      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? copy.close : t.nav.menu}
        onClick={() => {
          setOpen((value) => {
            if (value) setHover(null);
            return !value;
          });
        }}
      >
        <span className="burger" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <div
        ref={dialogRef}
        id="site-menu"
        className={open ? "menu-screen is-open" : "menu-screen"}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label={t.nav.menu}
        tabIndex={-1}
        inert={open ? undefined : true}
        data-lenis-prevent
      >
        <ContourField tone="dark" />
        <div className="menu-photo">
          {(Object.keys(photos) as MenuPhoto[]).map((key) => (
            <img key={key} src={photos[key]} alt="" className={shown === key ? "is-on" : undefined} />
          ))}
        </div>
        <div className="menu-col">
          <nav
            ref={linksRef}
            className="menu-links"
            aria-label={t.nav.label}
            onPointerLeave={(event) => clearHover(event.currentTarget, event.relatedTarget)}
            onBlur={(event) => clearHover(event.currentTarget, event.relatedTarget)}
          >
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={shown === link.key ? "is-lit" : undefined}
                aria-current={pageKey === link.key ? "page" : undefined}
                onPointerEnter={() => setHover(link.key)}
                onFocus={() => setHover(link.key)}
              >
                {link.label}
                <Squiggle />
              </Link>
            ))}
          </nav>
          <div className="menu-meta">
            <a className="menu-enquiry" href="mailto:[email]" title={copy.emailPending}>
              {t.actions.enquiry}
            </a>
            <div className="menu-socials">
              {copy.socials.map((name) => (
                <span key={name} title={copy.pending}>
                  {name}
                </span>
              ))}
            </div>
            <LocaleSwitch locale={locale} label={t.localeSwitch.label} zhLabel="中" enLabel="EN" />
          </div>
        </div>
      </div>
    </header>
  );
}
