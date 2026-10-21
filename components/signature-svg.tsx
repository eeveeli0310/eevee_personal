import { SIGNATURE_DRAW, signaturePath, signatureViewBox } from "@/lib/signature";

export function SignatureSvg({ className, draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg className={className} viewBox={signatureViewBox} fill="none" aria-hidden="true" overflow="visible">
      <path
        className="sig-path"
        data-signature={draw ? "draw" : undefined}
        d={signaturePath}
        strokeDasharray={draw ? SIGNATURE_DRAW : undefined}
        strokeDashoffset={draw ? SIGNATURE_DRAW : 0}
      />
    </svg>
  );
}
