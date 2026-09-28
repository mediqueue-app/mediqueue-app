import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "MEDIQUEUE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const icon = await readFile(join(process.cwd(), "public/mediqueue-icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0f4fa",
        }}
      >
        <img src={iconSrc} width={280} height={280} alt="" />
        <div
          style={{
            marginTop: 28,
            display: "flex",
            fontSize: 48,
            fontFamily: "sans-serif",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "#3a6ad6",
          }}
        >
          MEDI·QUEUE
        </div>
      </div>
    ),
    { ...size },
  );
}
