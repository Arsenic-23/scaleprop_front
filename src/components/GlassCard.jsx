import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(15, 15, 15, 0.45)", // deep glass tone for dark UI
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 4px 24px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(255,255,255,0.03)",
        backdropFilter: "blur(30px) saturate(160%)",
        WebkitBackdropFilter: "blur(30px) saturate(160%)",
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {/* Gloss reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.2) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle edge glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 20px rgba(255,255,255,0.05), inset 0 0 40px rgba(255,255,255,0.02)",
          borderRadius: "inherit",
        }}
      />

      {/* Fine grain texture */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;