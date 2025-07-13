import { motion } from "framer-motion";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/oanda.png",
];

export function LogoScroller({ direction = "left" }: { direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex gap-6 py-4 px-4 w-max"
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
          <div
            key={index}
            className="min-w-[100px] h-[80px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm transition hover:scale-105"
          >
            <motion.img
              src={src}
              alt="logo"
              className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}