"use client";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const logos = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
  "/logo6.png",
  "/logo7.png",
  "/logo8.png",
];

export default function LogoScroller() {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let currentX = 0;
    let velocity = 0;
    let lastTime = 0;
    let lastX = 0;

    const onDown = (e: any) => {
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      currentX = x.get();
      velocity = 0;
      lastTime = Date.now();
      lastX = startX;
      controls.stop();
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);
    };

    const onMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = clientX - startX;
      x.set(currentX + dx);
      const now = Date.now();
      const delta = clientX - lastX;
      velocity = delta / (now - lastTime); // px/ms
      lastX = clientX;
      lastTime = now;
    };

    const onUp = () => {
      const maxOffset = 0;
      const minOffset = -(
        el.scrollWidth - el.clientWidth
      );

      let target = x.get() + velocity * 300; // momentum

      if (target > maxOffset) target = maxOffset;
      if (target < minOffset) target = minOffset;

      controls.start({
        x: target,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
          velocity: velocity * 1000, // convert to px/s
        },
      });

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
    };
  }, [x, controls]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full select-none"
      style={{ touchAction: "none" }}
    >
      <motion.div
        style={{ x }}
        animate={controls}
        className="flex gap-8 py-6 px-4"
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-20 flex items-center justify-center rounded-2xl bg-neutral-900 shadow-lg"
          >
            <img
              src={logo}
              alt={`logo-${i}`}
              className="max-h-12 object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}