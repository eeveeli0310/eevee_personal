import Link from "next/link";
import { LocaleSwitch } from "@/components/locale-switch";
import { cn } from "@/lib/cn";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
  className?: string;
};

const linkClass =
  "text-xs font-bold uppercase tracking-[0.12em] text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-sm sm:tracking-[0.16em]";

export function SiteHeader({ locale, className }: SiteHeaderProps) {
  const t = dictionary[locale];
  const home = localePath(locale);
  const items = [
    { href: `${home}#work`, label: t.nav.work },
    { href: `${home}#about`, label: t.nav.about },
    { href: `${home}#resume`, label: t.nav.resume },
    { href: `${home}#contact`, label: t.nav.contact },
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between md:pb-8",
        className,
      )}
    >
      <div className="min-w-0 space-y-3">
        <Link href={home} className="inline-block text-xs uppercase tracking-[0.25em] text-accent md:text-sm">
          {site.name}
        </Link>
        <p className="max-w-4xl text-xs uppercase leading-snug tracking-[0.08em] text-muted-foreground sm:text-sm md:tracking-[0.14em]">
          {t.roleLine}
        </p>
      </div>
      <nav aria-label={t.nav.label} className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 md:max-w-md md:justify-end">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={linkClass}>
            {item.label}
          </Link>
        ))}
        <LocaleSwitch locale={locale} label={t.localeSwitch.label} zhLabel={t.localeSwitch.zh} enLabel={t.localeSwitch.en} />
      </nav>
    </div>
  );
}
