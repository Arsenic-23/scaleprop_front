import React from "react";

interface FrostedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FrostedCard: React.FC<FrostedCardProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] flex items-center justify-center ${className}`}
      style={{
        width: "min(90vw, 420px)",
        height: "min(90vh, 520px)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderTop: "1px solid rgba(255,255,255,0.25)",
        borderLeft: "1px solid rgba(255,255,255,0.20)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        boxShadow:
          "inset 0 0 0.75px rgba(255,255,255,0.25), 0 8px 40px rgba(0,0,0,0.45)",
        padding: "2rem",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.5s ease",
        ...style,
      }}
    >
      {/* === Layer 1: Subsurface bloom === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0.25,
        }}
      />

      {/* === Layer 2: Highlight rims (top-left glow) === */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.45) 0%, transparent 60%)",
          mixBlendMode: "soft-light",
          opacity: 0.4,
        }}
      />

      {/* === Layer 3: Edge reflections === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 40%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* === Layer 4: Grain / Microtexture === */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          mixBlendMode: "overlay",
        }}
      />

      {/* === Layer 5: Ambient color bleed === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 100%, rgba(80,160,255,0.15), transparent 60%), radial-gradient(circle at 0% 0%, rgba(255,100,200,0.1), transparent 70%)",
          mixBlendMode: "soft-light",
          opacity: 0.6,
        }}
      />

      {/* === Layer 6: Inner rim gloss === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          boxShadow:
            "inset 0 1px 1.2px rgba(255,255,255,0.4), inset 0 -1px 1.2px rgba(0,0,0,0.2)",
        }}
      />

      {/* === Layer 7: Top linear gloss edge === */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
          opacity: 0.45,
        }}
      />

      {/* === Layer 8: Corner sheen arcs === */}
      <div
        className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
          opacity: 0.2,
        }}
      />

      {/* === Layer 9: Dynamic light reflection simulation === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)",
          opacity: 0.2,
          mixBlendMode: "overlay",
        }}
      />

      {/* === Layer 10: Depth shimmer with subtle movement (CSS only) === */}
      <div
        className="absolute inset-0 pointer-events-none animate-[sheen_8s_infinite_linear]"
        style={{
          background:
            "linear-gradient(60deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          opacity: 0.25,
          maskImage:
            "linear-gradient(90deg, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 25%, black 75%, transparent)",
        }}
      />

      {/* === Foreground: Actual Card Content === */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {children}
      </div>

      {/* === Keyframes for reflective motion === */}
      <style>
        {`
          @keyframes sheen {
            0% { transform: translateX(-30%); opacity: 0.05; }
            50% { transform: translateX(30%); opacity: 0.12; }
            100% { transform: translateX(-30%); opacity: 0.05; }
          }
        `}
      </style>
    </div>
  );
};

export default FrostedCard;
