import { motion } from "framer-motion";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/oanda.png",
];

export function LogoScroller({ direction }: { direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["0%", "50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20, // 🟢 smoother motion
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((src, index) => (
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