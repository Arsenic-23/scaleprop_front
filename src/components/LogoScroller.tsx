
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

  const translateX = useTransform(x, (val) => `${val % (logos.length * 140)}px`);

  // Auto scroll + inertia handling
  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    if (!isUserDragging && Math.abs(velocity) > 0.1) {
      x.set(x.get() + velocity * (delta / 1000));
      velocity *= 0.95; // decay
    } else if (!isUserDragging && Math.abs(velocity) <= 0.1) {
      velocity = 0;
      x.set(x.get() + (dir * baseSpeed * delta) / 1000);
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

    const onDown = (e: MouseEvent | TouchEvent) => {
      isUserDragging = true;
      startX = "touches" in e ? e.touches[0].clientX : e.clientX;
      scrollStart = x.get();
      velocity = 0;
      lastX = startX;
      lastTime = performance.now();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isUserDragging) return;
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const now = performance.now();
      const delta = currentX - startX;

      x.set(scrollStart + delta);

      const timeDiff = now - lastTime;
      velocity = (currentX - lastX) / (timeDiff / 1000);
      lastX = currentX;
      lastTime = now;
    };

    const onUp = () => {
      isUserDragging = false;
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
      className="overflow-hidden relative w-full cursor-grab"
    >
      <motion.div style={{ x: translateX }} className="flex w-max select-none">
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

      {/* Edge fading */}
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