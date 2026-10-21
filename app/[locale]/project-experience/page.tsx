import { ButtonLink } from "@/components/button-link";
import { PageIntro } from "@/components/page-intro";
import { dictionary, localePath, staticLocaleParams } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { getProjects } from "@/lib/projects";
import { pageMeta, site } from "@/lib/site";

export function generateStaticParams() {
  return staticLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  return pageMeta({
    title: t.projectsPage.metaTitle,
    description: t.projectsPage.metaDescription,
    path: "/project-experience",
    locale,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function ProjectExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  const project = getProjects(locale)[0];

  return (
    <main id="main-content">
      <PageIntro
        locale={locale}
        number="02"
        eyebrow={t.projectsPage.eyebrow}
        title={t.projectsPage.title}
        body={t.projectsPage.body}
        actions={
          <>
            <ButtonLink href={localePath(locale, `/projects/${project.slug}`)}>{t.actions.viewPimax}</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              {t.actions.enquiry}
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
