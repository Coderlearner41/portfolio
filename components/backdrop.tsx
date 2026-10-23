/** Fixed ambient background: drifting colour blobs under a faint grid and grain. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[10vw] -top-[15vh] h-[60vh] w-[60vh] rounded-full bg-violet/30 blur-[120px] animate-drift" />
      <div
        className="absolute -right-[15vw] top-[20vh] h-[55vh] w-[55vh] rounded-full bg-pink/20 blur-[130px] animate-drift"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-[-20vh] left-[25vw] h-[50vh] w-[50vh] rounded-full bg-cyan/10 blur-[140px] animate-drift"
        style={{ animationDelay: "-14s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
