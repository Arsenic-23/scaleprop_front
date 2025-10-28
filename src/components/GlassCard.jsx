import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow:
          "0 10px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(255,255,255,0.12)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
        ...style,
      }}
    >
      {/* Top glossy line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
          opacity: 0.7,
        }}
      />

      {/* Left glossy edge */}
      <div
        className="absolute top-0 left-0 w-[1px] h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.75), transparent, rgba(255,255,255,0.25))",
          opacity: 0.55,
        }}
      />

      {/* Subtle glass overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.28) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Soft noise */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
