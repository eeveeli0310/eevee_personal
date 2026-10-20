import { ButtonLink } from "@/components/button-link";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

type PageIntroProps = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  actions?: React.ReactNode;
};

export function PageIntro({ number, eyebrow, title, body, actions }: PageIntroProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-frame px-4 pb-16 pt-6 md:px-8 md:pt-8">
        <div className="flex flex-col gap-10">
          <SiteHeader />
          <div className="relative overflow-hidden border-2 border-border p-6 sm:p-8 md:p-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-2 font-display text-[4.5rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted sm:text-[6rem] md:text-[8rem] lg:text-[12rem]"
            >
              {number}
            </span>
            <div className="relative z-10 max-w-5xl space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{eyebrow}</span>
              <h1 className="kinetic-hero font-display font-bold uppercase text-foreground">{title}</h1>
              <p className="max-w-3xl text-lg leading-tight text-muted-foreground md:text-2xl">{body}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                {actions ?? (
                  <>
                    <ButtonLink href="/">Back home</ButtonLink>
                    <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                      Cooperation
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
