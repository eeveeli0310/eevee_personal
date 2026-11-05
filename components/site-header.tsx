"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RouteLink } from "@/components/route-link";
import { gsap } from "gsap";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { LocaleSwitch } from "@/components/locale-switch";
import { RollText } from "@/components/roll-text";
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

type Box = { left: number; top: number; right: number; bottom: number };

function uniq(values: number[]) {
  return [...new Set(values.map((value) => Math.round(value * 4) / 4))].sort((a, b) => a - b);
}

function clampRect(rect: Box, box: Box): Box | null {
  const left = Math.max(box.left, rect.left);
  const top = Math.max(box.top, rect.top);
  const right = Math.min(box.right, rect.right);
  const bottom = Math.min(box.bottom, rect.bottom);
  if (right - left < 0.4 || bottom - top < 0.4) return null;
  return { left, top, right, bottom };
}

/** Frontmost light/dark section under a point. The photo wall is one field: light once it has crossed the mid fade. */
function inkAt(x: number, y: number): "light" | "dark" {
  const stack = document.elementsFromPoint(x, y);
  for (const node of stack) {
    if (!(node instanceof Element) || node.closest("[data-bar]")) continue;
    const surface = node.closest<HTMLElement>("[data-surface]");
    if (!surface) continue;
    if (surface.hasAttribute("data-wall")) {
      const progress = Number(getComputedStyle(surface).getPropertyValue("--wall-p")) || 0;
      return progress >= 0.72 ? "light" : "dark";
    }
    return surface.dataset.surface === "dark" ? "dark" : "light";
  }
  return "dark";
}

/** Light and dark pieces of `box`, cut on every section edge that crosses it. */
function regions(box: Box) {
  const xs = [box.left, box.right];
  const ys = [box.top, box.bottom];
  for (const node of document.querySelectorAll<HTMLElement>("[data-surface]")) {
    const rect = node.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) continue;
    if (rect.right <= box.left || rect.left >= box.right || rect.bottom <= box.top || rect.top >= box.bottom) continue;
    if (rect.left > box.left && rect.left < box.right) xs.push(rect.left);
    if (rect.right > box.left && rect.right < box.right) xs.push(rect.right);
    if (rect.top > box.top && rect.top < box.bottom) ys.push(rect.top);
    if (rect.bottom > box.top && rect.bottom < box.bottom) ys.push(rect.bottom);
  }
  const xEdges = uniq(xs);
  const yEdges = uniq(ys);
  const light: Box[] = [];
  const dark: Box[] = [];
  for (let y = 0; y < yEdges.length - 1; y += 1) {
    for (let x = 0; x < xEdges.length - 1; x += 1) {
      const rect = { left: xEdges[x], top: yEdges[y], right: xEdges[x + 1], bottom: yEdges[y + 1] };
      if (rect.right - rect.left < 0.4 || rect.bottom - rect.top < 0.4) continue;
      const kind = inkAt((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
      (kind === "light" ? light : dark).push(rect);
    }
  }
  return { light, dark };
}

function clipFor(box: Box, rects: Box[]) {
  if (!rects.length) return "inset(100%)";
  const only = rects.length === 1 ? rects[0] : null;
  if (
    only &&
    only.left <= box.left + 0.6 &&
    only.right >= box.right - 0.6 &&
    only.top <= box.top + 0.6 &&
    only.bottom >= box.bottom - 0.6
  ) {
    return "none";
  }
  if (!only) return "";
  const top = Math.max(0, only.top - box.top);
  const right = Math.max(0, box.right - only.right);
  const bottom = Math.max(0, box.bottom - only.bottom);
  const left = Math.max(0, only.left - box.left);
  const px = (n: number) => `${Math.round(n * 10) / 10}px`;
  return `inset(${px(top)} ${px(right)} ${px(bottom)} ${px(left)})`;
}

function setClip(el: HTMLElement, value: string) {
  el.style.setProperty("clip-path", value);
  el.style.setProperty("-webkit-clip-path", value);
}

function simplifyLoop(points: { x: number; y: number }[]) {
  let pts = points;
  let changed = true;
  while (changed && pts.length > 3) {
    changed = false;
    const next: { x: number; y: number }[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[(i - 1 + pts.length) % pts.length];
      const b = pts[i];
      const c = pts[(i + 1) % pts.length];
      const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
      if (Math.abs(cross) < 0.08) {
        changed = true;
        continue;
      }
      next.push(b);
    }
    pts = next;
  }
  return pts;
}

/**
 * One CSS polygon for a connected set of section rects (the L around a card corner).
 * inset() and polygon() are basic shapes, so Safari and iOS clip them. A clip-path
 * url() pointing at another SVG is ignored on SVG elements in WebKit, so that path
 * is only the fallback for a hole, and only on the HTML wrapper.
 */
function polygonFor(box: Box, rects: Box[]): string | null {
  const clamped = rects.map((rect) => clampRect(rect, box)).filter((rect): rect is Box => rect !== null);
  if (!clamped.length) return null;
  const xs = uniq([box.left, box.right, ...clamped.flatMap((rect) => [rect.left, rect.right])]);
  const ys = uniq([box.top, box.bottom, ...clamped.flatMap((rect) => [rect.top, rect.bottom])]);
  const cols = xs.length - 1;
  const rows = ys.length - 1;
  if (cols < 1 || rows < 1) return null;
  const on = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => {
      const cx = (xs[x] + xs[x + 1]) / 2;
      const cy = (ys[y] + ys[y + 1]) / 2;
      return clamped.some((rect) => cx >= rect.left - 0.1 && cx <= rect.right + 0.1 && cy >= rect.top - 0.1 && cy <= rect.bottom + 0.1);
    }),
  );
  type Seg = { x1: number; y1: number; x2: number; y2: number };
  const segs: Seg[] = [];
  const add = (x1: number, y1: number, x2: number, y2: number, nx: number, ny: number) => {
    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && on[ny][nx]) return;
    if (Math.abs(x1 - x2) < 0.01 && Math.abs(y1 - y2) < 0.01) return;
    segs.push({ x1, y1, x2, y2 });
  };
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (!on[y][x]) continue;
      add(xs[x], ys[y], xs[x + 1], ys[y], x, y - 1);
      add(xs[x + 1], ys[y], xs[x + 1], ys[y + 1], x + 1, y);
      add(xs[x + 1], ys[y + 1], xs[x], ys[y + 1], x, y + 1);
      add(xs[x], ys[y + 1], xs[x], ys[y], x - 1, y);
    }
  }
  if (!segs.length) return null;
  const key = (x: number, y: number) => `${Math.round(x * 100)},${Math.round(y * 100)}`;
  const outgoing = new Map<string, Seg[]>();
  for (const seg of segs) {
    const k = key(seg.x1, seg.y1);
    const list = outgoing.get(k);
    if (list) list.push(seg);
    else outgoing.set(k, [seg]);
  }
  const unused = new Set(segs);
  const loops: { x: number; y: number }[][] = [];
  while (unused.size) {
    const start = unused.values().next().value;
    if (!start) break;
    unused.delete(start);
    const loop = [{ x: start.x1, y: start.y1 }];
    let x = start.x2;
    let y = start.y2;
    let guard = segs.length + 2;
    let closed = false;
    while (guard > 0) {
      guard -= 1;
      if (Math.abs(x - start.x1) < 0.05 && Math.abs(y - start.y1) < 0.05) {
        closed = true;
        break;
      }
      const list = outgoing.get(key(x, y));
      const seg = list?.find((item) => unused.has(item));
      if (!seg) return null;
      unused.delete(seg);
      loop.push({ x, y });
      x = seg.x2;
      y = seg.y2;
    }
    if (!closed || loop.length < 3) return null;
    loops.push(simplifyLoop(loop));
  }
  if (loops.length !== 1 || loops[0].length < 3) return null;
  const fmt = (n: number) => `${Math.round(n * 10) / 10}px`;
  return `polygon(${loops[0].map((point) => `${fmt(point.x - box.left)} ${fmt(point.y - box.top)}`).join(", ")})`;
}

