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
    title: t.portfolio.metaTitle,
    description: t.portfolio.metaDescription,
    path: "/portfolio",
    locale,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  const project = getProjects(locale)[0];

  return (
    <main id="main-content">
      <PageIntro
        locale={locale}
        number="03"
        eyebrow={t.portfolio.eyebrow}
        title={t.portfolio.title}
        body={t.portfolio.body}
        actions={
          <>
            <ButtonLink href={localePath(locale, `/projects/${project.slug}`)}>{t.actions.viewWork}</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              {t.actions.enquiry}
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
