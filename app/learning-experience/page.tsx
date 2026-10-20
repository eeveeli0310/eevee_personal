import { PageIntro } from "@/components/page-intro";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Learning Experience",
  description:
    "Eevee Li graduated from UNSW Sydney. A longer account of that academic path will be added when it is ready.",
  path: "/learning-experience",
});

export default function LearningExperiencePage() {
  return (
    <main id="main-content">
      <PageIntro
        number="01"
        eyebrow="Learning Experience"
        title="Learning shaped by global context and creative discipline"
        body="Eevee Li graduated from UNSW Sydney. That study sits behind the current practice: overseas-market strategy, creator-led storytelling, and visual design. A longer account of the academic path will be added here."
      />
    </main>
  );
}
