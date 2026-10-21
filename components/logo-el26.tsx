import { LOGO_VIEWBOX, logoPaths } from "@/lib/logo-el26";

type LogoEl26Props = {
  className?: string;
  fill?: string;
  width?: number;
  height?: number;
};

/**
 * One EL26 mark. Groups are `e`, `l`, and `26` (data-part).
 * The path data is a stand-in; swap it in lib/logo-el26.ts when the traced SVG arrives.
 */
export function LogoEl26({ className, fill = "currentColor", width, height }: LogoEl26Props) {
  return (
    <svg
      className={className ? `logo-mark ${className}` : "logo-mark"}
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      fill="none"
      aria-hidden="true"
    >
      <g data-part="e">
        {logoPaths.e.map((d) => (
          <path key={d} d={d} fill={fill} />
        ))}
      </g>
      <g data-part="l">
        {logoPaths.l.map((d) => (
          <path key={d} d={d} fill={fill} />
        ))}
      </g>
      <g data-part="26">
        {logoPaths.n26.map((d) => (
          <path key={d} d={d} fill={fill} />
        ))}
      </g>
    </svg>
  );
}
