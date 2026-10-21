import { HomePage } from "@/components/home-page";
import { dictionary } from "@/lib/i18n";
import { readLocale } from "@/lib/locale";
import { pageMeta } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  const t = dictionary[locale];
  return pageMeta({
    title: t.meta.title,
    description: t.meta.description,
    path: "/",
    locale,
    absolute: true,
    shareAlt: t.meta.shareAlt,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await readLocale(params);
  return <HomePage locale={locale} />;
}
