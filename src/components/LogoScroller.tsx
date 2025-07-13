import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

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
  const controls = useAnimation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveDir = direction === "left" ? "-100%" : "100%";

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    timeoutRef.current = setTimeout(() => {
      controls.start({
        x: [ "0%", moveDir ],
        transition: {
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        },
      });
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={{
          x: isDragging ? undefined : [ "0%", moveDir ],
        }}
        transition={
          isDragging
            ? undefined
            : {
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }
        }
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {[...logos, ...logos, ...logos].map((src, index) => (
          <div
            key={index}
            className="w-[100px] h-[100px] flex items-center justify-center rounded-2xl mx-0 bg-white/5 border border-white/10 backdrop-blur-md shadow-inner"
          >
            <img
              src={src}
              alt="logo"
              className="h-10 w-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Fading edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}