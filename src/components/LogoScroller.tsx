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
  const baseAnimation = {
    x: direction === "left" ? ["0%", "-100%"] : ["0%", "100%"],
  };

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex w-max"
        animate={baseAnimation}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((src, index) => (
          <div
            key={index}
            className="w-[100px] h-[100px] flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <motion.img
              src={src}
              alt="logo"
              className="h-10 w-10 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}