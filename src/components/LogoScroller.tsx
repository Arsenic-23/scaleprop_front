import { motion } from "framer-motion";
import { useRef } from "react";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/oanda.png",
];

export function LogoScroller({ direction = "left" }: { direction: "left" | "right" }) {
  const scrollRef = useRef(null);

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        ref={scrollRef}
        className="flex gap-16 py-4 px-4 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="logo"
            className="h-12 grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
          />
        ))}
      </motion.div>
    </div>
  );
}