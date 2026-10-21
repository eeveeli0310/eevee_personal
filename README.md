# eevee_personal

Personal site for Eevee Li. Next.js App Router, Tailwind, deployed on Vercel.

## Languages

- Default language is Chinese at `/zh`. `/` redirects there.
- English is at `/en`.
- Copy lives in `lib/i18n.ts`. There is no external translation service.
- Fonts are system fonts only. Do not add Google Fonts or other requests that are blocked in mainland China.

## Resume PDFs

The resume block links to:

- `/resume/eevee-li-resume-zh.pdf`
- `/resume/eevee-li-resume-en.pdf`

Add the real files at:

- `public/resume/eevee-li-resume-zh.pdf`
- `public/resume/eevee-li-resume-en.pdf`

Until a file is present, the page labels that download as coming soon and does not link to a 404. Opening the URL directly shows a short coming-soon page instead.
