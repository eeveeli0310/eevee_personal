import { SIGNATURE_STROKE, signatureSig, signatureUnderline, signatureViewBox } from "@/lib/signature-stroke";

/** Stroked signature. `scroll` scrubs with the section; `enter` plays once. */
export function SignatureSvg({
  className,
  mode = "enter",
  strokeWidth = SIGNATURE_STROKE,
}: {
  className?: string;
  mode?: "scroll" | "enter";
  strokeWidth?: number;
}) {
  const classes = className ? `sig-stroke ${className}` : "sig-stroke";
  return (
    <svg className={classes} viewBox={signatureViewBox} fill="none" aria-hidden="true" overflow="visible" data-signature-mode={mode}>
      <path data-signature-path="sig" d={signatureSig} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path data-signature-path="underline" d={signatureUnderline} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
