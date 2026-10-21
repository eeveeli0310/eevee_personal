import fs from "node:fs";
import path from "node:path";

export const resumeFiles = {
  zh: "eevee-li-resume-zh.pdf",
  en: "eevee-li-resume-en.pdf",
} as const;

export type ResumeId = keyof typeof resumeFiles;

export function resumePublicPath(file: string) {
  return `/resume/${file}`;
}

export function resumeAbsolutePath(file: string) {
  return path.join(process.cwd(), "public", "resume", file);
}

export function resumeFileReady(file: string) {
  try {
    return fs.statSync(resumeAbsolutePath(file)).isFile();
  } catch {
    return false;
  }
}
