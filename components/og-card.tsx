/** Shared layout for generated Open Graph images (rendered by next/og, so inline styles only). */
export function OgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#08080c",
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(124,92,255,0.55), transparent 45%), radial-gradient(circle at 90% 85%, rgba(255,77,151,0.4), transparent 45%)",
        color: "#ececf1",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg,#7c5cff,#ff4d97)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "white",
          }}
        >
          DK
        </div>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a18bff" }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "white" }}>{title}</div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#a0a0ad", maxWidth: 980 }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#6e6e7b" }}>github.com/Coderlearner41</div>
    </div>
  )
}
