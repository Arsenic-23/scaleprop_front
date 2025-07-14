import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  const baseSpeed = 40; // px per second
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const velocity = useRef(0);
  const dir = direction === "left" ? -1 : 1;
  const [isDragging, setIsDragging] = useState(false);
  let startX = 0;
  let scrollStart = 0;
  let lastX = 0;
  let lastTime = 0;

  // Auto-scrolling & inertia
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      if (Math.abs(velocity.current) > 0.1) {
        x.set(x.get() + velocity.current);
        velocity.current *= 0.94;
      } else {
        const moveBy = (dir * baseSpeed * delta) / 1000;
        x.set(x.get() + moveBy);
      }
    }
  });

  const totalWidth = logos.length * 140; // 120px + margin
  const translateX = useTransform(x, (val) => `${val % totalWidth}px`);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      setIsDragging(true);
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      scrollStart = x.get();
      lastX = startX;
      lastTime = performance.now();
      velocity.current = 0;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const now = performance.now();
      const dx = currentX - startX;
      x.set(scrollStart + dx);

      // update velocity
      const delta = currentX - lastX;
      const time = now - lastTime;
      if (time > 0) {
        velocity.current = (delta / time) * 25; // scaled for realism
        lastX = currentX;
        lastTime = now;
      }
    };

    const onUp = () => setIsDragging(false);

    container.addEventListener("mousedown", onDown);
    container.addEventListener("touchstart", onDown, { passive: true });
    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onDown);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [x]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing touch-pan-x select-none"
    >
      <motion.div style={{ x: translateX }} className="flex w-max">
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="w-[120px] h-[120px] flex items-center justify-center mx-3 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <img
              src={src}
              alt="logo"
              className="h-14 w-14 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </motion.div>

      {/* Edge fading overlays */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function LogoScroller() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <ScrollingRow direction="left" />
      <ScrollingRow direction="right" />
    </div>
  );
}