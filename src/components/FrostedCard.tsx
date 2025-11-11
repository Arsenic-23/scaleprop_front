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
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 flex items-center justify-center ${className}`}
      style={{
        width: "400px",
        height: "460px",
        background: "rgba(20, 20, 20, 0.45)",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        boxShadow:
          "0 10px 32px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.10)",
        backdropFilter: "blur(22px) saturate(155%)",
        WebkitBackdropFilter: "blur(22px) saturate(155%)",
        padding: "2rem",
        ...style,
      }}
    >
      {/* Top glossy line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
          opacity: 0.65,
        }}
      />

      {/* Left glossy edge */}
      <div
        className="absolute top-0 left-0 w-[1px] h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.65), transparent, rgba(255,255,255,0.25))",
          opacity: 0.5,
        }}
      />

      {/* Subtle dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(140deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Soft noise texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default FrostedCard; 
