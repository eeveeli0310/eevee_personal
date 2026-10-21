import { dictionary, type Locale } from "@/lib/i18n";
import { resumeFileReady, resumeFiles, resumePublicPath, type ResumeId } from "@/lib/resume";

const order: ResumeId[] = ["zh", "en"];

export function ResumePanel({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const labels: Record<ResumeId, string> = {
    zh: t.resume.zhFile,
    en: t.resume.enFile,
  };

  return (
    <section id="resume" className="scroll-mt-6 border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-frame px-4 md:px-8">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="min-w-0 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{t.resume.eyebrow}</span>
            <h2 className="kinetic-section font-display font-bold uppercase text-foreground">{t.resume.title}</h2>
            <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-xl">{t.resume.body}</p>
          </div>
          <div className="grid min-w-0 gap-4">
            {order.map((id) => {
              const file = resumeFiles[id];
              const href = resumePublicPath(file);
              const ready = resumeFileReady(file);
              const label = labels[id];

              if (!ready) {
                return (
                  <div key={id} className="min-w-0 border-2 border-border p-5" aria-disabled="true">
                    <div className="text-sm font-bold uppercase tracking-[0.14em] text-foreground">{label}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.resume.comingSoon}</p>
                    <p className="mt-3 break-all text-xs uppercase tracking-[0.14em] text-muted-foreground">{href}</p>
                  </div>
                );
              }

              return (
                <a
                  key={id}
                  href={href}
                  download={file}
                  className="inline-flex min-h-14 min-w-0 items-center justify-center border-2 border-accent bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[-0.04em] text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
