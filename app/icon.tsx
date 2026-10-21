import { ImageResponse } from "next/og";
import { LogoEl26 } from "@/components/logo-el26";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const markWidth = 28;
const markHeight = Math.round(markWidth * (160 / 470));

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#282C20",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoEl26 fill="#D4FF3A" width={markWidth} height={markHeight} />
      </div>
    ),
    { ...size },
  );
}
