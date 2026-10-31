import Link from "next/link";
import { ExperienceRail } from "@/components/experience-rail";
import { RollText } from "@/components/roll-text";
import { SiteFooter } from "@/components/site-footer";
import { getCases } from "@/lib/cases";
import { workCopy } from "@/lib/content";
import { dictionary, localePath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const copy = workCopy[locale];
  return pageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/work",
    locale,
    shareAlt: dictionary[locale].meta.shareAlt,
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const copy = workCopy[locale];
  const cases = getCases(locale);
  const rail = copy.timeline.map((item) => ({
    year: item.year,
    animateYear: item.animateYear,
    title: item.title,
    body: item.body,
    href: item.href ? localePath(locale, item.href) : null,
  }));

  return (
    <>
      <main id="main-content" className="sub" data-surface="light">
        <p className="sub-kicker">{copy.eyebrow}</p>
        <h1 className="bd">{copy.title}</h1>
        <p className="lede">{copy.body}</p>
        <div className="case-list">
          {cases.map((item) => (
            <Link key={item.slug} className="case-row" href={localePath(locale, `/work/${item.slug}`)}>
              <span className="case-num">{item.number}</span>
              <span>
                <span className="bd" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
                  <RollText>{item.title}</RollText>
                </span>
                <p>
                  {item.year} · {item.role}
                </p>
                <p>{item.summary}</p>
              </span>
              <span className="bd case-go" aria-hidden="true">
                <RollText>→</RollText>
              </span>
            </Link>
          ))}
        </div>
        <ExperienceRail items={rail} label={copy.timelineLabel} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
