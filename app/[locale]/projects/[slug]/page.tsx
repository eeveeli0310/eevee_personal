import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { ContactBand } from "@/components/contact-band";
import { MarqueeBand } from "@/components/marquee-band";
import { ProjectHero } from "@/components/project-hero";
import { SiteHeader } from "@/components/site-header";
import { dictionary, isLocale, localePath, locales } from "@/lib/i18n";
import { getProject, projectSlugs } from "@/lib/projects";
import { pageMeta } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return { title: "Page not found" };
  const project = getProject(locale, slug);
  const t = dictionary[locale];
  if (!project) return { title: t.notFound.metaTitle };

  return pageMeta({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    locale,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();
  const t = dictionary[locale];
  const copy = t.project;

  return (
    <main id="main-content" className="overflow-x-clip">
      <div className="border-b border-border px-4 py-5 md:px-8">
        <div className="mx-auto min-w-0 max-w-frame">
          <SiteHeader locale={locale} className="border-b-0 pb-0" />
        </div>
      </div>
      <ProjectHero project={project} labels={copy.metaLabels} />
      <MarqueeBand items={project.marquee} speed={42} variant="slow" ariaLabel={copy.marqueeLabel} />
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto min-w-0 max-w-frame px-4 md:px-8">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="min-w-0 space-y-5">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{copy.gallery.eyebrow}</span>
              <h2 className="kinetic-section font-display font-bold uppercase text-foreground">{copy.gallery.title}</h2>
            </div>
            <p className="max-w-xl text-lg leading-tight text-muted-foreground md:text-xl">{copy.gallery.body}</p>
          </div>
          <div className="mt-12 grid min-w-0 gap-8">
            {project.media.map((item) => (
              <figure key={item.src} className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className={`media-frame media-ratio-${item.ratio} min-w-0`}>
                  {item.type === "embed" ? (
                    <iframe
                      src={item.src}
                      title={item.alt}
                      className="absolute inset-0 h-full w-full max-w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <figcaption className="flex min-w-0 border-l-4 border-accent pl-4 text-base leading-tight text-muted-foreground md:text-lg">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto min-w-0 max-w-frame px-4 md:px-8">
          <div className="grid min-w-0 gap-px bg-border lg:grid-cols-3">
            {(
              [
                [copy.columns.challenge, project.challenge],
                [copy.columns.approach, project.approach],
                [copy.columns.outcome, project.outcome],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className="min-w-0 bg-background p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.25em] text-accent">{label}</div>
                <p className="mt-6 text-lg leading-tight text-muted-foreground md:text-xl">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto min-w-0 max-w-frame px-4 md:px-8">
          <div className="grid min-w-0 gap-px bg-border md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 bg-background p-8">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{metric.label}</div>
                <div className="mt-4 break-words font-display text-[clamp(1.75rem,5vw,3.75rem)] font-bold uppercase leading-none tracking-[-0.06em] text-foreground">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactBand
        locale={locale}
        extra={
          <ButtonLink
            href={localePath(locale)}
            variant="secondary"
            className="border-accent-foreground text-accent-foreground hover:border-accent-foreground hover:bg-accent-foreground hover:text-accent"
          >
            {t.actions.backHome}
          </ButtonLink>
        }
      />
    </main>
  );
}
