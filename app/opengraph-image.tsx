import { ImageResponse } from "next/og";
import { profile } from "@/app/config/profile";

export const alt = `${profile.name} digital business card`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #09070d 0%, #151022 48%, #07040f 100%)",
          color: "#f5fffb",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(139, 92, 246, 0.42)",
            borderRadius: 48,
            background: "rgba(5, 22, 18, 0.76)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
            padding: 58,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: "#c4b5fd",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  background: "#2e1a5c",
                  border: "1px solid rgba(196, 181, 253, 0.46)",
                }}
              >
                {profile.initials}
              </div>
              Digital Business Card
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: 720,
              }}
            >
              <div style={{ fontSize: 78, fontWeight: 760, lineHeight: 1 }}>
                {profile.name}
              </div>
              <div
                style={{
                  color: "#c4b5fd",
                  fontSize: 34,
                  lineHeight: 1.25,
                  maxWidth: 760,
                }}
              >
                {profile.title}
              </div>
              <div
                style={{
                  color: "rgba(236, 253, 245, 0.74)",
                  fontSize: 26,
                  lineHeight: 1.35,
                  maxWidth: 760,
                }}
              >
                {profile.about}
              </div>
            </div>
          </div>
          <div
            style={{
              width: 210,
              height: 210,
              borderRadius: 56,
              background:
                "linear-gradient(160deg, rgba(139,92,246,0.98), rgba(196,181,253,0.7))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 850,
              boxShadow: "0 26px 80px rgba(139, 92, 246, 0.34)",
            }}
          >
            {profile.initials}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
