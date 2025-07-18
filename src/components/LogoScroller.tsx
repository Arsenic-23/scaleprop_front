import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

const logos = [
  "/tradingview.png",
  "/metamask.png",
  "/exness.png",
  "/binance.png",
  "/bybit.png",
  "/tether.png",
  "/telegram.png",
  "/scale.png",
  "/oanda.png",
];

const LOGO_WIDTH = 104; // 90px + 2*7px margin
const TOTAL_LOGOS = logos.length;
const TOTAL_WIDTH = TOTAL_LOGOS * LOGO_WIDTH;

function ScrollingRow({ direction }: { direction: "left" | "right" }) {
  const baseSpeed = 40;
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dir = direction === "left" ? -1 : 1;

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let velocity = dir * baseSpeed;
  let lastX = 0;
  let lastTime = 0;
  let inertiaFrame: number;

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    if (!isDragging) {
      // Smooth acceleration & deceleration
      velocity = lerp(velocity, dir * baseSpeed, 0.02);

      const nextX = x.get() + (velocity * delta) / 1000;

      // Infinite loop logic
      if (nextX <= -TOTAL_WIDTH) {
        x.set(0);
      } else if (nextX >= 0) {
        x.set(-TOTAL_WIDTH);
      } else {
        x.set(Math.fround(nextX));
      }
    }

    inertiaFrame = requestAnimationFrame(animate);
  };

  useEffect(() => {
    lastTime = performance.now();
    inertiaFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(inertiaFrame);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      startX = getX(e);
      scrollStart = x.get();
      lastX = startX;
      lastTime = performance.now();
      velocity = 0;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentX = getX(e);
      const now = performance.now();
      const delta = currentX - startX;
      const dx = currentX - lastX;
      const dt = (now - lastTime) / 1000;

      x.set(scrollStart + delta);
      velocity = dx / dt;
      lastX = currentX;
      lastTime = now;
    };

    const onUp = () => {
      isDragging = false;
      if (Math.abs(velocity) < baseSpeed * 0.5) {
        velocity = dir * baseSpeed;
      }
    };

    container.addEventListener("mousedown", onDown);
    container.addEventListener("touchstart", onDown);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchmove", onMove);
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
      className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing"
    >
      {/* Fading Edges */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Scrollable Logo Row */}
      <motion.div style={{ x }} className="flex w-max select-none">
        {[...logos, ...logos, ...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="w-[90px] h-[90px] flex items-center justify-center mx-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <img
              src={src}
              alt="logo"
              className="h-16 w-16 object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function LogoScroller() {
  return (
    <div className="flex flex-col w-full mt-auto pb-6">
      <ScrollingRow direction="left" />
    </div>
  );
}