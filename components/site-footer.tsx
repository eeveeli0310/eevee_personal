import { RollText } from "@/components/roll-text";
import { RouteLink } from "@/components/route-link";
import { SignatureSvg } from "@/components/signature-svg";
import { ContourField } from "@/components/motion/contour-field";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { resumeFileReady, resumeFiles, resumePublicPath, type ResumeId } from "@/lib/resume";

const socials = {
  zh: ["小红书", "抖音", "Instagram", "LinkedIn"],
  en: ["Xiaohongshu", "Douyin", "Instagram", "LinkedIn"],
} as const;

function lockup(line: string, last: boolean) {
  const end = last ? (line.includes(" ") ? "." : "。") : "";
  if (line.includes(" ")) {
    const space = line.indexOf(" ");
    return { sans: line.slice(0, space), serif: `${line.slice(space + 1)}${end}` };
  }
  const cut = line.length >= 3 ? 2 : line.length;
  return { sans: line.slice(0, cut), serif: `${line.slice(cut)}${end}` };
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const home = localePath(locale);
  const pending = locale === "zh" ? "链接尚未写入" : "Link not added yet";
  const pages = [
    { href: home, label: locale === "zh" ? "首页" : "Home", lime: false },
    { href: localePath(locale, "/work"), label: locale === "zh" ? "工作" : "Work", lime: false },
    { href: localePath(locale, "/life"), label: locale === "zh" ? "生活" : "Life", lime: false },
    { href: "mailto:[email]", label: locale === "zh" ? "合作联系" : "Contact", lime: true },
  ];
  const lines = t.contact.lines;
  const resumeLabels: Record<ResumeId, string> = { zh: t.resume.zhFile, en: t.resume.enFile };

  return (
    <section className="foot-stage" aria-label={locale === "zh" ? "页脚" : "Footer"}>
      <div className="foot-glow" data-surface="light">
        <h2 className="follow-title">{locale === "zh" ? "在社交平台关注 Eve" : "Follow Eve on social media"}</h2>
        <div className="follow-row">
          {socials[locale].map((name) => (
            <span key={name} className="roll-hit" title={pending}>
              <RollText>{name}</RollText>
            </span>
          ))}
        </div>
      </div>
      <div className="foot-sheet">
        <div className="panel" id="contact" data-surface="dark">
          <div className="notch" aria-hidden="true" />
          <div className="panel-face">
            <ContourField tone="dark" />
          </div>
          <div className="foot-copy">
            <div className="foot-lock">
              <SignatureSvg className="foot-sig" />
              {lines.map((line, index) => {
                const parts = lockup(line, index === lines.length - 1);
                return (
                  <span className="foot-line" key={line}>
                    <span className="bd">{parts.sans}</span>
                    {parts.serif ? <span className="sf">{parts.serif}</span> : null}
                  </span>
                );
              })}
            </div>
            <nav className="list left" aria-label={locale === "zh" ? "页面" : "Pages"}>
              <small>{locale === "zh" ? "页面" : "Pages"}</small>
              {pages.map((item) =>
                item.lime ? (
                  <a key={item.href} href={item.href} className="lime">
                    <RollText>{item.label}</RollText>
                  </a>
                ) : (
                  <RouteLink key={item.href} href={item.href}>
                    <RollText>{item.label}</RollText>
                  </RouteLink>
                ),
              )}
            </nav>
            <div className="list right" aria-label={locale === "zh" ? "关注" : "Follow on"}>
              <small>{locale === "zh" ? "关注" : "Follow on"}</small>
              {socials[locale].map((name) => (
                <span key={name} className="roll-hit" title={pending}>
                  <RollText>{name}</RollText>
                </span>
              ))}
            </div>
            <img className="foot-hero" src="/img/face.png" alt="" />
            <div className="fine" id="resume">
              <span id="enquiry">
                {t.contact.emailLabel} [email]
              </span>
              <span>
                {(["zh", "en"] as ResumeId[]).map((id) => {
                  const file = resumeFiles[id];
                  const ready = resumeFileReady(file);
                  const label = resumeLabels[id];
                  if (!ready) {
                    return (
                      <span key={id} className="soon" style={{ marginLeft: 12 }}>
                        {label} · {t.resume.comingSoon}
                      </span>
                    );
                  }
                  return (
                    <a key={id} href={resumePublicPath(file)} download={file} style={{ marginLeft: 12 }}>
                      <RollText>{label}</RollText>
                    </a>
                  );
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="partner-row" aria-label={locale === "zh" ? "合作品牌" : "Partners"}>
        <span>Partner · Pimax</span>
        <span>GQ China</span>
        <span>UNSW</span>
        <span>CS2 IEM</span>
      </div>
      {/* TODO: Eve must confirm a public address before replacing the [email] placeholder. */}
      <div className="foot-bar">
        <span>© 2026 EEVEE LI</span>
      </div>
    </section>
  );
}
