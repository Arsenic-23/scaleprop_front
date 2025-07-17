import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";

const EMOJIS = ["$", "€", "¥", "₹"];

export default function DollarBurst({ trigger = false, count = 22 }) {
  const [burstKey, setBurstKey] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);

      // Delay to allow DOM to render all spans before animating
      setTimeout(() => {
        const emojis = containerRef.current.querySelectorAll(".burst-item");

        emojis.forEach((el, i) => {
          const angle = (360 / count) * i;
          const radius = Math.random() * 100 + 90;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          gsap.fromTo(
            el,
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
              scale: 1.5,
              opacity: 0,
              rotate: 360,
              duration: 2,
              delay: Math.random() * 0.15,
              ease: "power3.out",
            }
          );
        });
      }, 0);
    }
  }, [trigger, count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      ref={containerRef}
    >
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            return (
              <span
                key={`${burstKey}-${i}`}
                className="absolute burst-item dollar-burst text-2xl md:text-3xl"
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
        .dollar-burst {
          font-weight: 700;
          background: radial-gradient(circle, #00f6ff, #3effb7, #00ff95);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 6px rgba(0, 255, 170, 0.4)) blur(0.5px)
            brightness(1.2);
          opacity: 1;
          animation: hueRotate 6s infinite linear;
          pointer-events: none;
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg) drop-shadow(0 0 4px rgba(0, 255, 170, 0.3));
          }
          50% {
            filter: hue-rotate(180deg) drop-shadow(0 0 6px rgba(0, 255, 170, 0.5));
          }
          100% {
            filter: hue-rotate(360deg) drop-shadow(0 0 4px rgba(0, 255, 170, 0.3));
          }
        }
      `}</style>
    </div>
  );
}