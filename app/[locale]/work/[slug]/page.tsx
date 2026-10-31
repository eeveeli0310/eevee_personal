import Link from "next/link";
import { notFound } from "next/navigation";
import { RollText } from "@/components/roll-text";
import { SiteFooter } from "@/components/site-footer";
import { PimaxCase } from "@/components/pimax-case";
import { caseSlugs, getCase } from "@/lib/cases";
import { caseUi } from "@/lib/content";
import { dictionary, isLocale, localePath, locales } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export function generateStaticParams() {
  const slugs = [...caseSlugs, "pimax-launch"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolved = await params;
  if (!isLocale(resolved.locale)) return {};
  const item = getCase(resolved.locale, resolved.slug);
  if (!item) return {};
  return pageMeta({
    title: item.title,
    description: item.summary,
    path: `/work/${item.slug}`,
    locale: resolved.locale,
    shareAlt: dictionary[resolved.locale].meta.shareAlt,
  });
}

export default async function CasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolved = await params;
  const locale = await readLocale(Promise.resolve({ locale: resolved.locale }));
  const item = getCase(locale, resolved.slug);
  if (!item) notFound();
  if (item.slug === "launch-content") {
    return (
      <>
        <main id="main-content" className="pimax-page" data-surface="light">
          <PimaxCase locale={locale} />
        </main>
        <SiteFooter locale={locale} />
      </>
    );
  }
  const ui = caseUi[locale];
  const blocks = [
    { title: ui.background, body: item.background },
    { title: ui.role, body: `${item.role}. ${item.team}` },
    { title: ui.strategy, body: item.strategy },
    { title: ui.execution, body: item.execution },
    { title: ui.results, body: item.results },
  ];

  return (
    <>
      <main id="main-content" className="sub case-hero" data-surface="light">
        <p className="sub-kicker">
          {item.number} · {item.year}
        </p>
        <h1 className="bd">{item.title}</h1>
        <p className="lede">{item.summary}</p>
        <Link className="back" href={localePath(locale, "/work")}>
          <RollText>← {ui.back}</RollText>
        </Link>
        {item.video ? (
          <figure className="poster">
            <video src={item.video} poster={item.poster ?? undefined} controls playsInline preload="metadata" />
            <figcaption>{ui.posterCaption}</figcaption>
          </figure>
        ) : item.poster ? (
          <figure className="poster">
            <img src={item.poster} alt="" />
            <figcaption>{ui.posterCaption}</figcaption>
          </figure>
        ) : null}
        <div className="blocks">
          {blocks.map((block) => (
            <section className="block" key={block.title}>
              <h2 className="bd">{block.title}</h2>
              <p>{block.body}</p>
              {block.title === ui.results ? (
                <div className="slots" aria-hidden="true">
                  <div className="slot">{ui.dataSlot}</div>
                  <div className="slot">{ui.dataSlot}</div>
                  <div className="slot">{ui.dataSlot}</div>
                </div>
              ) : null}
            </section>
          ))}
          <section className="stake">
            <h2 className="bd">{ui.stakeholders}</h2>
            <p>{item.stakeholders}</p>
          </section>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
