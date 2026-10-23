import type { ReactNode } from "react";
import Link from "next/link";
import { ContourField } from "@/components/motion/contour-field";
import { HeroSigMotion } from "@/components/motion/hero-sig-motion";
import { LiquidReveal } from "@/components/motion/liquid-reveal";
import { StatsBand } from "@/components/motion/stats-band";
import { WallScroll } from "@/components/motion/wall-scroll";
import { LogoEl26 } from "@/components/logo-el26";
import { SignatureSvg } from "@/components/signature-svg";
import { SiteFooter } from "@/components/site-footer";
import { homeCopy } from "@/lib/content";
import { wallScenes, type WallCard } from "@/lib/gallery";
import { dictionary, localePath, type Locale } from "@/lib/i18n";
import { SIGNATURE_STROKE_HOME } from "@/lib/signature-stroke";

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

function WallCards({ cards, label, locale }: { cards: WallCard[]; label: string; locale: Locale }) {
  return cards.map((card, index) => {
    if (card.type === "story") {
      return (
        <article className="story-card" key={`story-${index}`} style={{ left: card.x, top: card.y, width: card.w }}>
          <small>{card.title[locale]}</small>
          <p>{card.body[locale]}</p>
        </article>
      );
    }
    return (
      <div key={`photo-${index}`}>
        <div className="cap" style={{ left: card.x, top: `calc(${card.y} - 18px)` }}>
          {card.caption[locale]}
        </div>
        <div
          className={card.src ? "ph has-photo" : "ph"}
          data-label={label}
          style={{
            left: card.x,
            top: card.y,
            width: card.w,
            height: card.h,
            backgroundImage: card.src ? `url(${card.src})` : undefined,
          }}
        />
      </div>
    );
  });
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const copy = homeCopy[locale];
  const accents = locale === "zh" ? ["创作者", "内容", "品牌", "运营"] : ["creator", "content", "brand", "operator"];
  const motto = `${t.mottoLead.toUpperCase()} · `;
  const mottoZh = `${t.mottoSub} · `;

  return (
    <main id="main-content">
      <HeroSigMotion />
      <div className="olive-flow">
      <div className="hero-pin-track" data-pin-track data-hero-sig data-signature-scroll>
        <div className="hero-sig-pin">
          <div className="screen screen-hero-sig" data-hero-field data-surface="light">
            <ContourField tone="dark" anchor="page" seamWith="#about" />
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
            <div className="hero-plate" data-hero-plate data-surface="light">
              <ContourField tone="light" />
              <div className="hero-card" data-hero-card>
                <img className="hero-card-gray" src="/img/face.png" alt="" />
                <div className="hero-card-color" data-hero-color>
                  <LiquidReveal baseSrc="/img/face.png" revealSrc="/img/vr.png" alt={copy.portraitAltClear} />
                </div>
              </div>
            </div>
            <div className="sig-kicker" data-sig-kicker>
              <LogoEl26 className="sig-kicker-mark" />
              <div className="sig-label">MESSAGE FROM EEVEE</div>
            </div>
            <SignatureSvg mode="scroll" className="sig-draw" strokeWidth={SIGNATURE_STROKE_HOME} />
            <div className="hero-chrome" data-hero-meta>
              <div className="hero-meta left">{locale === "zh" ? "占位人像 · AI 生成" : "AI placeholder portrait"}</div>
              <div className="hero-meta right">Scroll ↓</div>
              <div className="scroll-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="screen screen-intro screen-grow" data-surface="dark">
        <ContourField tone="dark" anchor="page" />
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
      </div>

      <section className="screen screen-wall" data-surface="dark" data-wall aria-label={locale === "zh" ? "照片" : "Photos"}>
        <WallScroll />
        <ContourField tone="progress" anchor="page" />
        <div className="wall-viewport" data-wall-viewport>
          <div className="wall-track" data-wall-track>
            {wallScenes.map((scene, index) => (
              <div className="wall-scene" key={index}>
                {scene.quote ? (
                  <div className="quote">
                    <span className="sf">Life is a </span>
                    <span className="rest">performance art</span>
                    <SignatureSvg className="mini-sig" />
                  </div>
                ) : null}
                <WallCards cards={scene.cards} label={locale === "zh" ? "占位" : "Placeholder"} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="screen screen-split" data-surface="light">
        <ContourField tone="pale" />
        <img className="side left" src="/img/vr.png" alt="" />
        <img className="side right" src="/img/face.png" alt="" />
        <div className="tt" style={{ left: "25vw" }}>
          <span className="sf">my</span>
          <span className="bd">Work</span>
          <p>{copy.workBody}</p>
          <Link className="arrow" href={localePath(locale, "/work")} aria-label={t.nav.work}>
            ←
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
      </section>

      <section className="screen-stats" data-surface="dark" aria-label={locale === "zh" ? "数据" : "Stats"}>
        <StatsBand items={copy.stats.map((item) => ({ text: item.text, label: item.label, value: item.value }))} />
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
