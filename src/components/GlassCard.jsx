import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-[1px] ${className}`}
      style={{
        background: "rgba(30,30,30,0.78)", // Same dark tone as navigation
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.12)",
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {/* Gloss shimmer overlay for realistic reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Fine grain texture overlay for realism */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          mixBlendMode: "overlay",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 p-4">{children}</div>
    </div>
  );
};

export default GlassCard;