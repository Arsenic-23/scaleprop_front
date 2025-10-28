import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-[1px] ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 6px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        ...style,
      }}
    >
      {/* Subtle gloss layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 40%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Grain for realism */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          mixBlendMode: "overlay",
        }}
      />

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
