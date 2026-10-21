import { NextResponse } from "next/server";
import fs from "node:fs";
import { resumeAbsolutePath, resumeFiles } from "@/lib/resume";

const allowed = new Set<string>(Object.values(resumeFiles));

function comingSoonPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>简历即将上线 · Resume coming soon · Eevee Li</title>
</head>
<body style="margin:0;min-height:100vh;background:#09090b;color:#fafafa;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
  <main style="max-width:40rem;margin:0 auto;padding:4rem 1.25rem;">
    <p style="margin:0;letter-spacing:0.2em;text-transform:uppercase;color:#dfe104;font-size:0.75rem;">Eevee Li</p>
    <h1 style="margin:1.5rem 0 0;font-size:clamp(2rem,8vw,3.5rem);line-height:0.95;letter-spacing:-0.04em;">简历即将上线</h1>
    <p style="max-width:36rem;font-size:1.125rem;line-height:1.45;color:#a1a1aa;">这个 PDF 还没有放上来。站点上的下载会标成「即将上线」，而不是跳进一个空白的 404。</p>
    <h2 style="margin-top:2.5rem;font-size:clamp(1.5rem,5vw,2.25rem);line-height:1;letter-spacing:-0.04em;">Resume coming soon</h2>
    <p style="max-width:36rem;font-size:1.125rem;line-height:1.45;color:#a1a1aa;">This PDF is not on the site yet. The download is marked coming soon instead of sending you to a dead 404.</p>
    <p style="margin-top:2rem;font-size:0.875rem;letter-spacing:0.08em;text-transform:uppercase;">
      <a href="/zh" style="color:#dfe104;">返回首页</a>
      <span style="color:#3f3f46;"> / </span>
      <a href="/en" style="color:#dfe104;">Back home</a>
    </p>
  </main>
</body>
</html>`;
}

export async function GET(_request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  if (!allowed.has(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = resumeAbsolutePath(filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new NextResponse(comingSoonPage(), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
