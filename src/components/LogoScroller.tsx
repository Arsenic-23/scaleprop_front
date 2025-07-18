import { motion, useMotionValue, useTransform, wrap } from "framer-motion";
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

  const totalLogoWidth = logos.length * 100;

  const translateX = useTransform(x, (val) => {
    const wrapped = wrap(0, totalLogoWidth * 3, val);
    return `${wrapped}px`;
  });

  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    if (!isDragging) {
      if (Math.abs(velocity) > baseSpeed) {
        velocity *= 0.96;
      } else if (Math.abs(velocity) < baseSpeed * 0.95) {
        velocity += dir * 0.5;
      }
      x.set(x.get() + (velocity * delta) / 1000);
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
      if (Math.abs(velocity) < baseSpeed) {
        velocity = dir * baseSpeed;
      }
    };

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
      className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing bg-black"
    >
      {/* Optional Fading Edges (lighter gradient now) */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />

      <motion.div style={{ x: translateX }} className="flex w-max select-none py-4">
        {[...logos, ...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="w-[90px] h-[90px] flex items-center justify-center mx-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-md transition-all duration-300"
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
    <div className="w-full">
      <ScrollingRow direction="left" />
    </div>
  );
}