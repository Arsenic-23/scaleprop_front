import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(18, 18, 18, 0.55)", // deep dark-glass tone
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.03)",
        backdropFilter: "blur(48px) saturate(180%)",
        WebkitBackdropFilter: "blur(48px) saturate(180%)",
        transform: "translateZ(0)",
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {/* Soft */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.25) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 25px rgba(255,255,255,0.05), inset 0 0 60px rgba(255,255,255,0.02)",
          borderRadius: "inherit",
        }}
      />

      {/* Fine */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
