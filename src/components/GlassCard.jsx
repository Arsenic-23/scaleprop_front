import React from "react";

const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-[1px] ${className}`}
      style={{
        background: "rgba(18, 18, 18, 0.35)", // deep transparent black glass
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(30px) saturate(160%)",
        WebkitBackdropFilter: "blur(30px) saturate(160%)",
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {/* Subtle gloss reflection (top edge shimmer) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 25%, rgba(0,0,0,0.3) 100%)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Inner dark gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.04), rgba(0,0,0,0.4))",
          opacity: 0.8,
        }}
      />

      {/* Gentle reflective wave shimmer (tiny moving gloss) */}
      <div
        className="absolute inset-0 animate-gloss pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
          backgroundSize: "200% 200%",
          mixBlendMode: "screen",
          opacity: 0.25,
        }}
      />

      {/* Subtle texture for realism */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          mixBlendMode: "overlay",
        }}
      />

      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes gloss {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-gloss {
          animation: gloss 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GlassCard;