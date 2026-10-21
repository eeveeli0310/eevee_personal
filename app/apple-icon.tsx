import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#282C20",
          color: "#D4FF3A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily: "sans-serif",
        }}
      >
        EL
      </div>
    ),
    { ...size },
  );
}
