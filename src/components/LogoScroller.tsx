import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/oanda.png",
];

export function LogoScroller({ direction }: { direction: "left" | "right" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDragStart = () => {
    setIsDragging(true);
    setShouldAnimate(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    timeoutRef.current = setTimeout(() => {
      setShouldAnimate(true);
    }, 1000); // resume after 1 second
  };

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex w-max"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={
          shouldAnimate
            ? {
                x: direction === "left" ? ["0%", "-100%"] : ["0%", "100%"],
              }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }
            : undefined
        }
      >
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="relative w-[100px] h-[100px] flex items-center justify-center rounded-full mx-0 backdrop-blur-md border border-white/10 bg-white/5 hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full border border-white/10 opacity-30 blur-md" />
            <img
              src={src}
              alt="logo"
              className="h-10 w-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Edge Faders */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}