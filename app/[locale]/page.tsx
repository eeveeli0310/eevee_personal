import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ContactBand } from "@/components/contact-band";
import { MarqueeBand } from "@/components/marquee-band";
import { ResumePanel } from "@/components/resume-panel";
import { SiteHeader } from "@/components/site-header";
import { dictionary } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { getProjects } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  return pageMeta({
    title: t.meta.title,
    description: t.meta.description,
    path: "/",
    locale,
    absolute: true,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  const project = getProjects(locale)[0];

  return (
    <main id="main-content">
      <section className="border-b border-border">
        <div className="mx-auto max-w-frame px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
          <div className="flex min-w-0 flex-col gap-10">
            <SiteHeader locale={locale} />
            <div className="relative min-w-0">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-2 hidden font-display text-[6rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted md:text-[8rem] lg:block lg:text-[12rem]"
              >
                00
              </span>
              <h1 className="kinetic-hero relative z-10 min-w-0 font-display font-bold uppercase text-foreground">
                <span className="block" lang="en">
                  {t.mottoLead}
                </span>
                <span className="block" lang="zh-CN">
                  {t.mottoSub}
                </span>
              </h1>
            </div>
            <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-end">
              <div className="min-w-0 space-y-6">
                <p className="max-w-3xl text-xl leading-tight text-foreground md:text-2xl">{t.heroLead}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <ButtonLink href="#resume">{t.actions.resume}</ButtonLink>
                  <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                    {t.actions.enquiry}
                  </ButtonLink>
                </div>
              </div>
              <div className="grid min-w-0 gap-px bg-border">
                <div className="media-frame media-ratio-portrait border-0">
                  <Image
                    src="/eevee-li.jpg"
                    alt={locale === "zh" ? "Eevee Li 在海边的肖像" : "Portrait of Eevee Li standing by the sea"}
                    fill
                    priority
                    quality={82}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="grid gap-px bg-border md:grid-cols-[1fr_1fr]">
                  <div className="min-w-0 bg-background p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.locationLabel}</div>
                    <div className="mt-3 break-words text-lg font-medium text-foreground md:text-xl">{t.locationValue}</div>
                  </div>
                  <div className="min-w-0 bg-background p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.practiceLabel}</div>
                    <div className="mt-3 break-words text-lg font-medium text-foreground md:text-xl">{t.practiceValue}</div>
                    <p className="mt-2 text-sm leading-snug text-muted-foreground">{t.practiceNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand items={t.marquee} speed={80} variant="fast" ariaLabel={t.marqueeLabel} />

      <section id="work" className="scroll-mt-6 border-t border-border py-20 md:py-32">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="min-w-0 space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{t.work.eyebrow}</span>
                <h2 className="kinetic-section font-display font-bold uppercase text-foreground">{t.work.title}</h2>
              </div>
              <p className="max-w-xl text-lg leading-tight text-muted-foreground md:text-xl">{t.work.body}</p>
            </div>
            <a
              className="group relative flex min-h-[28rem] min-w-0 flex-col justify-between overflow-hidden border-2 border-border bg-background p-6 transition-colors duration-300 hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
              href={`/${locale}/projects/${project.slug}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3 font-display text-[6rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted transition-colors duration-300 group-hover:text-accent-foreground/20 md:text-[8rem] lg:text-[12rem]"
              >
                {project.number}
              </span>
              <div className="relative z-10 flex items-start justify-between gap-6">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground/70">
                  {project.year}
                </span>
                <span className="max-w-[12rem] text-right text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground/70">
                  {project.role}
                </span>
              </div>
              <div className="relative z-10 min-w-0 space-y-6">
                <h3 className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-[0.9] tracking-[-0.05em] text-foreground transition-colors duration-300 group-hover:text-accent-foreground sm:text-5xl lg:text-6xl">
                  {project.title}
                </h3>
                <p className="max-w-2xl text-lg leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground/80 md:text-xl">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-3 py-2 text-xs uppercase tracking-[0.22em] text-foreground transition-colors duration-300 group-hover:border-accent-foreground/40 group-hover:text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-6 border-t border-border py-20 md:py-32">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <div className="relative min-w-0 overflow-hidden border-2 border-border p-6 sm:p-8 md:p-12">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{t.about.eyebrow}</span>
              <h2 className="kinetic-section relative z-10 mt-4 font-display font-bold uppercase text-foreground">{t.about.title}</h2>
              <div className="relative z-10 mt-8 space-y-6">
                <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">{t.about.body}</p>
                <ul className="flex flex-wrap gap-2" aria-label={locale === "zh" ? "方向标签" : "Focus tags"}>
                  {t.about.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2.5 py-1 text-xs tracking-[0.08em] text-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid min-w-0 content-start gap-8">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="min-w-0 border-l-4 border-accent pl-4">
                  <div className="break-words font-display text-[clamp(1.75rem,6vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.06em] text-foreground">
                    {fact.value}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground md:text-sm">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ResumePanel locale={locale} />
      <ContactBand locale={locale} />
    </main>
  );
}
