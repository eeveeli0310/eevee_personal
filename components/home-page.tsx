import type { ReactNode } from "react";
import Link from "next/link";
import { ContourField } from "@/components/motion/contour-field";
import { LiquidReveal } from "@/components/motion/liquid-reveal";
import { SignatureMotion } from "@/components/motion/signature-motion";
import { StackMotion } from "@/components/motion/stack-motion";
import { StatsBand } from "@/components/motion/stats-band";
import { SignatureSvg } from "@/components/signature-svg";
import { SiteFooter } from "@/components/site-footer";
import { homeCopy } from "@/lib/content";
import { wallDesktop, wallMobile, type WallPhoto } from "@/lib/gallery";
import { dictionary, localePath, type Locale } from "@/lib/i18n";

function Bits({ text, accents }: { text: string; accents: string[] }) {
  const pattern = new RegExp(`(${accents.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const nodes: ReactNode[] = [];
  text.split(pattern).forEach((part, index) => {
    part.split(/(\s+)/).forEach((bit, bitIndex) => {
      if (!bit) return;
      const key = `${index}-${bitIndex}`;
      if (/^\s+$/.test(bit)) {
        nodes.push(
          <span className="word-gap" key={key}>
            {" "}
          </span>,
        );
        return;
      }
      nodes.push(
        <span className="word" data-word key={key}>
          <span className={accents.includes(bit) ? "word-inner sf" : "word-inner"} data-word-inner>
            {bit}
          </span>
        </span>,
      );
    });
  });
  return nodes;
}

function Photos({ photos, label, locale, group }: { photos: WallPhoto[]; label: string; locale: Locale; group: string }) {
  return (
    <>
      {photos.map((photo, index) => (
        <div key={`${group}-${index}`} className={group}>
          <div className="cap" style={{ left: photo.x, top: `calc(${photo.y} - 18px)` }}>
            {photo.caption[locale]}
          </div>
          <div
            className={photo.src ? "ph has-photo" : "ph"}
            data-label={label}
            style={{
              left: photo.x,
              top: photo.y,
              width: photo.w,
              height: photo.h,
              backgroundImage: photo.src ? `url(${photo.src})` : undefined,
            }}
          />
        </div>
      ))}
    </>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const copy = homeCopy[locale];
  const accents = locale === "zh" ? ["创作者", "内容", "品牌"] : ["creator", "content", "brand"];
  const motto = `${t.mottoLead.toUpperCase()} · `;
  const mottoZh = `${t.mottoSub} · `;

  return (
    <main id="main-content">
      <StackMotion />
      <SignatureMotion />
      <div className="stack-hero" data-stack="hero">
        <div data-inner className="screen screen-hero" data-surface="light">
          <ContourField tone="light" />
          <LiquidReveal baseSrc="/img/vr.png" revealSrc="/img/face.png" alt={copy.portraitAltVr} />
          <div className="hero-meta left">{locale === "zh" ? "占位人像 · AI 生成" : "AI placeholder portrait"}</div>
          <div className="hero-meta right">Scroll ↓</div>
          <div className="scroll-line" aria-hidden="true" />
        </div>
        <div className="stack-shade" data-shade />
      </div>

      <div className="sig-wrap" data-signature-scroll>
        <div className="stack-sig" data-stack="sig">
          <div data-inner className="screen screen-sig" data-surface="dark">
            <div className="sig-label">MESSAGE FROM EEVEE</div>
            <div className="mq mq1 sf" aria-hidden="true">
              <div className="mq-track">
                <span>{motto.repeat(8)}</span>
                <span>{motto.repeat(8)}</span>
              </div>
            </div>
            <div className="mq mq2 bd" aria-hidden="true">
              <div className="mq-track">
                <span>{mottoZh.repeat(8)}</span>
                <span>{mottoZh.repeat(8)}</span>
              </div>
            </div>
            <div className="sig-card" style={{ backgroundImage: "url(/img/face.jpg)" }} role="img" aria-label={copy.portraitAltClear} />
            <SignatureSvg draw className="sig-draw" />
          </div>
          <div className="stack-shade" data-shade />
        </div>
      </div>

      <section id="about" className="screen screen-intro screen-grow" data-surface="dark" data-stack="intro">
        <p className="position-kicker">{locale === "zh" ? "内容与品牌运营" : "Content & Brand Operator"}</p>
        <h1 className={locale === "en" ? "intro intro-en" : "intro"} data-reveal="words">
          <Bits text={t.about.body} accents={accents} />
        </h1>
        <p className="one-liner">{t.heroLead}</p>
        <div className="tags" aria-label={locale === "zh" ? "方向标签" : "Focus tags"}>
          {t.about.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="screen screen-wall" data-surface="light" aria-label={locale === "zh" ? "照片" : "Photos"}>
        <ContourField tone="light" />
        <div className="quote">
          <span className="sf">Life is a </span>
          <span className="rest">performance art</span>
          <SignatureSvg className="mini-sig" />
        </div>
        <Photos photos={wallDesktop} label={locale === "zh" ? "占位" : "Placeholder"} locale={locale} group="wall-d" />
        <Photos photos={wallMobile} label={locale === "zh" ? "占位" : "Placeholder"} locale={locale} group="wall-m" />
      </section>

      <section className="screen screen-split" data-surface="light">
        <ContourField tone="light" />
        <img className="side left" src="/img/vr.png" alt="" />
        <img className="side right" src="/img/face.png" alt="" />
        <div className="mark" aria-hidden="true">ON</div>
        <div className="tt" style={{ left: "25vw" }}>
          <span className="sf">my</span>
          <span className="bd">Work</span>
          <p>{copy.workBody}</p>
          <Link className="arrow" href={localePath(locale, "/work")} aria-label={t.nav.work}>
            →
          </Link>
        </div>
        <div className="tt" style={{ right: "25vw" }}>
          <span className="sf">my</span>
          <span className="bd">Life</span>
          <p>{copy.lifeBody}</p>
          <Link className="arrow" href={localePath(locale, "/life")} aria-label={copy.life}>
            →
          </Link>
        </div>
        <StatsBand items={copy.stats.map((item) => ({ text: item.text, label: item.label, value: item.value }))} />
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
