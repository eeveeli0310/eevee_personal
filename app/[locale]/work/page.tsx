import { SiteFooter } from "@/components/site-footer";
import { workCopy } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
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
  const featured = copy.featured;
  const role = copy.role;

  return (
    <>
      <main id="main-content" className="work-page" data-surface="light">
        <section className="work-hero" aria-labelledby="work-title">
          <p className="work-kicker">{copy.kicker}</p>
          <h1 id="work-title">
            {copy.headline.before}
            <span className="sf">{copy.headline.accent}</span>
            {copy.headline.after}
          </h1>
          <ul className="work-proof" aria-label={copy.proofLabel}>
            {copy.proof.map((item) => (
              <li key={item.label}>
                <b>{item.value}</b>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="work-featured" id="featured" data-surface="dark" aria-labelledby="feat-title">
          <div className="work-wrap">
            <p className="work-kicker">{featured.kicker}</p>
            <h2 id="feat-title">
              {featured.title.before}
              <span className="sf">{featured.title.accent}</span>
              {featured.title.after}
            </h2>
            <p className="work-role-lead">{featured.role}</p>
            <ul className="work-impact" aria-label={featured.outcomesLabel}>
              {featured.outcomes.map((item) => (
                <li key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="work-role" id="role" aria-labelledby="role-title">
          <div className="work-wrap">
            <header>
              <p className="work-kicker">{role.kicker}</p>
              <h2 id="role-title">
                {role.title.before}
                <span className="sf">{role.title.accent}</span>
              </h2>
              <p className="work-when">{role.dates}</p>
            </header>
            <div className="work-streams">
              {role.streams.map((stream) => (
                <article className="work-stream" id={stream.id} key={stream.id} aria-labelledby={`ws-${stream.id}`}>
                  <p className="work-idx">{stream.index}</p>
                  <div>
                    <h3 id={`ws-${stream.id}`}>{stream.title}</h3>
                    <ul className="work-figures">
                      {stream.figures.map((item) => (
                        <li key={item.label}>
                          <b>{item.value}</b>
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                    {stream.note ? <p className="work-note">{stream.note}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-related" id="related" aria-labelledby="rel-title">
          <div className="work-wrap">
            <h2 id="rel-title">{copy.related.title}</h2>
            <div className="work-stints">
              {copy.related.stints.map((stint) => (
                <article className="work-stint" key={stint.title}>
                  <h3>{stint.title}</h3>
                  <span className="work-org">{stint.org}</span>
                  <p>{stint.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
