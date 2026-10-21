import { PageIntro } from "@/components/page-intro";
import { dictionary, staticLocaleParams } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export function generateStaticParams() {
  return staticLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  return pageMeta({
    title: t.learning.metaTitle,
    description: t.learning.metaDescription,
    path: "/learning-experience",
    locale,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function LearningExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];

  return (
    <main id="main-content">
      <PageIntro locale={locale} number="01" eyebrow={t.learning.eyebrow} title={t.learning.title} body={t.learning.body} />
    </main>
  );
}
