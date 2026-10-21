import { SiteFooter } from "@/components/site-footer";
import { lifeCopy } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const copy = lifeCopy[locale];
  return pageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/life",
    locale,
    shareAlt: dictionary[locale].meta.shareAlt,
  });
}

export default async function LifePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const copy = lifeCopy[locale];

  return (
    <>
      <main id="main-content" className="sub" data-surface="light">
        <p className="sub-kicker">{copy.eyebrow}</p>
        <h1 className="bd">{copy.title}</h1>
        <p className="lede">{copy.body}</p>
        <div className="life-grid">
          {copy.sections.map((section) => (
            <article className="life-card" key={section.id} id={section.id}>
              <img src={section.image} alt="" />
              <div>
                <h2 className="bd">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
