import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useEffect } from "react";

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

function ScrollingRow({ direction }: { direction: "left" | "right" }) {
  const baseSpeed = 40;
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dir = direction === "left" ? -1 : 1;
  let isUserDragging = false;
  let startX = 0;
  let scrollStart = 0;

  useAnimationFrame((t, delta) => {
    if (!isUserDragging) {
      const moveBy = (dir * baseSpeed * delta) / 1000;
      x.set(x.get() + moveBy);
    }
  });

  const translateX = useTransform(x, (val) => `${val % (logos.length * 140)}px`);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isUserDragging = true;
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      scrollStart = x.get();
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isUserDragging) return;
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = currentX - startX;
      x.set(scrollStart + delta);
    };

    const onMouseUp = () => {
      isUserDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("touchstart", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [x]);

  return (
    <div ref={containerRef} className="overflow-hidden relative w-full cursor-grab">
      <motion.div style={{ x: translateX }} className="flex w-max select-none">
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="w-[120px] h-[120px] m-2 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.05),_0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <img
              src={src}
              alt="logo"
              className="h-full w-full object-contain transition-all duration-300"
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

export function LogoScroller() {
  return (
    <div className="flex flex-col gap-6">
      <ScrollingRow direction="left" />
      <ScrollingRow direction="right" />
    </div>
  );
}