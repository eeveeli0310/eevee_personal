import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EL26Loader } from "@/components/el26-loader";
import { RevealEngine } from "@/components/motion/reveal-engine";
import { SignatureMotion } from "@/components/motion/signature-motion";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { homeCopy } from "@/lib/content";
import { dictionary, isLocale, staticLocaleParams } from "@/lib/i18n";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticLocaleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dictionary[locale];

  return {
    title: {
      default: t.meta.title,
      template: "%s · Eevee Li",
    },
    description: t.meta.description,
    openGraph: {
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <SmoothScroll>
        <SiteHeader locale={locale} />
        {children}
      </SmoothScroll>
      <EL26Loader label={homeCopy[locale].loaderLabel} />
      <RevealEngine />
      <SignatureMotion />
    </>
  );
}
