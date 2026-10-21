import { ButtonLink } from "@/components/button-link";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const onAccent =
  "border-accent-foreground text-accent-foreground hover:border-accent-foreground hover:bg-accent-foreground hover:text-accent";

type ContactBandProps = {
  locale: Locale;
  extra?: React.ReactNode;
};

export function ContactBand({ locale, extra }: ContactBandProps) {
  const t = dictionary[locale];

  return (
    <section id="contact" className="scroll-mt-6 border-t border-border bg-accent py-20 md:py-24">
      <div className="mx-auto max-w-frame px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-foreground md:text-sm">{t.contact.eyebrow}</span>
            <h2 className="kinetic-section !max-w-full font-display font-bold uppercase text-accent-foreground">
              {t.contact.lines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
            <div className="max-w-2xl space-y-2 text-lg leading-tight text-accent-foreground/80 md:text-xl">
              <p>
                {t.contact.emailLabel}:{" "}
                <a className="break-all underline decoration-accent-foreground/40 underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <p>
                {t.contact.wechatLabel}: {site.wechat}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={`${localePath(locale)}#resume`} className={onAccent}>
              {t.actions.resume}
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary" className={onAccent}>
              {t.actions.enquiry}
            </ButtonLink>
            {extra}
          </div>
        </div>
      </div>
    </section>
  );
}
