import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { MarqueeBand } from "@/components/marquee-band";
import { ProjectHero } from "@/components/project-hero";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Page not found" };
  }

  return pageMeta({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main-content">
      <div className="border-b border-border px-4 py-5 md:px-8">
        <div className="mx-auto max-w-frame">
          <SiteHeader className="border-b-0 pb-0" />
        </div>
      </div>
      <ProjectHero project={project} />
      <MarqueeBand items={project.marquee} speed={42} variant="slow" ariaLabel="Scrolling project details" />
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">Gallery Flow</span>
              <h2 className="kinetic-section font-display font-bold uppercase text-foreground">
                Performance, product, and atmosphere held in one visual sequence
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-tight text-muted-foreground md:text-xl">
              The page opens with the hero asset, then moves through a tighter editorial rhythm to frame intention,
              method, and visual outcome.
            </p>
          </div>
          <div className="mt-12 grid gap-8">
            {project.media.map((item) => (
              <figure key={item.src} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className={`media-frame media-ratio-${item.ratio}`}>
                  {item.type === "embed" ? (
                    <iframe
                      src={item.src}
                      title={item.alt}
                      className="absolute inset-0 h-full w-full"
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
                <figcaption className="flex border-l-4 border-accent pl-4 text-base leading-tight text-muted-foreground md:text-lg">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid gap-px bg-border lg:grid-cols-3">
            {(
              [
                ["Challenge", project.challenge],
                ["Approach", project.approach],
                ["Outcome", project.outcome],
              ] as const
            ).map(([label, copy]) => (
              <div key={label} className="bg-background p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.25em] text-accent">{label}</div>
                <p className="mt-6 text-lg leading-tight text-muted-foreground md:text-xl">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border py-20 md:py-28">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid gap-px bg-border md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-background p-8">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{metric.label}</div>
                <div className="mt-4 font-display text-[clamp(1.75rem,5vw,3.75rem)] font-bold uppercase leading-none tracking-[-0.06em] text-foreground">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-accent py-20 md:py-24">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-foreground md:text-sm">Contact</span>
              <h2 className="kinetic-section font-display font-bold uppercase text-accent-foreground">
                If the next launch needs stronger presence, let&apos;s build it.
              </h2>
              <div className="max-w-2xl space-y-2 text-lg leading-tight text-accent-foreground/80 md:text-xl">
                <p>Email: {site.email}</p>
                <p>WeChat: {site.wechat}</p>
                <p>Phone: {site.phone}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink
                href="/"
                variant="secondary"
                className="border-accent-foreground text-accent-foreground hover:border-accent-foreground hover:bg-accent-foreground hover:text-accent"
              >
                Back home
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`}>Start a new collaboration</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
