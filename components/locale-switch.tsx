"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

type LocaleSwitchProps = {
  locale: Locale;
  label: string;
  zhLabel: string;
  enLabel: string;
};

function hrefFor(pathname: string, locale: Locale, next: Locale) {
  if (/^\/(zh|en)(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(zh|en)/, `/${next}`);
  }
  return `/${next}`;
}

export function LocaleSwitch({ locale, label, zhLabel, enLabel }: LocaleSwitchProps) {
  const pathname = usePathname() || `/${locale}`;
  const options = [
    { id: "zh" as const, text: zhLabel, lang: "zh-CN" },
    { id: "en" as const, text: enLabel, lang: "en" },
  ];

  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-2">
      {options.map((option, index) => (
        <span key={option.id} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
          ) : null}
          <Link
            href={hrefFor(pathname, locale, option.id)}
            hrefLang={option.lang}
            lang={option.lang}
            aria-current={locale === option.id ? "true" : undefined}
            className={cn(
              "text-xs font-bold uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm",
              locale === option.id ? "text-accent" : "text-foreground hover:text-accent",
            )}
          >
            {option.text}
          </Link>
        </span>
      ))}
    </div>
  );
}
