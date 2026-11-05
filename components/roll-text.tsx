import type { ReactNode } from "react";

/** Clipped duplicate-line. The parent link, button, or `.roll-hit` slides it on hover. */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span className="roll-face">{children}</span>
      <span className="roll-face" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
