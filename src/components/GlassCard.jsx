import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        display: "inline-block",
        background: "rgba(20, 20, 20, 0.65)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.1)",
        backdropFilter: "blur(42px)",
        WebkitBackdropFilter: "blur(42px)",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {/* Gloss */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          mixBlendMode: "overlay",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 p-3">{children}</div>
    </div>
  );
};

export default GlassCard;