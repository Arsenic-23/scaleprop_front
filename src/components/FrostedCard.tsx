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
        width: "100%",
        maxWidth: "420px",
        minHeight: "480px",
        background: "rgba(15, 15, 15, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        padding: "2rem",
        borderRadius: "1.25rem",
        margin: "auto",
        ...style,
      }}
    >
      {/* Subtle gradient edges */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.3) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Clean noise texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default FrostedCard;
