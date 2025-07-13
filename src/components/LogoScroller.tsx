import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/icmarkets.png",
  "/binance.png",
  "/bybit.png",
  "/tether.png",
  "/telegram.png",
  "/scale.png",
  "/oanda.png",
];

export function LogoScroller({ direction }: { direction: "left" | "right" }) {
  const baseSpeed = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dir = direction === "left" ? -1 : 1;

  useAnimationFrame((t, delta) => {
    const moveBy = (dir * baseSpeed * delta) / 1000;
    x.set(x.get() + moveBy);
  });

  const translateX = useTransform(x, (val) => `${val % (logos.length * 100)}px`);

  return (
    <div ref={scrollRef} className="overflow-hidden relative w-full">
      <motion.div style={{ x: translateX }} className="flex w-max">
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
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

      {/* Edge fading */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}