import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { MarqueeBand } from "@/components/marquee-band";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";
import { marqueeItems, pageMeta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: site.title,
  description: site.description,
  path: "/",
  absolute: true,
});

const facts = [
  { value: "Shanghai", label: "Based in" },
  { value: "UNSW Sydney", label: "Education" },
  { value: "Content / Design", label: "Practice" },
];

export default function HomePage() {
  const project = projects[0];

  return (
    <main id="main-content">
      <section className="border-b border-border">
        <div className="mx-auto max-w-frame px-4 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
          <div className="flex flex-col gap-10">
            <SiteHeader />
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-2 hidden font-display text-[6rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted md:text-[8rem] lg:block lg:text-[12rem]"
              >
                00
              </span>
              <h1 className="kinetic-hero relative z-10 font-display font-bold uppercase text-foreground">
                Life is a performance art
              </h1>
            </div>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-end">
              <div className="space-y-6">
                <p className="max-w-3xl text-xl leading-tight text-foreground md:text-2xl">
                  Strategic Market Operations specialist graduated from UNSW Sydney, blending international market
                  expertise with a designer&apos;s eye for emotional resonance.
                </p>
                <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">
                  Proven track record of crafting high-impact visual content that bridges the gap between brand
                  identity and audience sentiment.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <ButtonLink href="#projects">View selected work</ButtonLink>
                  <ButtonLink href={`mailto:${site.email}`} variant="secondary">
                    Start a new collaboration
                  </ButtonLink>
                </div>
              </div>
              <div className="grid gap-px bg-border">
                <div className="media-frame media-ratio-portrait border-0">
                  <Image
                    src="/eevee-li.jpg"
                    alt="Portrait of Eevee Li standing by the sea"
                    fill
                    priority
                    quality={82}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="grid gap-px bg-border md:grid-cols-[1fr_1fr]">
                  <div className="bg-background p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Based In</div>
                    <div className="mt-3 text-lg font-medium text-foreground md:text-xl">{site.location}</div>
                  </div>
                  <div className="bg-background p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Practice</div>
                    <div className="mt-3 text-lg font-medium text-foreground md:text-xl">Content / Design</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBand items={marqueeItems} speed={80} variant="fast" ariaLabel="Scrolling list of practice areas" />

      <section id="projects" className="border-t border-border py-20 md:py-32">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="space-y-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">Featured Projects</span>
                <h2 className="kinetic-section font-display font-bold uppercase text-foreground">
                  Selected work shaped through launch energy, image, and narrative control
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-tight text-muted-foreground md:text-xl">
                Each project is approached as both communication and staging, where message, atmosphere, and audience
                perception are composed together.
              </p>
            </div>
            <a
              className="group relative flex min-h-[28rem] flex-col justify-between overflow-hidden border-2 border-border bg-background p-6 transition-colors duration-300 hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
              href={`/projects/${project.slug}`}
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
              <div className="relative z-10 space-y-6">
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

      <section className="border-t border-border py-20 md:py-32">
        <div className="mx-auto max-w-frame px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <div className="relative overflow-hidden border-2 border-border p-6 sm:p-8 md:p-12">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">About</span>
              <h2 className="kinetic-section relative z-10 mt-4 font-display font-bold uppercase text-foreground">
                Content, image, and perception arranged as a single performance
              </h2>
              <div className="relative z-10 mt-8 space-y-6">
                <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">
                  My practice moves between overseas-market strategy, creator-led storytelling, and visual design, with
                  a focus on campaigns that feel culturally aware and visually charged.
                </p>
                <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">
                  I am interested in pacing, atmosphere, and perception. The ambition is not simply to distribute
                  content, but to compose an experience that lingers.
                </p>
              </div>
            </div>
            <div className="grid content-start gap-8">
              {facts.map((fact) => (
                <div key={fact.label} className="border-l-4 border-accent pl-4">
                  <div className="font-display text-[clamp(1.75rem,6vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.06em] text-foreground">
                    {fact.value}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground md:text-sm">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-accent py-20">
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
            <ButtonLink
              href={`mailto:${site.email}`}
              variant="secondary"
              className="border-accent-foreground text-accent-foreground hover:border-accent-foreground hover:bg-accent-foreground hover:text-accent"
            >
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