function applyClip(el: HTMLElement, box: Box, rects: Box[], clipId: string) {
  const single = clipFor(box, rects);
  if (single) {
    setClip(el, single);
    return;
  }
  const polygon = polygonFor(box, rects);
  if (polygon) {
    setClip(el, polygon);
    return;
  }
  const clip = document.getElementById(clipId);
  if (!clip) {
    setClip(el, "none");
    return;
  }
  clip.replaceChildren();
  const width = box.right - box.left || 1;
  const height = box.bottom - box.top || 1;
  for (const rect of rects) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    node.setAttribute("x", String(Math.max(0, (rect.left - box.left) / width)));
    node.setAttribute("y", String(Math.max(0, (rect.top - box.top) / height)));
    node.setAttribute("width", String(Math.max(0, Math.min(1, (rect.right - rect.left) / width))));
    node.setAttribute("height", String(Math.max(0, Math.min(1, (rect.bottom - rect.top) / height))));
    clip.appendChild(node);
  }
  setClip(el, `url(#${clipId})`);
}

function paintPair(lightEl: HTMLElement, darkEl: HTMLElement, lightId: string, darkId: string) {
  const box = lightEl.getBoundingClientRect();
  if (box.width < 1 || box.height < 1) return;
  const parts = regions(box);
  applyClip(lightEl, box, parts.light, lightId);
  const darkBox = darkEl.getBoundingClientRect();
  // Tuck the cream copy 1px under the black edge so the two clips cannot leave a hairline of the page.
  const grown = parts.dark
    .map((rect) => clampRect({ left: rect.left - 1, top: rect.top - 1, right: rect.right + 1, bottom: rect.bottom + 1 }, darkBox))
    .filter((rect): rect is Box => rect !== null);
  applyClip(darkEl, darkBox, grown, darkId);
}

