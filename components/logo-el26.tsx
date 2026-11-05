import { useId } from "react";
import { LOGO_VIEWBOX, logo2, logo6, logoE, logoL } from "@/lib/logo-el26";

type LogoEl26Props = {
  className?: string;
  width?: number;
  height?: number;
};

/** Static EL26 from public/logo/el26.svg. Color follows currentColor. Groups are E, L, and 26. */
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
      <g data-part="E">
        <path d={logoE} />
      </g>
      <g data-part="L">
        <path d={logoL} />
      </g>
      <g data-part="26">
        <path d={logo2} />
        <path d={logo6} />
      </g>
    </svg>
  );
}

/** Draw-on mark used by the loader. Matches logo/loader/index.html. */
export function LogoEl26Draw() {
  const uid = useId().replace(/:/g, "");
  const clipId = `el26clip${uid}`;
  const glintId = `el26glint${uid}`;

  return (
    <svg className="loader-mark" viewBox={LOGO_VIEWBOX} fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={logoE} />
          <path d={logoL} />
          <path d={logo2} />
          <path d={logo6} />
        </clipPath>
        <linearGradient id={glintId} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g id="E">
        <path className="stroke" pathLength={1} d={logoE} />
      </g>
      <g id="L">
        <path className="stroke" pathLength={1} d={logoL} />
      </g>
      <g id="g26">
        <path d={logo2} />
        <path d={logo6} />
      </g>
      <g clipPath={`url(#${clipId})`}>
        <rect
          className="glint"
          x={-60}
          y={0}
          width={110}
          height={200}
          fill={`url(#${glintId})`}
          opacity={0.95}
          transform="skewX(-30)"
        />
      </g>
    </svg>
  );
}
