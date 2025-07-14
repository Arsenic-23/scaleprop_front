import { motion, useMotionValue, useTransform } from "framer-motion";
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
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let inertiaFrame: number;

  const translateX = useTransform(x, (val) => `${val % (logos.length * 100)}px`);

  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    if (!isUserDragging) {
      if (Math.abs(velocity) > 0.01) {
        x.set(x.get() + velocity * (delta / 1000));
        velocity *= 0.92;
      } else {
        velocity = 0;
        x.set(x.get() + (dir * baseSpeed * delta) / 1000);
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

    const getEventX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : e.clientX;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isUserDragging = true;
      startX = getEventX(e);
      scrollStart = x.get();
      velocity = 0;
      lastX = startX;
      lastTime = performance.now();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isUserDragging) return;
      const currentX = getEventX(e);
      const now = performance.now();
      const delta = currentX - startX;
      const dx = currentX - lastX;
      const dt = (now - lastTime) / 1000;

      if (dt > 0) velocity = dx / dt;

      x.set(scrollStart + delta);
      lastX = currentX;
      lastTime = now;
    };

    const onUp = () => {
      isUserDragging = false;
      lastTime = performance.now();
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
      <motion.div style={{ x: translateX }} className="flex w-max select-none">
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="w-[90px] h-[90px] flex items-center justify-center mx-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <img
              src={src}
              alt="logo"
              className="h-10 w-10 object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </motion.div>

      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function LogoScroller() {
  return (
    <div className="flex flex-col py-6">
      {/* Only one row shown at the bottom */}
      <ScrollingRow direction="left" />
    </div>
  );
}