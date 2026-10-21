import { useId } from "react";
import { LOGO_SKEW, LOGO_VIEWBOX, logo2, logo6, logoE, logoL } from "@/lib/logo-el26";

type LogoEl26Props = {
  className?: string;
  width?: number;
  height?: number;
};

/** Static EL26. Color follows currentColor. Groups are E, L, and 26. */
export function LogoEl26({ className, width, height }: LogoEl26Props) {
  return (
    <svg
      className={className ? `logo-mark ${className}` : "logo-mark"}
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform={LOGO_SKEW}>
        <g data-part="E">
          <polygon points={logoE} />
        </g>
        <g data-part="L">
          <polygon points={logoL} />
        </g>
        <g data-part="26">
          <polygon points={logo2} />
          <path fillRule="evenodd" d={logo6} />
        </g>
      </g>
    </svg>
  );
}

/** Draw-on mark used by the loader. E and L trace, then 26 slides along L. */
export function LogoEl26Draw() {
  const uid = useId().replace(/:/g, "");
  const clipId = `el26clip${uid}`;
  const glintId = `el26glint${uid}`;

  return (
    <svg className="loader-mark" viewBox={LOGO_VIEWBOX} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <g transform={LOGO_SKEW}>
            <polygon points={logoE} />
            <polygon points={logoL} />
            <polygon points={logo2} />
            <path d={logo6} />
          </g>
        </clipPath>
        <linearGradient id={glintId} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={LOGO_SKEW}>
        <g id="E">
          <polygon className="stroke" pathLength={1} points={logoE} />
        </g>
        <g id="L">
          <polygon className="stroke" pathLength={1} points={logoL} />
        </g>
        <g id="g26">
          <polygon points={logo2} />
          <path fillRule="evenodd" d={logo6} />
        </g>
      </g>
      <g clipPath={`url(#${clipId})`}>
        <rect className="glint" x="0" y="0" width="60" height="160" fill={`url(#${glintId})`} transform="skewX(-14)" />
      </g>
    </svg>
  );
}
