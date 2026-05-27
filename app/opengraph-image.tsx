import { ImageResponse } from "next/og";

export const alt = "LexCR – Asistente Legal con IA para Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255,77,109,0.12) 0%, transparent 55%)",
          }}
        />

        {/* CR flag accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#3b82f6" }} />
          <div style={{ flex: 1, background: "#3b82f6" }} />
          <div style={{ flex: 2, background: "#ff4d6d" }} />
          <div style={{ flex: 1, background: "#3b82f6" }} />
          <div style={{ flex: 1, background: "#3b82f6" }} />
        </div>

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 48, height: 8, borderRadius: 4, background: "#3b82f6" }} />
          <div style={{ width: 48, height: 8, borderRadius: 4, background: "#ff4d6d" }} />
          <div style={{ width: 48, height: 8, borderRadius: 4, background: "#3b82f6" }} />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#eaf0ff",
            letterSpacing: "-2px",
            lineHeight: 1,
            display: "flex",
            gap: 0,
          }}
        >
          <span>Lex</span>
          <span style={{ color: "#ff4d6d" }}>CR</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "rgba(234,240,255,0.65)",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.35,
          }}
        >
          Tu asistente legal con IA para Costa Rica
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 44,
          }}
        >
          {["Derechos laborales", "Despidos", "Pensiones", "MTSS"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(59,130,246,0.35)",
                background: "rgba(59,130,246,0.1)",
                color: "rgba(234,240,255,0.75)",
                fontSize: 22,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "rgba(234,240,255,0.35)",
            fontSize: 22,
            letterSpacing: "0.05em",
          }}
        >
          lexcr.cr
        </div>
      </div>
    ),
    { ...size }
  );
}
