import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { projects } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

const project = projects[0];

export const metadata = pageMeta({
  title: "Portfolio",
  description:
    "Selected work by Eevee Li starts with the Pimax Micro-OLED launch event video. More campaigns and motion pieces will be added here.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <PageIntro
        number="03"
        eyebrow="Portfolio"
        title="A portfolio built for campaigns, launches, and visual resonance"
        body="Selected work starts with the Pimax Micro-OLED launch event video. More campaigns, films, and image-led pieces will be added to this page."
        actions={
          <>
            <ButtonLink href={`/projects/${project.slug}`}>View selected work</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              Cooperation
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
