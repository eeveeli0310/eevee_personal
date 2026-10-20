import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { projects } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

const project = projects[0];

export const metadata = pageMeta({
  title: "Project Experience",
  description:
    "Eevee Li's published project page currently covers the Pimax Micro-OLED launch event video, made as content creator and designer.",
  path: "/project-experience",
});

export default function ProjectExperiencePage() {
  return (
    <main id="main-content">
      <PageIntro
        number="02"
        eyebrow="Project Experience"
        title="Project experience framed through strategy, image, and execution"
        body="Published project work currently includes the Pimax Micro-OLED launch event video, made as content creator and designer. Notes on other collaborations will be added when they are ready to share."
        actions={
          <>
            <ButtonLink href={`/projects/${project.slug}`}>View the Pimax film</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              Cooperation
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
