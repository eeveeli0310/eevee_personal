# eevee_personal

Personal site for Eevee Li. Next.js App Router, Tailwind, deployed on Vercel.

## Languages

- Default language is English at `/en`. `/` redirects there.
- Chinese stays at `/zh`, from the language toggle.
- Copy lives in `lib/i18n.ts`. There is no external translation service.
- Display type is self-hosted: Instrument Serif, Archivo (condensed), Permanent Marker, and a subset of Noto Sans / Noto Serif SC. Do not add Google Fonts or other requests that are blocked in mainland China.
- Home colours live as CSS variables in `app/globals.css` (`--olive`, `--off`, `--lime`, `--grey`) so the palette can be swapped without hunting through components.
- Portrait and photo-wall images under `public/img` are designer placeholders. Photo captions live in `lib/gallery.ts`. Stats in `lib/content.ts` stay as `[X]` until a real number is set.
- The Micro-OLED film plays only from `public/media/pimax-micro-oled.mp4`. There is no YouTube embed. Until that file exists, the case shows a poster.

## Resume PDFs

The resume block links to:

- `/resume/eevee-li-resume-zh.pdf`
- `/resume/eevee-li-resume-en.pdf`

Add the real files at:

- `public/resume/eevee-li-resume-zh.pdf`
- `public/resume/eevee-li-resume-en.pdf`

Until a file is present, the page labels that download as coming soon and does not link to a 404. Opening the URL directly shows a short coming-soon page instead.
