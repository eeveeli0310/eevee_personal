import { ImageResponse } from "next/og";

export const shareSize = { width: 1200, height: 630 };
export const shareContentType = "image/png";
export const shareAlt = "Eevee Li — Overseas Market Content Operator, Content Creator, and Designer";


export function ShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          color: "#FAFAFA",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "#DFE104",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.06em",
            }}
          >
            EL
          </div>
          <div style={{ display: "flex", fontSize: "22px", letterSpacing: "0.18em", color: "#DFE104" }}>
            EEVEE LI
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div style={{ display: "flex", fontSize: "68px", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95 }}>
            Life is a performance art
          </div>
          <div style={{ display: "flex", fontSize: "28px", lineHeight: 1.3, color: "#D4D4D8" }}>
            Overseas Market Content Operator / Content Creator / Designer
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "22px", letterSpacing: "0.14em" }}>
          <div style={{ display: "flex" }}>SHANGHAI</div>
          <div style={{ display: "flex", color: "#DFE104" }}>EEVEELI.ME</div>
        </div>
      </div>
    ),
    { ...shareSize },
  );
}
