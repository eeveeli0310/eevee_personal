import { useId } from "react";
import { signatureLetters, signatureSlash, signatureViewBox } from "@/lib/signature";
import {
  SIGNATURE_LETTER_DRAW,
  SIGNATURE_LETTER_STROKE,
  SIGNATURE_SLASH_DRAW,
  SIGNATURE_SLASH_STROKE,
  signatureLetterStroke,
  signatureSlashStroke,
} from "@/lib/signature-draw";

export function SignatureSvg({ className, draw = false }: { className?: string; draw?: boolean }) {
  const maskId = `sig${useId().replace(/:/g, "")}`;
  const fills = (
    <>
      <path className="sig-fill" fill="currentColor" fillRule="evenodd" d={signatureLetters} />
      <path className="sig-fill" fill="currentColor" fillRule="evenodd" d={signatureSlash} />
    </>
  );

  return (
    <svg className={className} viewBox={signatureViewBox} fill="none" aria-hidden="true" overflow="visible">
      {draw ? (
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1560" height="1541">
            <rect width="1560" height="1541" fill="black" />
            <path
              className="sig-mask-stroke"
              data-signature="letters"
              d={signatureLetterStroke}
              fill="none"
              stroke="#fff"
              strokeWidth={SIGNATURE_LETTER_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={SIGNATURE_LETTER_DRAW}
              strokeDashoffset={SIGNATURE_LETTER_DRAW}
            />
            <path
              className="sig-mask-stroke"
              data-signature="slash"
              d={signatureSlashStroke}
              fill="none"
              stroke="#fff"
              strokeWidth={SIGNATURE_SLASH_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={SIGNATURE_SLASH_DRAW}
              strokeDashoffset={SIGNATURE_SLASH_DRAW}
            />
          </mask>
          <g mask={`url(#${maskId})`}>{fills}</g>
        </>
      ) : (
        fills
      )}
    </svg>
  );
}
