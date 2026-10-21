import { ButtonLink } from "@/components/button-link";
import { SiteHeader } from "@/components/site-header";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type PageIntroProps = {
  locale: Locale;
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  actions?: React.ReactNode;
};

export function PageIntro({ locale, number, eyebrow, title, body, actions }: PageIntroProps) {
  const t = dictionary[locale];

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-frame px-4 pb-16 pt-6 md:px-8 md:pt-8">
        <div className="flex min-w-0 flex-col gap-10">
          <SiteHeader locale={locale} />
          <div className="relative min-w-0 overflow-hidden border-2 border-border p-6 sm:p-8 md:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-2 font-display text-[4.5rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted sm:text-[6rem] md:text-[8rem] lg:text-[12rem]"
            >
              {number}
            </span>
            <div className="relative z-10 min-w-0 max-w-5xl space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{eyebrow}</span>
              <h1 className="kinetic-hero font-display font-bold uppercase text-foreground">{title}</h1>
              <p className="max-w-3xl text-lg leading-tight text-muted-foreground md:text-2xl">{body}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                {actions ?? (
                  <>
                    <ButtonLink href={localePath(locale)}>{t.actions.backHome}</ButtonLink>
                    <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                      {t.actions.enquiry}
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
