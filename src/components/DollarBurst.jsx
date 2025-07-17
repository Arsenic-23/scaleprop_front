import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";

const EMOJIS = ["$", "¥", "€", "₹"];

export default function DollarBurst({ trigger = false, count = 22 }) {
  const [burstKey, setBurstKey] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  useLayoutEffect(() => {
    if (trigger && containerRef.current) {
      const emojis = containerRef.current.querySelectorAll(".burst-emoji");
      emojis.forEach((emoji) => {
        const angle = Math.random() * 360;
        const radius = Math.random() * 80 + 60;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        gsap.fromTo(
          emoji,
          {
            x: 0,
            y: 0,
            scale: 0.3,
            opacity: 1,
            rotate: 0,
          },
          {
            x,
            y,
            scale: 1.6,
            opacity: 0,
            rotate: 360,
            duration: 1.8,
            ease: "power3.out",
          }
        );
      });
    }
  }, [burstKey]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            return (
              <span
                key={`${burstKey}-${i}`}
                className="absolute burst-emoji text-2xl md:text-3xl font-bold"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {emoji}
              </span>
            );
          })}
      </AnimatePresence>

      <style jsx>{`
        .burst-emoji {
          background: radial-gradient(circle at center, #00f6ff, #3effb7, #00ff95);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 4px rgba(0, 255, 170, 0.4)) blur(0.5px);
          animation: hueRotate 6s infinite linear;
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg) drop-shadow(0 0 4px rgba(0, 255, 170, 0.4));
          }
          50% {
            filter: hue-rotate(180deg) drop-shadow(0 0 8px rgba(0, 255, 170, 0.6));
          }
          100% {
            filter: hue-rotate(360deg) drop-shadow(0 0 4px rgba(0, 255, 170, 0.4));
          }
        }
      `}</style>
    </div>
  );
}