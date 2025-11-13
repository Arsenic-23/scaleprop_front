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
  "/logo.png",
  "/meta.png",
  "/oanda.png",
];

const LOGO_WIDTH = 104;
const TOTAL_WIDTH = logos.length * LOGO_WIDTH;

function ScrollingRow({ direction }: { direction: "left" | "right" }) {
  const baseSpeed = 40;
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dir = direction === "left" ? -1 : 1;

  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let velocity = dir * baseSpeed;
  let lastTime = performance.now();
  let lastX = 0;
  let inertiaFrame: number;

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const wrap = (value: number, min: number, max: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const animate = (now: number) => {
    const delta = now - lastTime;
    lastTime = now;

    if (!isDragging) {
      velocity = lerp(velocity, dir * baseSpeed, 0.04);
      const next = x.get() + (velocity * delta) / 1000;
      x.set(wrap(next, -TOTAL_WIDTH, 0));
    }

    inertiaFrame = requestAnimationFrame(animate);
  };

  useEffect(() => {
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
      const dx = currentX - lastX;
      const dt = (now - lastTime) / 1000;

      x.set(scrollStart + (currentX - startX));
      velocity = dx / dt;
      lastX = currentX;
      lastTime = now;
    };

    const onUp = () => {
      isDragging = false;
      if (Math.abs(velocity) < baseSpeed * 0.4) {
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
      className="overflow-hidden relative w-full cursor-grab active:cursor-grabbing"
    >
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      <motion.div style={{ x }} className="flex w-max select-none">
        {[...logos, ...logos].map((src, i) => (
          <div key={i} className="relative mx-3">
            {/* NOISE OVERLAY */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "url('https://grainy-gradients.vercel.app/noise.png')",
                opacity: 0.32,
                mixBlendMode: "overlay",
                borderRadius: "20px",
              }}
            />

            {/* CARD */}
            <div
              className="w-[90px] h-[90px] flex items-center justify-center rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(30,30,30,0.78)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow:
                  "0 18px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <img
                src={src}
                alt="logo"
                className="h-16 w-16 object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
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
