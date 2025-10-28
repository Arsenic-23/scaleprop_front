import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`glass-card relative overflow-hidden ${className}`}
      style={{
        width: "240px",
        height: "360px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), inset 0 0 0 rgba(255,255,255,0)",
        backdropFilter: "blur(13px)",
        WebkitBackdropFilter: "blur(13px)",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div className="relative z-10">{children}</div>

      {/* Top shine line */}
      <div
        style={{
          content: "",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
        }}
      />

      {/* Left edge shine */}
      <div
        style={{
          content: "",
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.8), transparent, rgba(255,255,255,0.3))",
        }}
      />
    </div>
  );
};

export default GlassCard;
