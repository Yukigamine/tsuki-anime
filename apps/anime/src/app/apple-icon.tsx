import { ImageResponse } from "next/og";
import { yukiSvg } from "@/components/icons";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  const image = `data:image/svg+xml;base64,${Buffer.from(yukiSvg).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#bde0fe",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse requires an HTML image element. */}
      <img
        src={image}
        alt="Tsuki Anime"
        style={{ width: "148px", height: "148px" }}
      />
    </div>,
    size,
  );
}
