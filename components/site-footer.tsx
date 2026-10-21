import Link from "next/link";
import { SignatureSvg } from "@/components/signature-svg";
import { ContourField } from "@/components/motion/contour-field";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { resumeFileReady, resumeFiles, resumePublicPath, type ResumeId } from "@/lib/resume";

const socials = {
  zh: ["小红书", "抖音", "Instagram", "LinkedIn"],
  en: ["Xiaohongshu", "Douyin", "Instagram", "LinkedIn"],
} as const;

const brands = {
  zh: ["合作品牌 · PIMAX", "合作品牌", "合作品牌", "合作品牌", "合作品牌", "合作品牌"],
  en: ["Partner · Pimax", "Partner", "Partner", "Partner", "Partner", "Partner"],
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const home = localePath(locale);
  const pages = [
    { href: localePath(locale, "/work"), label: t.nav.work },
    { href: `${home}#about`, label: t.nav.about },
    { href: `${home}#resume`, label: t.nav.resume },
    { href: `${home}#contact`, label: t.nav.contact },
  ];
  const lines = t.contact.lines;
  const resumeLabels: Record<ResumeId, string> = { zh: t.resume.zhFile, en: t.resume.enFile };
  const loop = [...brands[locale], ...brands[locale]];

  return (
    <section className="screen screen-foot" data-surface="dark" id="contact">
      <div className="panel">
        <ContourField tone="dark" />
        <a className="biz" href="#enquiry">
          {t.actions.enquiry} ↗
        </a>
        <div className="end" data-reveal="lines">
          <SignatureSvg className="lock" />
          {lines.map((line) => {
            const splitAt = line.includes(" ") ? line.indexOf(" ") : Math.ceil(line.length / 2);
            const lead = line.slice(0, splitAt).trim();
            const rest = line.slice(splitAt).trim() || line;
            const serif = line.includes(" ") ? lead : line.slice(0, 2);
            const bold = line.includes(" ") ? rest : line.slice(2);
            return (
              <span className="row" key={line}>
                <span className="line">
                  <span data-line-inner>
                    <span className="sf">{serif} </span>
                    <span className="bd">{bold}</span>
                  </span>
                </span>
              </span>
            );
          })}
        </div>
        <img className="foot-ph" src="/img/face.png" alt="" />
        <div className="list" style={{ left: 36 }}>
          <small>{locale === "zh" ? "页面" : "Pages"}</small>
          {pages.map((item) => (
            <Link key={item.href} href={item.href} style={{ display: "block" }}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="list" style={{ right: 36, textAlign: "right" }}>
          <small>{locale === "zh" ? "关注" : "Follow on"}</small>
          {socials[locale].map((name) => (
            <span key={name} style={{ display: "block" }} title={locale === "zh" ? "链接尚未写入" : "Link not added yet"}>
              {name}
            </span>
          ))}
        </div>
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
                  {label}
                </a>
              );
            })}
            <span style={{ marginLeft: 16 }}>© 2026 Eevee Li</span>
          </span>
        </div>
        <div className="logos" aria-label={locale === "zh" ? "合作品牌" : "Partner brands"}>
          <div className="logos-track">
            {loop.map((brand, index) => (
              <span key={`${brand}-${index}`}>{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
