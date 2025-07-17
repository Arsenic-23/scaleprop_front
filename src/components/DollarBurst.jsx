import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["$", "€", "¥", "₹"];

export default function DollarBurst({ trigger = false, count = 22 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const radius = Math.random() * 100 + 90; // Balanced circle
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const duration = Math.random() * 0.5 + 1.6; // Slightly slower
            const delay = Math.random() * 0.1;
            const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.3,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.5,
                  opacity: 0,
                  rotate: 360,
                }}
                transition={{
                  duration,
                  delay,
                  ease: [0.25, 1, 0.5, 1],
                }}
                exit={{ opacity: 0 }}
                className="absolute dollar-burst text-2xl md:text-3xl"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {emoji}
              </motion.span>
            );
          })}
      </AnimatePresence>

      <style jsx>{`
        .dollar-burst {
          font-weight: 700;
          background: radial-gradient(circle, #00f6ff, #3effb7, #00ff95);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 4px rgba(0, 255, 170, 0.3))
                  blur(0.5px)
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