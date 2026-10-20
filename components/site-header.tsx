"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { cn } from "@/lib/cn";
import { navItems, site } from "@/lib/site";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-start md:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{site.name}</div>
        <div className="max-w-4xl text-sm uppercase tracking-[0.2em] text-muted-foreground md:text-base">
          {site.role}
        </div>
      </div>
      <div className="relative flex w-full flex-wrap items-start justify-end gap-3 md:w-auto" ref={menuRef}>
        <ButtonLink href={`mailto:${site.email}`} className="min-h-[3.5rem] px-6 py-3">
          Cooperation
        </ButtonLink>
        <div className="relative">
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-14 w-14 items-center justify-center border-2 border-border bg-transparent text-foreground transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="sr-only">{open ? "Close site menu" : "Open site menu"}</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
          {open ? (
            <div
              id="site-menu"
              role="menu"
              className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-[18rem] max-w-[calc(100vw-2rem)] border-2 border-border bg-background"
            >
              {navItems.map((item) =>
                pathname === item.href ? (
                  <span
                    key={item.href}
                    role="menuitem"
                    aria-current="page"
                    aria-disabled="true"
                    className="block border-b border-border px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground last:border-b-0"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="block border-b border-border px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-accent focus-visible:bg-muted focus-visible:text-accent focus-visible:outline-none last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