/** Off-white covers dark sections out to the squircle edge. The black stroke exists only over light. */
function paintButton(fill: HTMLElement, border: HTMLElement) {
  const box = fill.getBoundingClientRect();
  if (box.width < 1 || box.height < 1) return;
  const parts = regions(box);
  applyClip(fill, box, parts.dark, "toggle-ink-dark");
  applyClip(border, border.getBoundingClientRect(), parts.light, "toggle-ink-light");
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
    const header = headerRef.current;
    if (!header) return;
    const lightLogo = header.querySelector<HTMLElement>(".logo-split .is-light");
    const darkLogo = header.querySelector<HTMLElement>(".logo-split .is-dark");
    const toggleFill = header.querySelector<HTMLElement>(".toggle-fill");
    const toggleBorder = header.querySelector<HTMLElement>(".toggle-border");
    if (!lightLogo || !darkLogo || !toggleFill || !toggleBorder) return;

    let dirty = true;
    const mark = () => {
      dirty = true;
    };
    const paint = () => {
      dirty = false;
      // Menu-open cream is also forced in CSS. Inline clips must match so closing the menu
      // does not leave the previous cream clip in place.
      if (open) {
        setClip(lightLogo, "inset(100%)");
        setClip(darkLogo, "none");
        setClip(toggleFill, "inset(100%)");
        setClip(toggleBorder, "inset(100%)");
        return;
      }
      const blockers = [...header.querySelectorAll<HTMLElement>("a, button")];
      const previous = blockers.map((node) => node.style.pointerEvents);
      blockers.forEach((node) => {
        node.style.pointerEvents = "none";
      });
      try {
        paintPair(lightLogo, darkLogo, "logo-ink-light", "logo-ink-dark");
        paintButton(toggleFill, toggleBorder);
      } finally {
        blockers.forEach((node, index) => {
          node.style.pointerEvents = previous[index];
        });
      }
    };
    const tick = () => {
      bindLenis();
      if (!dirty) return;
      paint();
    };
    // Lenis is registered on the ticker after this header (parent effect). Painting inside
    // its scroll event runs after ScrollTrigger moves the card, still before the frame paints.
    type LenisScroll = { on?: (event: string, cb: () => void) => void; off?: (event: string, cb: () => void) => void };
    let bound: LenisScroll | null = null;
    function bindLenis() {
      const current = (window.__eeveeLenis as unknown as LenisScroll | null) ?? null;
      if (current === bound) return;
      try {
        bound?.off?.("scroll", paint);
      } catch {
        /* Lenis already destroyed */
      }
      bound = current;
      current?.on?.("scroll", paint);
    }
    gsap.ticker.add(tick);
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    window.addEventListener("load", mark);
    window.addEventListener("eevee:ready", mark);
    bindLenis();
    paint();
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
      window.removeEventListener("load", mark);
      window.removeEventListener("eevee:ready", mark);
      try {
        bound?.off?.("scroll", paint);
      } catch {
        /* Lenis already destroyed */
      }
    };
  }, [pathname, open]);

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
      <svg className="ink-clips" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="logo-ink-light" clipPathUnits="objectBoundingBox" />
          <clipPath id="logo-ink-dark" clipPathUnits="objectBoundingBox" />
          <clipPath id="toggle-ink-light" clipPathUnits="objectBoundingBox" />
          <clipPath id="toggle-ink-dark" clipPathUnits="objectBoundingBox" />
        </defs>
      </svg>
      <RouteLink href={home} className="logo" aria-label="Eevee Li">
        <span className="logo-split">
          <span className="ink-layer is-dark">
            <LogoEl26 />
          </span>
          <span className="ink-layer is-light">
            <LogoEl26 />
          </span>
        </span>
      </RouteLink>
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
        <span className="toggle-fill" />
        <span className="toggle-border" aria-hidden="true" />
        <span className="toggle-liquid" aria-hidden="true" />
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
        onPointerMove={(event) => {
          if ((event.target as HTMLElement).closest(".menu-links a")) return;
          setHover((current) => (current == null ? current : null));
        }}
      >
        <ContourField tone="dark" />
        <div className="menu-photos" aria-hidden="true">
          {(["home", "work", "life"] as const).map((key) => (
            <figure key={key} className={hover === key ? "menu-shot is-hot" : "menu-shot"} data-shot={key}>
              <img src={photos[key]} alt="" />
            </figure>
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
              <RouteLink
                key={link.key}
                href={link.href}
                className={shown === link.key ? "is-lit" : undefined}
                aria-current={pageKey === link.key ? "page" : undefined}
                onPointerEnter={() => setHover(link.key)}
                onFocus={() => setHover(link.key)}
              >
                <RollText>{link.label}</RollText>
                <Squiggle />
              </RouteLink>
            ))}
          </nav>
          <div className="menu-meta">
            <a className="menu-enquiry" href="mailto:[email]" title={copy.emailPending}>
              <RollText>{t.actions.enquiry}</RollText>
            </a>
            <div className="menu-socials">
              {copy.socials.map((name) => (
                <span key={name} className="roll-hit" title={copy.pending}>
                  <RollText>{name}</RollText>
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
