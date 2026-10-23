"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

function normalize(path: string) {
  const bare = path.split(/[?#]/)[0];
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare || "/";
}

/** True when `href` is this document, ignoring a trailing slash. */
export function sameRoute(pathname: string, href: string) {
  return normalize(pathname) === normalize(href);
}

type Props = ComponentProps<typeof Link>;

/** Next link that ignores a plain click when it already points at the open route. */
export function RouteLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname() || "/";
  const current = typeof href === "string" && sameRoute(pathname, href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !current) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
  };

  return (
    <Link
      href={href}
      {...props}
      aria-current={props["aria-current"] ?? (current ? "page" : undefined)}
      onClick={handleClick}
    />
  );
}
