import { ImageResponse } from "next/og";

export const alt = "MEDIQUEUE — Pay for the patient who shows up";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontFamily: "sans-serif",
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#3a6ad6",
              background: "#eaf0fc",
              padding: "14px 22px",
              borderRadius: 12,
            }}
          >
            MEDI·QUEUE
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#0f172a",
              maxWidth: 940,
            }}
          >
            Pay for the patient who shows up.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 22,
              fontFamily: "sans-serif",
              color: "#475569",
              maxWidth: 720,
            }}
          >
            No subscription. A request lands — then you pay.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
