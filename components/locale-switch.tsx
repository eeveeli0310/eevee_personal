"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

function hrefFor(pathname: string, next: Locale) {
  if (/^\/(zh|en)(?=\/|$)/.test(pathname)) return pathname.replace(/^\/(zh|en)/, `/${next}`);
  return `/${next}`;
}

export function LocaleSwitch({
  locale,
  label,
  zhLabel,
  enLabel,
}: {
  locale: Locale;
  label: string;
  zhLabel: string;
  enLabel: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <div className="lang" role="group" aria-label={label}>
      <Link href={hrefFor(pathname, "zh")} hrefLang="zh-CN" lang="zh-CN" aria-current={locale === "zh" ? "true" : undefined}>
        {zhLabel}
      </Link>
      <span aria-hidden="true">/</span>
      <Link href={hrefFor(pathname, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>
        {enLabel}
      </Link>
    </div>
  );
}
