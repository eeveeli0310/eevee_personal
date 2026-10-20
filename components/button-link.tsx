import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-14 items-center justify-center border-2 px-8 py-4 text-sm font-bold uppercase tracking-[-0.04em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-all motion-safe:active:scale-95",
        variant === "primary"
          ? "border-accent bg-accent text-accent-foreground motion-safe:hover:scale-105"
          : "border-border bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-accent-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
