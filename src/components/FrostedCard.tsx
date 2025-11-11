import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] flex items-center justify-center transition-all duration-500 ${className}`}
      style={{
        width: "min(90vw, 400px)",
        height: "min(90vh, 460px)",
        background: "rgba(30, 30, 30, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(22px) saturate(180%)",
        WebkitBackdropFilter: "blur(22px) saturate(180%)",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.35), inset 0 1px rgba(255,255,255,0.25)",
        padding: "2rem",
        borderRadius: "1.5rem",
        ...style,
      }}
    >
      {/* Subtle animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          background: [
            "linear-gradient(130deg, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.05))",
            "linear-gradient(230deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.2))",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
          backgroundSize: "cover",
          mixBlendMode: "overlay",
        }}
      />

      {/* Light reflection arc */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[180%] h-[180px] opacity-25 rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.35), transparent 70%)",
        }}
      />

      {/* Glow edges */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 12px rgba(255,255,255,0.06), inset 0 0 2px rgba(255,255,255,0.25)",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white">
        {children}
      </div>
    </motion.div>
  );
};

export default FrostedCard;
