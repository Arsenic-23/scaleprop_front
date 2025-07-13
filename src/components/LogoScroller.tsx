// src/components/LogoScroller.tsx
import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/oanda.png",
];

export function LogoScroller({ direction = "left" }: { direction: "left" | "right" }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="flex gap-16 py-4 px-2 whitespace-nowrap overflow-hidden cursor-grab"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      animate={{
        x: direction === "left" ? ["0%", "-100%"] : ["0%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 35,
        ease: "linear",
      }}
    >
      {[...logos, ...logos].map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt="logo"
          className="h-12 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
        />
      ))}
    </motion.div>
  );
}