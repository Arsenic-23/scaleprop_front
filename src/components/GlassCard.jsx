import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(30, 30, 30, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(36px) saturate(160%)",
        WebkitBackdropFilter: "blur(36px) saturate(160%)",
        transform: "translateZ(0)",
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {/* Top light shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          opacity: 0.6,
        }}
      />

      {/* Left inner edge glow */}
      <div
        className="absolute top-0 left-0 w-px h-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5), transparent, rgba(255,255,255,0.25))",
          opacity: 0.6,
        }}
      />

      {/* Glass gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, rgba(0,0,0,0.25) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Fine texture noise */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
